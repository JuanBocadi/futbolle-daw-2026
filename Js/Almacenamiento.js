'use strict';
var ClaveAlmacenamientoHistorial = 'futbolleHistorial';
function obtenerHistorialJuego() {
    var historialCrudo;
    var historialParseado;
    historialCrudo = localStorage.getItem(ClaveAlmacenamientoHistorial);
    if (!historialCrudo) {
        return [];
    }
    historialParseado = JSON.parse(historialCrudo);
    return historialParseado;
}
function guardarResultadoJuego(registro) {
    var historial;
    historial = obtenerHistorialJuego();
    historial.push(registro);
    localStorage.setItem(ClaveAlmacenamientoHistorial, JSON.stringify(historial));
}
function ordenarHistorialPorFechaDesc(historial) {
    var compararPorFecha;
    compararPorFecha = function (registroA, registroB) {
        return registroB.fechaHora - registroA.fechaHora;
    };
    return historial.slice().sort(compararPorFecha);
}
function ordenarHistorialPorIntentosAsc(historial) {
    var compararPorIntentos;
    compararPorIntentos = function (registroA, registroB) {
        return registroA.intentos - registroB.intentos;
    };
    return historial.slice().sort(compararPorIntentos);
}