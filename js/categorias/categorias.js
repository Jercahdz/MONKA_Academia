document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    let categoriaSeleccionada = 'todos';

    // Función genérica para cargar datos dinámicos en una tabla con paginación
    function cargarJugadores(categoria, page = 1) {
        const url = `php/jugadores/jugadores.php?categoria=${categoria}&page=${page}`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-jugadores').innerHTML = data;

                // Reasignar eventos dinámicos
                agregarEventosBotones();

                // Reasignar eventos a los links de paginación
                const paginacionLinks = document.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        currentPage = this.getAttribute("data-page");
                        cargarJugadores(categoriaSeleccionada, currentPage);
                    });
                });
            })
            .catch(error => console.error("Error al cargar la tabla:", error));
    }

    // Manejo del cambio en el selector de categorías
    const selectorCategoria = document.getElementById('selector-categoria');
    selectorCategoria.addEventListener('change', function () {
        categoriaSeleccionada = this.value;
        currentPage = 1; // Reiniciar a la primera página al cambiar de categoría
        cargarJugadores(categoriaSeleccionada, currentPage);
    });

    // Función para agregar eventos dinámicos a los botones (detalles y edición)
    function agregarEventosBotones() {
        // Evento "Ver Detalles"
        document.querySelectorAll('.btn-ver-detalles').forEach(button => {
            button.addEventListener('click', function () {
                const jugadorId = this.getAttribute('data-jugador-id');
                mostrarDetallesJugador(jugadorId);
            });
        });

        // Evento "Editar"
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function () {
                const jugadorId = this.getAttribute('data-jugador-id');
                cargarDatosJugadorParaEdicion(jugadorId);
            });
        });
    }

    // Mostrar los detalles de un jugador en un modal
    function mostrarDetallesJugador(jugadorId) {
        fetch(`php/jugadores/detallesJugador.php?jugadorId=${jugadorId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error al cargar los detalles:", data.error);
                } else {
                    document.getElementById('modal-nombre').textContent = data.nombreJugador;
                    document.getElementById('modal-apellidos').textContent = data.apellidos;
                    document.getElementById('modal-edad').textContent = data.edad;
                    document.getElementById('modal-dorsal').textContent = data.dorsal;
                    document.getElementById('modal-pieHabil').textContent = data.pieHabil;
                    document.getElementById('modal-categoria').textContent = data.nombreCategoria;

                    $('#detallesModal').modal('show');
                }
            })
            .catch(error => console.error(`Error al cargar los detalles del jugador: ${error.message}`));
    }

    // Cargar los datos de un jugador en el modal de edición
    function cargarDatosJugadorParaEdicion(jugadorId) {
        fetch(`php/jugadores/detallesJugador.php?jugadorId=${jugadorId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error al cargar los datos para edición:", data.error);
                } else {
                    document.getElementById('editar-jugador-id').value = jugadorId;
                    document.getElementById('editar-nombre-jugador').value = data.nombreJugador;
                    document.getElementById('editar-apellidos').value = data.apellidos;
                    document.getElementById('editar-edad').value = data.edad;
                    document.getElementById('editar-dorsal').value = data.dorsal;
                    const pieHabilSelect = document.getElementById('editar-pieHabil');
                    pieHabilSelect.value = data.pieHabil === 'Izquierdo' || data.pieHabil === 'Derecho' ? data.pieHabil : '';
                    $('#editarModal').modal('show');
                }
            })
            .catch(error => console.error(`Error al cargar los datos del jugador: ${error.message}`));
    }    

    // Manejo del formulario de edición
    document.getElementById('formEditarJugador').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío estándar del formulario
    
        const jugadorId = document.getElementById('editar-jugador-id').value;
        const dorsal = document.getElementById('editar-dorsal').value;
        const pieHabil = document.getElementById('editar-pieHabil').value.trim();
    
        fetch('php/jugadores/editarJugador.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `jugadorId=${jugadorId}&dorsal=${dorsal}&pieHabil=${encodeURIComponent(pieHabil)}`,
        })
            .then(response => {
                if (response.ok) {
                    $("#editarModal").modal("hide");
                    cargarJugadores(categoriaSeleccionada, currentPage);
                } else {
                    return response.json().then(errorData => {
                        console.error("Error al actualizar el jugador:", errorData.error || "Error desconocido");
                    });
                }
            })
            .catch(error => console.error("Error al enviar los datos de edición:", error));
    });    

    // Cargar jugadores al iniciar
    cargarJugadores(categoriaSeleccionada, currentPage);
});