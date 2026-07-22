'use strict';
var elementoFormularioContacto = document.getElementById('FormularioContacto');
var elementoInputNombreContacto = document.getElementById('InputNombreContacto');
var elementoInputEmailContacto = document.getElementById('InputEmailContacto');
var elementoInputMensajeContacto = document.getElementById('InputMensajeContacto');
var elementoErrorNombreContacto = document.getElementById('ErrorNombreContacto');
var elementoErrorEmailContacto = document.getElementById('ErrorEmailContacto');
var elementoErrorMensajeContacto = document.getElementById('ErrorMensajeContacto');
function validarAlfanumerico(texto) {
    var regex;
    regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(texto);
}
function validarEmail(email) {
    var regex;
    regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function manejarEnvioContacto(evento) {
    var nombre;
    var email;
    var mensaje;
    var esValido;
    var enlaceMailto;
    evento.preventDefault();
    nombre = elementoInputNombreContacto.value.trim();
    email = elementoInputEmailContacto.value.trim();
    mensaje = elementoInputMensajeContacto.value.trim();
    esValido = true;
    if (nombre === '' || !validarAlfanumerico(nombre)) {
        elementoErrorNombreContacto.classList.remove('oculto');
        esValido = false;
    } else {
        elementoErrorNombreContacto.classList.add('oculto');
    }
    if (email === '' || !validarEmail(email)) {
        elementoErrorEmailContacto.classList.remove('oculto');
        esValido = false;
    } else {
        elementoErrorEmailContacto.classList.add('oculto');
    }
    if (mensaje.length <= 5) {
        elementoErrorMensajeContacto.classList.remove('oculto');
        esValido = false;
    } else {
        elementoErrorMensajeContacto.classList.add('oculto');
    }
    if (esValido) {
        enlaceMailto = 'mailto:Juanchruzbocadi@gmail.com?subject=Consulta Futbolle - ' + encodeURIComponent(nombre) + '&body=' + encodeURIComponent(mensaje + '\n\nResponder a: ' + email);
        window.location.href = enlaceMailto;
        elementoFormularioContacto.reset();
    }
}
function inicializarContacto() {
    if (elementoFormularioContacto) {
        elementoFormularioContacto.addEventListener('submit', manejarEnvioContacto);
    }
}
inicializarContacto();