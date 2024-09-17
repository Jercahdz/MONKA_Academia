const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });
}

// Datos quemados
const jugadores = [
    { id: 1, nombre: "Juan", apellidos: "Pérez", edad: 15, dorsal: 10, categoria: "U-15", nota: 8.5 },
    { id: 2, nombre: "María", apellidos: "González", edad: 17, dorsal: 7, categoria: "U-17", nota: 7.3 },
    { id: 3, nombre: "Carlos", apellidos: "Rodríguez", edad: 14, dorsal: 5, categoria: "U-17", nota: 9.0 },
    { id: 4, nombre: "Ana", apellidos: "Martínez", edad: 16, dorsal: 9, categoria: "U-20", nota: 6.8 },
    { id: 5, nombre: "Luis", apellidos: "Sánchez", edad: 21, dorsal: 1, categoria: "U-20", nota: 5.5 },
];

const selectorCategoria = document.getElementById('selector-categoria');
const tablaEvaluaciones = document.getElementById('tabla-evaluaciones').getElementsByTagName('tbody')[0];
const modalDetalles = document.getElementById('detalles-jugador');
const infoJugador = document.getElementById('info-jugador');
const closeModalDetalles = document.getElementsByClassName('close')[0];
const seleccionarTodosCheckbox = document.getElementById('seleccionar-todos');
const editarSeleccionadosBtn = document.getElementById('editar-seleccionados');
const eliminarSeleccionadosBtn = document.getElementById('eliminar-seleccionados');


// Filtrar evaluaciones por categoría
selectorCategoria.addEventListener('change', function() {
    const categoriaSeleccionada = this.value;
    mostrarEvaluaciones(categoriaSeleccionada);
});

function mostrarEvaluaciones(categoria) {
    tablaEvaluaciones.innerHTML = '';
    const jugadoresFiltrados = categoria === 'todos' ? jugadores : jugadores.filter(j => j.categoria === categoria);
    
    if (jugadoresFiltrados.length === 0) {
        tablaEvaluaciones.innerHTML = '<tr><td colspan="7">No hay jugadores en esta categoría</td></tr>';
        return;
    }

    jugadoresFiltrados.forEach(jugador => {
        const fila = tablaEvaluaciones.insertRow();
        fila.innerHTML = `
            <td><input type="checkbox" class="seleccionar-jugador" data-id="${jugador.id}"></td>
            <td>${jugador.nombre}</td>
            <td>${jugador.apellidos}</td>
            <td>${jugador.edad}</td>
            <td>${jugador.dorsal}</td>
            <td>${jugador.nota}</td>
            <td>
                <button onclick="verDetalles(${jugador.id})">Ver detalles</button>
                <button onclick="eliminarJugador(${jugador.id})">Eliminar</button>
                <button onclick="asignarNota(${jugador.id})">Asignar Nota</button>
            </td>
        `;
    });
}

// Seleccionar/Deseleccionar todos los jugadores
seleccionarTodosCheckbox.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.seleccionar-jugador');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

// Ver detalles del jugador
function verDetalles(id) {
    const jugador = jugadores.find(j => j.id === id);
    infoJugador.innerHTML = `
        <p><strong>Nombre:</strong> ${jugador.nombre} ${jugador.apellidos}</p>
        <p><strong>Edad:</strong> ${jugador.edad}</p>
        <p><strong>Dorsal:</strong> ${jugador.dorsal}</p>
        <p><strong>Nota:</strong> ${jugador.nota}</p>
        <p><strong>Categoría:</strong> ${jugador.categoria}</p>
    `;
    modalDetalles.style.display = "block";
}

closeModalDetalles.onclick = function() {
    modalDetalles.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalDetalles) {
        modalDetalles.style.display = "none";
    }
}

// Editar notas de jugadores seleccionados
editarSeleccionadosBtn.addEventListener('click', function() {
    const seleccionados = document.querySelectorAll('.seleccionar-jugador:checked');
    if (seleccionados.length === 0) {
        alert('No se han seleccionado jugadores para editar.');
        return;
    }

    const modalEditarNotas = document.getElementById('editar-notas');
    const formEditarNotas = document.getElementById('form-editar-notas');
    const notaInput = document.getElementById('nota');

    formEditarNotas.onsubmit = function(event) {
        event.preventDefault();

        seleccionados.forEach(checkbox => {
            const jugador = jugadores.find(j => j.id === parseInt(checkbox.dataset.id));
            const nuevaNota = parseFloat(notaInput.value);
            jugador.nota = nuevaNota;
        });

        mostrarEvaluaciones(selectorCategoria.value);
        modalEditarNotas.style.display = "none";
    };

    modalEditarNotas.style.display = "block";
});

// Eliminar jugadores seleccionados
eliminarSeleccionadosBtn.addEventListener('click', function() {
    const seleccionados = document.querySelectorAll('.seleccionar-jugador:checked');
    if (seleccionados.length === 0) {
        alert('No se han seleccionado jugadores para eliminar.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar los jugadores seleccionados?')) {
        seleccionados.forEach(checkbox => {
            const index = jugadores.findIndex(j => j.id === parseInt(checkbox.dataset.id));
            if (index !== -1) {
                jugadores.splice(index, 1);
            }
        });

        mostrarEvaluaciones(selectorCategoria.value);
    }
});

// Eliminar jugador
function eliminarJugador(id) {
    const index = jugadores.findIndex(j => j.id === id);
    if (index !== -1) {
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este jugador?');
        if (confirmacion) {
            jugadores.splice(index, 1);
            mostrarEvaluaciones(selectorCategoria.value);
        }
    }
}

//Asignar nota individual y multiple
// Asignar nota
function asignarNota(id) {
    const jugador = jugadores.find(j => j.id === id);
    const modalAsignarNota = document.getElementById('asignar-nota');
    const formAsignarNota = document.getElementById('form-asignar-nota');
    const nuevaNotaInput = document.getElementById('nueva-nota');

    nuevaNotaInput.value = jugador.nota;

    formAsignarNota.onsubmit = function(event) {
        event.preventDefault();

        const nuevaNota = parseFloat(nuevaNotaInput.value);

        if (isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 10) {
            alert('La nota ingresada no es válida. Debe ser un número entre 0 y 10.');
            return;
        }

        jugador.nota = nuevaNota;
        mostrarEvaluaciones(selectorCategoria.value);
        modalAsignarNota.style.display = "none";
    };

    modalAsignarNota.style.display = "block";
}

// Asignar nota múltiple



mostrarEvaluaciones('todos');
navSlide();