'use strict';
var jugadorSecreto = null;
var jugadoresAdivinados = [];
var intentosUsados = 0;
var maximosIntentos = 8;
var temporizadorId = null;
var segundosTranscurridos = 0;
var juegoActivo = false;
var dificultadActual = 'facil';
var nombreJugadorActual = '';
function detenerTemporizador() {
    if (temporizadorId) {
        clearInterval(temporizadorId);
        temporizadorId = null;
    }
}
function tickTemporizador() {
    segundosTranscurridos = segundosTranscurridos + 1;
    actualizarDisplayTemporizador(segundosTranscurridos);
}
function iniciarTemporizador() {
    detenerTemporizador();
    temporizadorId = setInterval(tickTemporizador, 1000);
}
function evaluarTexto(valorSecreto, valorIntento) {
    var secretoLimpio;
    var intentoLimpio;
    /* Pasamos todo a minusculas por si la API trae diferencias de mayusculas */
    secretoLimpio = String(valorSecreto).trim().toLowerCase();
    intentoLimpio = String(valorIntento).trim().toLowerCase();
    if (secretoLimpio === intentoLimpio) {
        return 'coincide';
    }
    return 'sin-coincidencia';
}
function evaluarNumero(valorSecreto, valorIntento) {
    if (valorSecreto === valorIntento) {
        return 'coincide';
    }
    if (valorSecreto > valorIntento) {
        return 'mayor';
    }
    return 'menor';
}
function compararAtributos(jugadorIntento) {
    var comparaciones = [];
    comparaciones.push({
        etiqueta: 'Nacionalidad',
        valor: jugadorIntento.nationality,
        estado: evaluarTexto(jugadorSecreto.nationality, jugadorIntento.nationality)
    });
    comparaciones.push({
        etiqueta: 'Club',
        valor: jugadorIntento.club,
        estado: evaluarTexto(jugadorSecreto.club, jugadorIntento.club)
    });
    comparaciones.push({
        etiqueta: 'Posicion',
        valor: jugadorIntento.position,
        estado: evaluarTexto(jugadorSecreto.position, jugadorIntento.position)
    });
    comparaciones.push({
        etiqueta: 'Edad',
        valor: String(jugadorIntento.age),
        estado: evaluarNumero(jugadorSecreto.age, jugadorIntento.age)
    });
    comparaciones.push({
        etiqueta: 'Overall',
        valor: String(jugadorIntento.overall),
        estado: evaluarNumero(jugadorSecreto.overall, jugadorIntento.overall)
    });
    comparaciones.push({
        etiqueta: 'Altura',
        valor: String(jugadorIntento.heightCm) + ' cm',
        estado: evaluarNumero(jugadorSecreto.heightCm, jugadorIntento.heightCm)
    });
    return comparaciones;
}
function calcularPuntaje(gano) {
    var puntosBase;
    var bonusTiempo;
    var puntajeFinal;
    if (!gano) {
        return 0;
    }
    if (dificultadActual === 'facil') {
        puntosBase = 60;
    } else if (dificultadActual === 'medio') {
        puntosBase = 80;
    } else {
        puntosBase = 100;
    }
    bonusTiempo = 0;
    if (segundosTranscurridos < 60) {
        bonusTiempo = 20;
    } else if (segundosTranscurridos < 120) {
        bonusTiempo = 10;
    }
    puntajeFinal = puntosBase - ((intentosUsados - 1) * 10) + bonusTiempo;
    if (puntajeFinal < 10) {
        return 10;
    }
    return puntajeFinal;
}
function finalizarJuego(resultado) {
    var puntaje;
    var registro;
    var mensaje;
    juegoActivo = false;
    detenerTemporizador();
    puntaje = calcularPuntaje(resultado === 'ganado');
    registro = {
        nombreJugador: nombreJugadorActual,
        resultado: resultado,
        intentos: intentosUsados,
        fechaHora: new Date().getTime(),
        duracionSegundos: segundosTranscurridos,
        puntaje: puntaje
    };
    guardarResultadoJuego(registro);
    if (resultado === 'ganado') {
        reproducirSonidoVictoria();
        mensaje = '\xA1Felicidades! Adivinaste al jugador en ' + intentosUsados + ' intentos. Puntaje: ' + puntaje;
        mostrarModal('\xA1Ganaste!', mensaje);
    } else {
        reproducirSonidoDerrota();
        mensaje = 'El jugador secreto era ' + jugadorSecreto.name + '. Puntaje: 0';
        mostrarModal('Perdiste', mensaje);
        establecerFuenteFotoSecreta(jugadorSecreto.photo);
        actualizarDesenfoqueFotoSecreta(maximosIntentos, maximosIntentos);
        mostrarContenedorFotoSecreta();
    }
}
function manejarPistasProgresivas() {
    if (dificultadActual === 'facil') {
        actualizarDesenfoqueFotoSecreta(intentosUsados, maximosIntentos);
    } else if (dificultadActual === 'medio') {
        if (intentosUsados === 2) {
            agregarPistaRevelada('Posicion', jugadorSecreto.position);
        } else if (intentosUsados === 4) {
            agregarPistaRevelada('Nacionalidad', jugadorSecreto.nationality);
        } else if (intentosUsados === 6) {
            agregarPistaRevelada('Club', jugadorSecreto.club);
        }
    }
}
function alSeleccionarSugerenciaJugador(jugador) {
    var comparaciones;
    var esVictoria;
    var indiceComp;
    if (!juegoActivo) {
        return;
    }
    if (jugadoresAdivinados.indexOf(jugador.id) !== -1) {
        mostrarModal('Intento repetido', 'Ya intentaste con este jugador. Elegi otro.');
        return;
    }
    if (intentosUsados === 0) {
        iniciarTemporizador();
    }
    jugadoresAdivinados.push(jugador.id);
    intentosUsados = intentosUsados + 1;
    actualizarDisplayIntentosRestantes(maximosIntentos - intentosUsados);
    comparaciones = compararAtributos(jugador);
    renderizarIntento(intentosUsados, jugador.name, comparaciones);
    esVictoria = jugador.id === jugadorSecreto.id;
    if (esVictoria) {
        /* Si gana, disparamos los sonidos sincronizados para todas las celdas verdes */
        for (indiceComp = 0; indiceComp < comparaciones.length; indiceComp = indiceComp + 1) {
            setTimeout(reproducirSonidoAcierto, (indiceComp + 1) * 150);
        }
        finalizarJuego('ganado');
    } else {
        /* Si no es victoria, disparamos el sonido únicamente en las celdas que sí coinciden (verdes) */
        for (indiceComp = 0; indiceComp < comparaciones.length; indiceComp = indiceComp + 1) {
            if (comparaciones[indiceComp].estado === 'coincide') {
                setTimeout(reproducirSonidoAcierto, (indiceComp + 1) * 150);
            }
        }
        manejarPistasProgresivas();
        if (intentosUsados >= maximosIntentos) {
            finalizarJuego('perdido');
        }
    }
}
function iniciarPartida(nombreJugador, dificultad) {
    var manejarExito;
    var manejarError;
    juegoActivo = false;
    nombreJugadorActual = nombreJugador;
    dificultadActual = dificultad;
    jugadoresAdivinados = [];
    intentosUsados = 0;
    segundosTranscurridos = 0;
    actualizarDisplayIntentosRestantes(maximosIntentos);
    actualizarDisplayTemporizador(0);
    actualizarDisplayDificultad(dificultad.charAt(0).toUpperCase() + dificultad.slice(1));
    limpiarTableroIntentos();
    limpiarPistasReveladas();
    detenerTemporizador();
    ocultarContenedorFotoSecreta();
    mostrarModal('Cargando', 'Obteniendo jugador secreto desde el servidor...');
    manejarExito = function(jugador) {
        jugadorSecreto = jugador;
        juegoActivo = true;
        ocultarModal();
        if (dificultad === 'facil') {
            establecerFuenteFotoSecreta(jugadorSecreto.photo);
            actualizarDesenfoqueFotoSecreta(0, maximosIntentos);
            mostrarContenedorFotoSecreta();
        }
        mostrarPantallaJuego();
    };
    manejarError = function(error) {
        mostrarModal('Error', 'No se pudo obtener el jugador secreto. Revisa tu conexion e intenta de nuevo.');
    };
    obtenerJugadorAleatorio(manejarExito, manejarError);
}