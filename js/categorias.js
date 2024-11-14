document.addEventListener("DOMContentLoaded", function () {
    function cargarDatos(url, idTabla) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos de ${url}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(idTabla).innerHTML = data;
                agregarEventoVerDetalles(); // Agrega eventos para abrir el modal
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
            });
    }

    const selectorCategoria = document.getElementById('selector-categoria');
    selectorCategoria.addEventListener('change', function () {
        const categoria = selectorCategoria.value;
        const url = categoria === 'todos' ? 'php/agregarJugadores.php' : `php/agregarJugadores.php?categoria=${categoria}`;
        cargarDatos(url, 'tabla-jugadores');
    });

    // Cargar todos los jugadores al inicio
    cargarDatos('php/agregarJugadores.php', 'tabla-jugadores');

    // Función para manejar el evento de "Ver Detalles"
    function agregarEventoVerDetalles() {
        document.querySelectorAll('.btn-ver-detalles').forEach(button => {
            button.addEventListener('click', function () {
                const jugadorId = this.getAttribute('data-jugador-id');
                mostrarDetallesJugador(jugadorId);
            });
        });
    }

    // Función para mostrar los detalles en el modal
    function mostrarDetallesJugador(jugadorId) {
        fetch(`php/detallesJugador.php?jugadorId=${jugadorId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    document.getElementById('modal-nombre').textContent = data.nombreJugador;
                    document.getElementById('modal-apellidos').textContent = data.apellidos;
                    document.getElementById('modal-edad').textContent = data.edad;
                    document.getElementById('modal-dorsal').textContent = data.dorsal;
                    document.getElementById('modal-pieHabil').textContent = data.pieHabil;
                    document.getElementById('modal-categoria').textContent = data.nombreCategoria;
                    document.getElementById('modal-anotaciones').textContent = data.cantidadAnotaciones;

                    // Mostrar el modal
                    document.getElementById('detallesModal').style.display = 'flex';
                }
            })
            .catch(error => {
                console.error("Error al obtener los detalles del jugador:", error);
            });
    }
});
