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
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
            });
    }

    const selectorCategoria = document.getElementById('selector-categoria');
    selectorCategoria.addEventListener('change', function () {
        const categoria = selectorCategoria.value;
        const url = categoria === 'todos' ? 'obtener_jugadores.php' : `obtener_jugadores.php?categoria=${categoria}`;
        cargarDatos(url, 'tabla-jugadores');
    });

    // Cargar todos los jugadores al inicio
    cargarDatos('php/obtener_jugadores.php', 'tabla-jugadores');
});