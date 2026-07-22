'use strict';
var ClaveAlmacenamientoTema = 'futbolleTema';
var elementoPantallaInicio = document.getElementById('PantallaInicio');
var elementoPantallaJuego = document.getElementById('PantallaJuego');
var elementoValorIntentosRestantes = document.getElementById('ValorIntentosRestantes');
var elementoValorTemporizador = document.getElementById('ValorTemporizador');
var elementoValorDificultad = document.getElementById('ValorDificultad');
var elementoTableroIntentos = document.getElementById('TableroIntentos');
var elementoContenedorFotoSecreta = document.getElementById('ContenedorFotoSecreta');
var elementoFotoSecreta = document.getElementById('FotoSecreta');
var elementoListaPistasReveladas = document.getElementById('ListaPistasReveladas');
var elementoBotonAlternarTema = document.getElementById('BotonAlternarTema');
var elementoListaHistorial = document.getElementById('ListaHistorial');
function obtenerClaseEstadoIntento(estado) {
    if (estado === 'coincide') {
        return 'CeldaCoincidencia';
    }
    if (estado === 'mayor') {
        return 'CeldaMayor';
    }
    if (estado === 'menor') {
        return 'CeldaMenor';
    }
    return 'CeldaSinCoincidencia';
}
function obtenerFlechaEstadoIntento(estado) {
    if (estado === 'mayor') {
        return ' \u25B2';
    }
    if (estado === 'menor') {
        return ' \u25BC';
    }
    return '';
}
function crearCeldaFeedback(item) {
    var elementoCelda;
    var elementoEtiqueta;
    var elementoValor;
    var claseEstado;
    elementoCelda = document.createElement('div');
    elementoEtiqueta = document.createElement('span');
    elementoValor = document.createElement('span');
    claseEstado = obtenerClaseEstadoIntento(item.estado);
    elementoCelda.className = 'CeldaFeedback ' + claseEstado;
    elementoEtiqueta.className = 'EtiquetaFeedback';
    elementoEtiqueta.textContent = item.etiqueta;
    elementoValor.className = 'ValorFeedback';
    elementoValor.textContent = item.valor + obtenerFlechaEstadoIntento(item.estado);
    elementoCelda.appendChild(elementoEtiqueta);
    elementoCelda.appendChild(elementoValor);
    return elementoCelda;
}
function crearFilaIntento(numeroIntento, nombreJugadorIntento, listaComparacion) {
    var elementoFila;
    var elementoEncabezado;
    var elementoNumero;
    var elementoNombre;
    var elementoCeldas;
    var indice;
    var elementoCeldaFeedback;
    elementoFila = document.createElement('div');
    elementoEncabezado = document.createElement('div');
    elementoNumero = document.createElement('span');
    elementoNombre = document.createElement('span');
    elementoCeldas = document.createElement('div');
    elementoFila.className = 'FilaIntento';
    elementoEncabezado.className = 'EncabezadoIntento';
    elementoNumero.className = 'NumeroIntento';
    elementoNumero.textContent = String(numeroIntento);
    elementoNombre.className = 'NombreIntento';
    elementoNombre.textContent = nombreJugadorIntento;
    elementoCeldas.className = 'FilaCeldas';
    elementoEncabezado.appendChild(elementoNumero);
    elementoEncabezado.appendChild(elementoNombre);
    elementoFila.appendChild(elementoEncabezado);
    for (indice = 0; indice < listaComparacion.length; indice = indice + 1) {
        elementoCeldaFeedback = crearCeldaFeedback(listaComparacion[indice]);
        /* Aplicamos un retraso escalonado dinámico en milisegundos para la animación CSS */
        elementoCeldaFeedback.style.animationDelay = (indice * 0.15) + 's';
        elementoCeldas.appendChild(elementoCeldaFeedback);
    }
    elementoFila.appendChild(elementoCeldas);
    return elementoFila;
}
function renderizarIntento(numeroIntento, nombreJugadorIntento, listaComparacion) {
    var elementoFila;
    elementoFila = crearFilaIntento(numeroIntento, nombreJugadorIntento, listaComparacion);
    elementoTableroIntentos.insertBefore(elementoFila, elementoTableroIntentos.firstChild);
}
function limpiarTableroIntentos() {
    elementoTableroIntentos.textContent = '';
}
function actualizarDisplayIntentosRestantes(cantidad) {
    elementoValorIntentosRestantes.textContent = String(cantidad);
}
function actualizarDisplayTemporizador(segundosTotales) {
    var minutos;
    var segundos;
    var textoMinutos;
    var textoSegundos;
    minutos = Math.floor(segundosTotales / 60);
    segundos = segundosTotales % 60;
    textoMinutos = minutos < 10 ? '0' + minutos : String(minutos);
    textoSegundos = segundos < 10 ? '0' + segundos : String(segundos);
    elementoValorTemporizador.textContent = textoMinutos + ':' + textoSegundos;
}
function actualizarDisplayDificultad(etiqueta) {
    elementoValorDificultad.textContent = etiqueta;
}
function mostrarPantallaJuego() {
    elementoPantallaInicio.classList.add('oculto');
    elementoPantallaJuego.classList.remove('oculto');
}
function mostrarPantallaInicio() {
    elementoPantallaJuego.classList.add('oculto');
    elementoPantallaInicio.classList.remove('oculto');
}
function mostrarContenedorFotoSecreta() {
    elementoContenedorFotoSecreta.classList.remove('oculto');
}
function ocultarContenedorFotoSecreta() {
    elementoContenedorFotoSecreta.classList.add('oculto');
}
function manejarErrorFotoSecreta() {
    /* Ponemos una silueta gris generica de reemplazo */
    elementoFotoSecreta.src = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    /* Evitamos que el error se cicle infinito si la de respaldo tambien llegara a fallar */
    elementoFotoSecreta.onerror = null;
}
function establecerFuenteFotoSecreta(urlFoto) {
    /* Intentamos cargar la foto que manda la API */
    elementoFotoSecreta.src = urlFoto;
    /* Si el servidor de SoFifa bloquea la imagen o no existe, atajamos el error */
    elementoFotoSecreta.onerror = manejarErrorFotoSecreta;
}
function actualizarDesenfoqueFotoSecreta(intentosUsados, maximosIntentos) {
    var cantidadDesenfoque;
    cantidadDesenfoque = 16 - Math.round((intentosUsados / maximosIntentos) * 16);
    if (cantidadDesenfoque < 0) {
        cantidadDesenfoque = 0;
    }
    elementoFotoSecreta.style.filter = 'blur(' + cantidadDesenfoque + 'px)';
}
function limpiarPistasReveladas() {
    elementoListaPistasReveladas.textContent = '';
}
function agregarPistaRevelada(textoEtiqueta, textoValor) {
    var elementoPista;
    elementoPista = document.createElement('p');
    elementoPista.className = 'PistaRevelada';
    elementoPista.textContent = textoEtiqueta + ': ' + textoValor;
    elementoListaPistasReveladas.appendChild(elementoPista);
}
function aplicarClaseTema(nombreTema) {
    if (nombreTema === 'oscuro') {
        document.body.classList.add('TemaOscuro');
        elementoBotonAlternarTema.textContent = 'Modo claro';
        return;
    }
    document.body.classList.remove('TemaOscuro');
    elementoBotonAlternarTema.textContent = 'Modo oscuro';
}
function obtenerTemaGuardado() {
    var guardado;
    guardado = localStorage.getItem(ClaveAlmacenamientoTema);
    if (guardado === 'oscuro') {
        return 'oscuro';
    }
    return 'claro';
}
function establecerTemaGuardado(nombreTema) {
    localStorage.setItem(ClaveAlmacenamientoTema, nombreTema);
}
function manejarClickAlternarTema() {
    var temaActual;
    var proximoTema;
    temaActual = obtenerTemaGuardado();
    proximoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    establecerTemaGuardado(proximoTema);
    aplicarClaseTema(proximoTema);
}
function inicializarAlternarTema() {
    aplicarClaseTema(obtenerTemaGuardado());
    if (elementoBotonAlternarTema) {
        elementoBotonAlternarTema.addEventListener('click', manejarClickAlternarTema);
    }
}
function formatearEtiquetaDuracion(segundosTotales) {
    var minutos;
    var segundos;
    minutos = Math.floor(segundosTotales / 60);
    segundos = segundosTotales % 60;
    return minutos + 'm ' + segundos + 's';
}
function crearFilaHistorial(registro) {
    var elementoFila;
    var elementoNombre;
    var elementoResultado;
    var elementoIntentos;
    var elementoDuracion;
    var elementoFecha;
    elementoFila = document.createElement('div');
    elementoNombre = document.createElement('span');
    elementoResultado = document.createElement('span');
    elementoIntentos = document.createElement('span');
    elementoDuracion = document.createElement('span');
    elementoFecha = document.createElement('span');
    elementoFila.className = 'FilaHistorial';
    elementoNombre.className = 'CeldaHistorial';
    elementoNombre.textContent = registro.nombreJugador;
    elementoResultado.className = registro.resultado === 'ganado' ? 'CeldaHistorial HistorialVictoria' : 'CeldaHistorial HistorialDerrota';
    elementoResultado.textContent = registro.resultado;
    elementoIntentos.className = 'CeldaHistorial';
    elementoIntentos.textContent = registro.intentos + ' intentos';
    elementoDuracion.className = 'CeldaHistorial';
    elementoDuracion.textContent = formatearEtiquetaDuracion(registro.duracionSegundos);
    elementoFecha.className = 'CeldaHistorial';
    elementoFecha.textContent = new Date(registro.fechaHora).toLocaleString();
    elementoFila.appendChild(elementoNombre);
    elementoFila.appendChild(elementoResultado);
    elementoFila.appendChild(elementoIntentos);
    elementoFila.appendChild(elementoDuracion);
    elementoFila.appendChild(elementoFecha);
    return elementoFila;
}
function renderizarListaHistorial(registrosHistorial) {
    var indice;
    var elementoFila;
    elementoListaHistorial.textContent = '';
    if (registrosHistorial.length === 0) {
        elementoListaHistorial.textContent = 'Todavia no jugaste ninguna partida';
        return;
    }
    for (indice = 0; indice < registrosHistorial.length; indice = indice + 1) {
        elementoFila = crearFilaHistorial(registrosHistorial[indice]);
        elementoListaHistorial.appendChild(elementoFila);
    }
}
inicializarAlternarTema();