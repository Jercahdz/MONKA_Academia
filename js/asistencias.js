// Inicializar navegación
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animar enlaces
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animación del burger
        burger.classList.toggle('toggle');
    });
}

// Datos quemados
const jugadores = [
    { id: 1, nombre: "Juan", apellidos: "Pérez", edad: 15, goles: 5, categoria: "U-15", tipoGol: "Centro", pieHabil: "Derecho", posicion: "Delantero", dorsal: 9 },
    { id: 2, nombre: "María", apellidos: "González", edad: 17, goles: 7, categoria: "U-17", tipoGol: "Pase", pieHabil: "Izquierdo", posicion: "Centrocampista", dorsal: 8 },
    { id: 3, nombre: "Carlos", apellidos: "Rodríguez", edad: 14, goles: 4, categoria: "U-15", tipoGol: "Tiro de esquina", pieHabil: "Derecho", posicion: "Defensor", dorsal: 3 },
    { id: 4, nombre: "Ana", apellidos: "Martínez", edad: 16, goles: 6, categoria: "U-17", tipoGol: "Pase", pieHabil: "Derecho", posicion: "Delantero", dorsal: 11 },
    { id: 5, nombre: "Luis", apellidos: "Sánchez", edad: 21, goles: 3, categoria: "U-20", tipoGol: "Centro", pieHabil: "Izquierdo", posicion: "Portero", dorsal: 1 }
];

const selectorCategoria = document.getElementById('selector-categoria');
const tablaJugadores = document.getElementById('tabla-jugadores').getElementsByTagName('tbody')[0];
const modal = document.getElementById('detalles-jugador');
const infoJugador = document.getElementById('info-jugador');
const infoAvanzadaDetalles = document.getElementById('info-avanzada-detalles');
const closeModal = document.getElementsByClassName('close')[0];
const modalGol = document.getElementById('añadir-gol');
const closeModalGol = document.getElementsByClassName('close-gol')[0];
const cantidadGolesInput = document.getElementById('cantidad-goles');
const confirmarGolesBtn = document.getElementById('confirmar-goles');
const editarDatosAvanzadosBtn = document.getElementById('editar-datos-avanzados');
const eliminarDatosAvanzadosBtn = document.getElementById('eliminar-datos-avanzados');
let jugadorSeleccionado;

// Filtrar jugadores por categoría
selectorCategoria.addEventListener('change', function () {
    const categoriaSeleccionada = this.value;
    mostrarJugadores(categoriaSeleccionada);
});

function mostrarJugadores(categoria) {
    tablaJugadores.innerHTML = '';
    const jugadoresFiltrados = categoria === 'todos' ? jugadores : jugadores.filter(j => j.categoria === categoria);

    if (jugadoresFiltrados.length === 0) {
        tablaJugadores.innerHTML = '<tr><td colspan="5">No hay jugadores en esta categoría</td></tr>';
        return;
    }

    jugadoresFiltrados.forEach(jugador => {
        const fila = tablaJugadores.insertRow();
        fila.innerHTML = `
            <td>${jugador.nombre}</td>
            <td>${jugador.apellidos}</td>
            <td>${jugador.edad}</td>
            <td>${jugador.goles}</td>
            <td>
                <button onclick="verDetalles(${jugador.id})">Ver detalles</button>
                <button onclick="editarJugador(${jugador.id})">Editar</button>
                <button onclick="eliminarJugador(${jugador.id})">Eliminar</button>
                <button onclick="añadirGol(${jugador.id})">Añadir Asistencia</button>
            </td>
        `;
    });
}

function verDetalles(id) {
    const jugador = jugadores.find(j => j.id === id);
    infoJugador.innerHTML = `
        <p><strong>Nombre:</strong> ${jugador.nombre} ${jugador.apellidos}</p>
        <p><strong>Edad:</strong> ${jugador.edad}</p>
        <p><strong>Posición:</strong> ${jugador.posicion}</p>
        <p><strong>Dorsal:</strong> ${jugador.dorsal}</p>
        <p><strong>Categoría:</strong> ${jugador.categoria}</p>
        <p><strong>Tipo de Asistencia:</strong> ${jugador.tipoGol || 'No especificado'}</p>
        <p><strong>Pie hábil:</strong> ${jugador.pieHabil || 'No especificado'}</p>
        <button onclick="editarDatosAvanzados(${jugador.id})">Editar Datos Avanzados</button>
        <button onclick="eliminarDatosAvanzados(${jugador.id})">Eliminar Datos Avanzados</button>
    `;
    modal.style.display = "block";
}

closeModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function añadirGol(id) {
    jugadorSeleccionado = jugadores.find(j => j.id === id);
    modalGol.style.display = "block";
}

closeModalGol.onclick = function () {
    modalGol.style.display = "none";
}

