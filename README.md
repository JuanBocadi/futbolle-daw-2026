# Futbolle - Proyecto Final DAW 2026

Juego web desarrollado para la materia Desarrollo y Arquitecturas Web (UAI). El objetivo del juego es adivinar un jugador de fútbol "secreto" en un máximo de 8 intentos, basándose en pistas de sus atributos comparadas dinámicamente.

## Características Principales
* **Conexión a API:** Consumo de endpoints provistos por la cátedra mediante `fetch`.
* **Motor de Búsqueda:** Autocompletado dinámico que busca coincidencias a partir de los 2 caracteres ingresados.
* **Lógica de Juego:** Evaluación por cada intento mostrando feedback visual (colores y flechas) de Nacionalidad, Club, Posición, Edad, Overall y Altura.
* **Dificultades:** Tres niveles (Fácil, Medio y Difícil) que habilitan fotos desenfocadas o pistas progresivas según los intentos fallidos.
* **Persistencia:** Guardado del historial de partidas utilizando `LocalStorage`, con opciones para ordenar por fecha o por cantidad de intentos.
* **Accesibilidad:** Interfaz responsiva desarrollada con Flexbox y opción de alternar entre Modo Claro y Modo Oscuro.

## Estructura Técnica
El proyecto fue construido utilizando estrictamente HTML5, CSS3 y JavaScript bajo estándar ES5 (`'use strict'`). La arquitectura está modularizada separando responsabilidades (UI, Motor de Juego, Conexiones a API, Validaciones) y respeta una convención de nomenclatura 100% en español (PascalCase para módulos, camelCase para funciones y variables).