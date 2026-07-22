'use strict';
var elementoCapaModal = document.getElementById('CapaModal');
var elementoTituloModal = document.getElementById('TituloModal');
var elementoMensajeModal = document.getElementById('MensajeModal');
var elementoBotonCerrarModal = document.getElementById('BotonCerrarModal');
var elementoCapaModalHistorial = document.getElementById('CapaModalHistorial');
var elementoBotonCerrarHistorial = document.getElementById('BotonCerrarHistorial');
function ocultarModal() {
    elementoCapaModal.classList.add('oculto');
}
function mostrarModal(titulo, mensaje) {
    elementoTituloModal.textContent = titulo;
    elementoMensajeModal.textContent = mensaje;
    elementoCapaModal.classList.remove('oculto');
}
function manejarClickCerrarModal() {
    ocultarModal();
}
function ocultarModalHistorial() {
    elementoCapaModalHistorial.classList.add('oculto');
}
function manejarClickCerrarHistorial() {
    ocultarModalHistorial();
}
function inicializarEventosModal() {
    elementoBotonCerrarModal.addEventListener('click', manejarClickCerrarModal);
    if (elementoBotonCerrarHistorial) {
        elementoBotonCerrarHistorial.addEventListener('click', manejarClickCerrarHistorial);
    }
}
inicializarEventosModal();