confirmarGolesBtn.onclick = function () {
    const cantidadGoles = parseInt(cantidadGolesInput.value);
    if (cantidadGoles > 0) {
        jugadorSeleccionado.goles += cantidadGoles;
        mostrarJugadores(selectorCategoria.value);
        modalGol.style.display = "none";
    }
}

function editarDatosAvanzados(id) {
    const jugador = jugadores.find(j => j.id === id);
    const nuevosDatosAvanzados = prompt(`
    Editar Datos Avanzados:
    Tipo de Asistencia: ${jugador.tipoGol}
    Pie Hábil actual: ${jugador.pieHabil}
    (Formato: Tipo del Gol, Pie Habil)
    `, `${jugador.tipoGol || ''}, ${jugador.pieHabil || ''}`);

    if (nuevosDatosAvanzados) {
        const [tipoGol, pieHabil] = nuevosDatosAvanzados.split(',').map(item => item.trim());

        jugador.tipoGol = tipoGol || jugador.tipoGol;
        jugador.pieHabil = pieHabil || jugador.pieHabil;

        verDetalles(id);
    }
}

function eliminarJugador(id) {
    if (confirm("¿Estás seguro de eliminar este jugador?")) {
        const indice = jugadores.findIndex(j => j.id === id);
        jugadores.splice(indice, 1);
        mostrarJugadores(selectorCategoria.value);
    }
}

function eliminarDatosAvanzados(id) {
    const jugador = jugadores.find(j => j.id === id);
    jugador.tipoGol = null;
    jugador.pieHabil = null;
    verDetalles(id);
}

// Modal de edición
const modalEditar = document.getElementById('editar-jugador');
const closeModalEditar = modalEditar.getElementsByClassName('close')[0];

function editarJugador(id) {
    const jugador = jugadores.find(j => j.id === id);

    // Rellena los campos del formulario con la información actual del jugador
    document.getElementById('edit-nombre').value = jugador.nombre;
    document.getElementById('edit-apellidos').value = jugador.apellidos;
    document.getElementById('edit-edad').value = jugador.edad;
    document.getElementById('edit-goles').value = jugador.goles;
    document.getElementById('edit-dorsal').value = jugador.dorsal;
    document.getElementById('edit-posicion').value = jugador.posicion;
    document.getElementById('edit-pie-habil').value = jugador.pieHabil;
    document.getElementById('edit-categoria').value = jugador.categoria;

    // Muestra el modal
    modalEditar.style.display = "block";

    // Maneja el envío del formulario
    const formEditar = document.getElementById('form-editar-jugador');
    formEditar.onsubmit = function(event) {
        event.preventDefault(); // Previene el envío real del formulario

        // Actualiza la información del jugador con los nuevos valores
        jugador.nombre = document.getElementById('edit-nombre').value;
        jugador.apellidos = document.getElementById('edit-apellidos').value;
        jugador.edad = document.getElementById('edit-edad').value;
        jugador.goles = document.getElementById('edit-goles').value;
        jugador.dorsal = document.getElementById('edit-dorsal').value;
        jugador.posicion = document.getElementById('edit-posicion').value;
        jugador.pieHabil = document.getElementById('edit-pie-habil').value;
        jugador.categoria = document.getElementById('edit-categoria').value;

        // Cierra el modal y actualiza la tabla
        modalEditar.style.display = "none";
        mostrarJugadores(selectorCategoria.value);
    };
}

closeModalEditar.onclick = function() {
    modalEditar.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalEditar) {
        modalEditar.style.display = "none";
    }
}

// Modal de edición de datos avanzados
const modalEditarDatosAvanzados = document.getElementById('editar-datos-avanzados');
const closeModalEditarDatosAvanzados = modalEditarDatosAvanzados.getElementsByClassName('close')[0];

function editarDatosAvanzados(id) {
    const jugador = jugadores.find(j => j.id === id);

    // Rellena los campos del formulario con la información actual del jugador
    document.getElementById('edit-tipo-gol').value = jugador.tipoGol || '';
    document.getElementById('edit-pie-habil').value = jugador.pieHabil || '';

    // Muestra el modal
    modalEditarDatosAvanzados.style.display = "block";

    // Maneja el envío del formulario
    const formEditarDatosAvanzados = document.getElementById('form-editar-datos-avanzados');
    formEditarDatosAvanzados.onsubmit = function(event) {
        event.preventDefault(); // Previene el envío real del formulario

        // Actualiza la información del jugador con los nuevos valores
        jugador.tipoGol = document.getElementById('edit-tipo-gol').value;
        jugador.pieHabil = document.getElementById('edit-pie-habil').value;

        // Cierra el modal y actualiza la tabla
        modalEditarDatosAvanzados.style.display = "none";
        verDetalles(id);
    };
}

closeModalEditarDatosAvanzados.onclick = function() {
    modalEditarDatosAvanzados.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalEditarDatosAvanzados) {
        modalEditarDatosAvanzados.style.display = "none";
    }
}

// Inicializar
mostrarJugadores('todos');
navSlide();