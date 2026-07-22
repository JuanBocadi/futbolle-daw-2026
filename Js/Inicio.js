'use strict';
var elementoFormularioInicio = document.getElementById('FormularioInicio');
var elementoInputNombreJugador = document.getElementById('InputNombreJugador');
var elementoErrorNombreJugador = document.getElementById('ErrorNombreJugador');
var elementoBotonReiniciar = document.getElementById('BotonReiniciar');
var elementoBotonHistorial = document.getElementById('BotonHistorial');
var elementoBotonOrdenarPorFecha = document.getElementById('BotonOrdenarPorFecha');
var elementoBotonOrdenarPorIntentos = document.getElementById('BotonOrdenarPorIntentos');
var elementoCapaModalHistorialInicio = document.getElementById('CapaModalHistorial');
function manejarEnvioInicio(evento) {
    var nombre;
    var inputsDificultad;
    var dificultadSeleccionada;
    var indice;
    evento.preventDefault();
    nombre = elementoInputNombreJugador.value.trim();
    if (nombre.length < 3) {
        elementoErrorNombreJugador.classList.remove('oculto');
        return;
    }
    elementoErrorNombreJugador.classList.add('oculto');
    inputsDificultad = document.getElementsByName('Dificultad');
    dificultadSeleccionada = 'facil';
    for (indice = 0; indice < inputsDificultad.length; indice = indice + 1) {
        if (inputsDificultad[indice].checked) {
            dificultadSeleccionada = inputsDificultad[indice].value;
        }
    }
    iniciarPartida(nombre, dificultadSeleccionada);
}
function manejarClickReiniciar() {
    var inputsDificultad;
    var dificultadSeleccionada;
    var indice;
    var nombre;
    inputsDificultad = document.getElementsByName('Dificultad');
    dificultadSeleccionada = 'facil';
    for (indice = 0; indice < inputsDificultad.length; indice = indice + 1) {
        if (inputsDificultad[indice].checked) {
            dificultadSeleccionada = inputsDificultad[indice].value;
        }
    }
    nombre = elementoInputNombreJugador.value.trim();
    if (nombre.length < 3) {
        nombre = nombreJugadorActual;
    }
    iniciarPartida(nombre, dificultadSeleccionada);
}
function mostrarHistorialJuego() {
    var historial;
    historial = obtenerHistorialJuego();
    renderizarListaHistorial(historial);
    elementoCapaModalHistorialInicio.classList.remove('oculto');
}
function ordenarPorFecha() {
    var historial;
    var historialOrdenado;
    historial = obtenerHistorialJuego();
    historialOrdenado = ordenarHistorialPorFechaDesc(historial);
    renderizarListaHistorial(historialOrdenado);
}
function ordenarPorIntentos() {
    var historial;
    var historialOrdenado;
    historial = obtenerHistorialJuego();
    historialOrdenado = ordenarHistorialPorIntentosAsc(historial);
    renderizarListaHistorial(historialOrdenado);
}
function inicializarInicio() {
    inicializarAutocompletado();
    if (elementoFormularioInicio) {
        elementoFormularioInicio.addEventListener('submit', manejarEnvioInicio);
    }
    if (elementoBotonReiniciar) {
        elementoBotonReiniciar.addEventListener('click', manejarClickReiniciar);
    }
    if (elementoBotonHistorial) {
        elementoBotonHistorial.addEventListener('click', mostrarHistorialJuego);
    }
    if (elementoBotonOrdenarPorFecha) {
        elementoBotonOrdenarPorFecha.addEventListener('click', ordenarPorFecha);
    }
    if (elementoBotonOrdenarPorIntentos) {
        elementoBotonOrdenarPorIntentos.addEventListener('click', ordenarPorIntentos);
    }
}
inicializarInicio();