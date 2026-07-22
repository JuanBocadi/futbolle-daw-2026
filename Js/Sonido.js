'use strict';
var elementoSonidoAcierto = document.getElementById('SonidoAcierto');
var elementoSonidoVictoria = document.getElementById('SonidoVictoria');
var elementoSonidoDerrota = document.getElementById('SonidoDerrota');
function reproducirSonidoAcierto() {
    if (!elementoSonidoAcierto) {
        return;
    }
    elementoSonidoAcierto.currentTime = 0;
    elementoSonidoAcierto.play();
}
function reproducirSonidoVictoria() {
    if (!elementoSonidoVictoria) {
        return;
    }
    elementoSonidoVictoria.currentTime = 0;
    elementoSonidoVictoria.play();
}
function reproducirSonidoDerrota() {
    if (!elementoSonidoDerrota) {
        return;
    }
    elementoSonidoDerrota.currentTime = 0;
    elementoSonidoDerrota.play();
}