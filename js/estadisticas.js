document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar datos vía AJAX y asignarlos a la tabla correspondiente
    function cargarDatos(url, idTabla) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos de ${url}`);
                }
                return response.text(); // Obtener el texto (HTML) que será generado por PHP
            })
            .then(data => {
                // Insertar el HTML generado dentro del tbody con id correspondiente
                document.getElementById(idTabla).innerHTML = data;
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
            });
    }

    // Cargar datos para cada sección
    cargarDatos('php/anotaciones.php', 'tabla-anotaciones');
    cargarDatos('php/asistencias.php', 'tabla-asistencias');
    cargarDatos('php/sanciones.php', 'tabla-sanciones');
    cargarDatos('php/evaluaciones.php', 'tabla-evaluaciones');
});
