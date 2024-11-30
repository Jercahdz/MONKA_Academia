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
                    alert(data.error);
                } else {
                    // Rellenar los datos del modal
                    document.getElementById('modal-nombre').textContent = data.nombreJugador;
                    document.getElementById('modal-apellidos').textContent = data.apellidos;
                    document.getElementById('modal-edad').textContent = data.edad;
                    document.getElementById('modal-dorsal').textContent = data.dorsal;
                    document.getElementById('modal-pieHabil').textContent = data.pieHabil;
                    document.getElementById('modal-categoria').textContent = data.nombreCategoria;

                    // Mostrar el modal
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
                    alert(data.error);
                } else {
                    // Rellenar los campos del modal
                    document.getElementById('editar-jugador-id').value = jugadorId;
                    document.getElementById('editar-nombre-jugador').value = data.nombreJugador;
                    document.getElementById('editar-apellidos').value = data.apellidos;
                    document.getElementById('editar-edad').value = data.edad;
                    document.getElementById('editar-dorsal').value = data.dorsal;
                    const pieHabilSelect = document.getElementById('editar-pieHabil');
                    if (data.pieHabil === 'Izquierdo' || data.pieHabil === 'Derecho') {
                        pieHabilSelect.value = data.pieHabil;
                    } else {
                        pieHabilSelect.value = ''; // Opción por defecto si el valor es desconocido
                    }
                    // Mostrar el modal de edición
                    $('#editarModal').modal('show');
                }
            })
            .catch(error => console.error(`Error al cargar los datos del jugador: ${error.message}`));
    }

    // Manejo del formulario de edición
    document.getElementById('formEditarJugador').addEventListener('submit', function (event) {
        event.preventDefault();

        // Validar los campos antes de enviar
        if (!validarFormularioEditar()) return;

        const jugadorId = document.getElementById('editar-jugador-id').value;
        const nombreJugador = document.getElementById('editar-nombre-jugador').value.trim();
        const apellidos = document.getElementById('editar-apellidos').value.trim();
        const edad = document.getElementById('editar-edad').value;
        const dorsal = document.getElementById('editar-dorsal').value;
        const pieHabil = document.getElementById('editar-pieHabil').value.trim();

        fetch('php/jugadores/editarJugador.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `jugadorId=${jugadorId}&nombreJugador=${encodeURIComponent(nombreJugador)}&apellidos=${encodeURIComponent(apellidos)}&edad=${edad}&dorsal=${dorsal}&pieHabil=${encodeURIComponent(pieHabil)}`,
        })
            .then(response => response.text())
            .then(responseText => {
                if (responseText === "Jugador actualizado con éxito") {
                    alert("Jugador actualizado con éxito");
                    $('#editarModal').modal('hide');
                    // Recargar la tabla con la categoría seleccionada
                    cargarJugadores(categoriaSeleccionada, currentPage);
                } else {
                    alert(`Error al actualizar el jugador: ${responseText || "Desconocido"}`);
                }
            })
            .catch(error => console.error(`Error al enviar los datos de edición: ${error.message}`));
    });

    // Validar los campos del formulario de edición
    function validarFormularioEditar() {
        const nombre = document.getElementById('editar-nombre-jugador').value.trim();
        const apellidos = document.getElementById('editar-apellidos').value.trim();
        const edad = document.getElementById('editar-edad').value;
        const dorsal = document.getElementById('editar-dorsal').value;
        const pieHabil = document.getElementById('editar-pieHabil').value;

        if (!nombre || !apellidos || !edad || !dorsal || !pieHabil) {
            alert("Por favor, completa todos los campos.");
            return false;
        }

        if (isNaN(edad) || isNaN(dorsal) || edad <= 0 || dorsal <= 0) {
            alert("La edad y el dorsal deben ser números válidos.");
            return false;
        }

        if (pieHabil !== 'Izquierdo' && pieHabil !== 'Derecho') {
            alert("El valor de 'Pie Hábil' debe ser 'Izquierdo' o 'Derecho'.");
            return false;
        }

        return true;
    }

    // Cargar jugadores al iniciar
    cargarJugadores(categoriaSeleccionada, currentPage);
});
