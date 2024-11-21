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

document.addEventListener('DOMContentLoaded', function() {
    const dropdownFormaciones = document.getElementById('dropdown-formaciones');
    const btnRegresar = document.getElementById('btn-regresar');
    const imgFormacion = document.getElementById('img-formacion');

    let formacionActual = '4-4-2';
    let formacionAnterior = null;

    // Función para cambiar la formación
    function cambiarFormacion(nuevaFormacion) {
        formacionAnterior = formacionActual;
        formacionActual = nuevaFormacion;
        imgFormacion.src = `img/${nuevaFormacion}.png`;
        imgFormacion.alt = `Formación ${nuevaFormacion}`;
    }

    // Evento para cambiar la formación cuando se selecciona una opción del dropdown
    dropdownFormaciones.addEventListener('change', function() {
        cambiarFormacion(this.value);
    });

    // Evento para regresar a la formación anterior
    btnRegresar.addEventListener('click', function() {
        if (formacionAnterior) {
            cambiarFormacion(formacionAnterior);
            dropdownFormaciones.value = formacionActual;
        } else {
            alert('No hay formación anterior disponible');
        }
    });

    // Inicializar con la formación por defecto
    dropdownFormaciones.value = formacionActual;
});