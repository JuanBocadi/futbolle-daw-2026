'use strict';
var UrlBaseApi = 'https://futbolle-daw-uai-2026.onrender.com/api/players';
function obtenerJugadorAleatorio(alTenerExito, alTenerError) {
    var url;
    var manejarRespuesta;
    var manejarError;
    url = UrlBaseApi + '/random';
    manejarRespuesta = function (respuesta) {
        if (!respuesta.ok) {
            throw new Error('Error de red al obtener el jugador secreto');
        }
        return respuesta.json();
    };
    manejarError = function (error) {
        alTenerError(error);
    };
    fetch(url).then(manejarRespuesta).then(alTenerExito).catch(manejarError);
}
function buscarJugadores(consulta, alTenerExito, alTenerError) {
    var url;
    var manejarRespuesta;
    var manejarError;
    url = UrlBaseApi + '/search?q=' + encodeURIComponent(consulta) + '&limit=8';
    manejarRespuesta = function (respuesta) {
        if (!respuesta.ok) {
            throw new Error('Error de red al buscar jugadores');
        }
        return respuesta.json();
    };
    manejarError = function (error) {
        alTenerError(error);
    };
    fetch(url).then(manejarRespuesta).then(alTenerExito).catch(manejarError);
}