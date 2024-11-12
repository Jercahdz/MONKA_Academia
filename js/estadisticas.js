document.addEventListener("DOMContentLoaded", function () {
    function cargarDatos(url, idTabla, search = '') {
        // Crear la URL con el parámetro de búsqueda
        const fullUrl = `${url}?search=${encodeURIComponent(search)}`;
        fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos de ${url}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(idTabla).innerHTML = data;
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
                document.getElementById(idTabla).innerHTML = '<tr><td colspan="5">Error al cargar datos.</td></tr>';
            });
    }

    // Asignar eventos a la barra de búsqueda
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function realizarBusqueda() {
        const searchValue = searchInput.value;
        // Cargar datos filtrados
        cargarDatos('php/anotaciones.php', 'tabla-anotaciones', searchValue);
        cargarDatos('php/asistencias.php', 'tabla-asistencias', searchValue);
        cargarDatos('php/sanciones.php', 'tabla-sanciones', searchValue);
        cargarDatos('php/evaluaciones.php', 'tabla-evaluaciones', searchValue);
    }

    // Cargar todos los datos al inicio
    cargarDatos('php/anotaciones.php', 'tabla-anotaciones');
    cargarDatos('php/asistencias.php', 'tabla-asistencias');
    cargarDatos('php/sanciones.php', 'tabla-sanciones');
    cargarDatos('php/evaluaciones.php', 'tabla-evaluaciones');

    // Buscar al presionar Enter
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            realizarBusqueda();
        }
    });

    // Buscar al hacer clic en el botón
    searchButton.addEventListener("click", realizarBusqueda);
});