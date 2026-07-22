'use strict';
var elementoInputIntento = document.getElementById('InputIntento');
var elementoListaSugerencias = document.getElementById('ListaSugerencias');
var sugerenciasActuales = [];
var indiceSugerenciaSeleccionada = -1;
function ocultarSugerencias() {
    elementoListaSugerencias.classList.add('oculto');
    elementoListaSugerencias.textContent = '';
    indiceSugerenciaSeleccionada = -1;
}
function manejarClickSugerencia(jugador) {
    ocultarSugerencias();
    elementoInputIntento.value = '';
    alSeleccionarSugerenciaJugador(jugador);
}
function crearItemSugerencia(jugador) {
    var elementoItem;
    var manejarClick;
    elementoItem = document.createElement('li');
    elementoItem.className = 'ItemSugerencia';
    elementoItem.textContent = jugador.name;
    manejarClick = function () {
        manejarClickSugerencia(jugador);
    };
    elementoItem.addEventListener('click', manejarClick);
    return elementoItem;
}
function actualizarSeleccionVisualSugerencias() {
    var items = elementoListaSugerencias.getElementsByClassName('ItemSugerencia');
    var i;
    for (i = 0; i < items.length; i = i + 1) {
        if (i === indiceSugerenciaSeleccionada) {
            items[i].classList.add('SugerenciaActiva');
            items[i].scrollIntoView({ block: 'nearest' });
        } else {
            items[i].classList.remove('SugerenciaActiva');
        }
    }
}
function renderizarSugerencias(jugadores) {
    var indice;
    var elementoItem;
    var jugadoresFiltrados = [];
    var j;
    /* Filtramos la lista para quitar los jugadores que ya se intentaron adivinar */
    for (j = 0; j < jugadores.length; j = j + 1) {
        if (typeof jugadoresAdivinados === 'undefined' || jugadoresAdivinados.indexOf(jugadores[j].id) === -1) {
            jugadoresFiltrados.push(jugadores[j]);
        }
    }
    /* Guardamos los filtrados para que las flechas y el Enter coincidan con lo visible */
    sugerenciasActuales = jugadoresFiltrados;
    elementoListaSugerencias.textContent = '';
    indiceSugerenciaSeleccionada = -1;
    if (jugadoresFiltrados.length === 0) {
        ocultarSugerencias();
        return;
    }
    for (indice = 0; indice < jugadoresFiltrados.length; indice = indice + 1) {
        elementoItem = crearItemSugerencia(jugadoresFiltrados[indice]);
        elementoListaSugerencias.appendChild(elementoItem);
    }
    elementoListaSugerencias.classList.remove('oculto');
}
function manejarExitoBusqueda(jugadores) {
    renderizarSugerencias(jugadores);
}
function manejarErrorBusqueda() {
    ocultarSugerencias();
}
function manejarCambioInputIntento() {
    var consulta;
    indiceSugerenciaSeleccionada = -1;
    consulta = elementoInputIntento.value.trim();
    if (consulta.length < 2) {
        ocultarSugerencias();
        return;
    }
    buscarJugadores(consulta, manejarExitoBusqueda, manejarErrorBusqueda);
}
function manejarTecladoAutocompletado(evento) {
    var items = elementoListaSugerencias.getElementsByClassName('ItemSugerencia');
    if (items.length === 0 || elementoListaSugerencias.classList.contains('oculto')) {
        return;
    }
    if (evento.key === 'ArrowDown') {
        evento.preventDefault();
        indiceSugerenciaSeleccionada = indiceSugerenciaSeleccionada + 1;
        if (indiceSugerenciaSeleccionada >= items.length) {
            indiceSugerenciaSeleccionada = 0;
        }
        actualizarSeleccionVisualSugerencias();
    }
    else if (evento.key === 'ArrowUp') {
        evento.preventDefault();
        indiceSugerenciaSeleccionada = indiceSugerenciaSeleccionada - 1;
        if (indiceSugerenciaSeleccionada < 0) {
            indiceSugerenciaSeleccionada = items.length - 1;
        }
        actualizarSeleccionVisualSugerencias();
    }
    else if (evento.key === 'Enter') {
        if (indiceSugerenciaSeleccionada >= 0 && indiceSugerenciaSeleccionada < sugerenciasActuales.length) {
            evento.preventDefault();
            manejarClickSugerencia(sugerenciasActuales[indiceSugerenciaSeleccionada]);
        }
    }
}
function inicializarAutocompletado() {
    elementoInputIntento.addEventListener('input', manejarCambioInputIntento);
    elementoInputIntento.addEventListener('keydown', manejarTecladoAutocompletado);
}