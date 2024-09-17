const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

const form = document.getElementById('registro-form');
const mensajeRegistro = document.getElementById('mensaje-registro');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const posicion = document.getElementById('posicion').value;
    const dorsal = document.getElementById('dorsal').value;
    const pieHabil = document.getElementById('pie-habil').value;

    // Validar los campos obligatorios
    if (!nombre || !apellidos || !edad || !posicion || !dorsal || !pieHabil) {
        mostrarMensajeError('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Validar el formato de los campos
    if (isNaN(edad) || isNaN(dorsal)) {
        mostrarMensajeError('Por favor, ingrese valores numéricos válidos en los campos de edad y dorsal.');
        return;
    }

    // Enviar los datos al servidor (simulado)
    guardarJugador(nombre, apellidos, edad, posicion, dorsal, pieHabil);
    mostrarMensajeExito('¡Jugador registrado con éxito!');

    // Limpiar el formulario
    form.reset();
});

function guardarJugador(nombre, apellidos, edad, posicion, dorsal, pieHabil) {
    // Aquí iría la lógica para enviar los datos al servidor y almacenarlos
    console.log('Jugador guardado:', { nombre, apellidos, edad, posicion, dorsal, pieHabil });
}

function mostrarMensajeError(mensaje) {
    mensajeRegistro.textContent = mensaje;
    mensajeRegistro.classList.add('error');
    mensajeRegistro.classList.remove('success');
}

function mostrarMensajeExito(mensaje) {
    mensajeRegistro.textContent = mensaje;
    mensajeRegistro.classList.add('success');
    mensajeRegistro.classList.remove('error');
}