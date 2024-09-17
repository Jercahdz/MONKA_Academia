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

// Datos quemados
const jugadores = [
    { id: 1, nombre: "Juan", apellidos: "Pérez", edad: 15, dorsal: 10, categoria: "U-15", posicion: "Delantero", pieHabil: "Derecho" },
    { id: 2, nombre: "María", apellidos: "González", edad: 17, dorsal: 7, categoria: "U-17", posicion: "Mediocampista", pieHabil: "Izquierdo" },
    { id: 3, nombre: "Carlos", apellidos: "Rodríguez", edad: 14, dorsal: 5, categoria: "U-17", posicion: "Defensa", pieHabil: "Derecho" },
    { id: 4, nombre: "Ana", apellidos: "Martínez", edad: 16, dorsal: 9, categoria: "U-20", posicion: "Delantera", pieHabil: "Derecho" },
    { id: 5, nombre: "Luis", apellidos: "Sánchez", edad: 21, dorsal: 1, categoria: "U-20", posicion: "Portero", pieHabil: "Izquierdo" },
];

const selectorCategoria = document.getElementById('selector-categoria');
const tablaJugadores = document.getElementById('tabla-jugadores').getElementsByTagName('tbody')[0];
const modal = document.getElementById('detalles-jugador');
const infoJugador = document.getElementById('info-jugador');
const closeModal = document.getElementsByClassName('close')[0];

// Filtrar jugadores por categoría
selectorCategoria.addEventListener('change', function() {
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
            <td>${jugador.dorsal}</td>
            <td>
                <button onclick="verDetalles(${jugador.id})">Ver detalles</button>
                <button onclick="editarJugador(${jugador.id})">Editar</button>
                <button onclick="eliminarJugador(${jugador.id})">Eliminar</button>
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
        <p><strong>Pie hábil:</strong> ${jugador.pieHabil}</p>
        <p><strong>Categoría:</strong> ${jugador.categoria}</p>
    `;
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function editarJugador(id) {
    alert(`Editar jugador con ID: ${id}`);
}

function eliminarJugador(id) {
    if (confirm('¿Estás seguro de que quieres eliminar a este jugador?')) {
        alert(`Jugador con ID ${id} eliminado`);
        // En una aplicación real, aquí se eliminaría el jugador de la lista
        // Por ahora, solo refrescamos la vista
        mostrarJugadores(selectorCategoria.value);
    }
}

// Inicializar la tabla con todos los jugadores
mostrarJugadores('todos');

// Modal de edición
const modalEditar = document.getElementById('editar-jugador');
const closeModalEditar = modalEditar.getElementsByClassName('close')[0];

function editarJugador(id) {
    const jugador = jugadores.find(j => j.id === id);

    // Rellena los campos del formulario con la información actual del jugador
    document.getElementById('edit-nombre').value = jugador.nombre;
    document.getElementById('edit-apellidos').value = jugador.apellidos;
    document.getElementById('edit-edad').value = jugador.edad;
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
