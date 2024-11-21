document.addEventListener("DOMContentLoaded", function () {
    function cargarDatos(url, idTabla, search = '', page = 1) {
        const fullUrl = `${url}?search=${encodeURIComponent(search)}&page=${page}`;
        const tablaElement = document.getElementById(idTabla);

        fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos de ${url}`);
                }
                return response.text();
            })
            .then(data => {
                tablaElement.innerHTML = data;

                // Asignar eventos a los enlaces de paginación
                const paginacionLinks = tablaElement.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        const page = this.getAttribute("data-page");
                        cargarDatos(url, idTabla, search, page);
                    });
                });
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
                tablaElement.innerHTML = '<tr><td colspan="5">Error al cargar datos.</td></tr>';
            });
    }

    // Inicializar tablas
    cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones');
    cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias');
    cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones');
    cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones');

    // Asignar eventos a la barra de búsqueda
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function realizarBusqueda() {
        const searchValue = searchInput.value;

        // Recargar tablas con búsqueda aplicada
        cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones', searchValue);
        cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias', searchValue);
        cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones', searchValue);
        cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones', searchValue);
    }

    // Buscar al presionar Enter en la barra de búsqueda
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            realizarBusqueda();
        }
    });

    // Buscar al hacer clic en el botón de búsqueda
    searchButton.addEventListener("click", realizarBusqueda);
});