document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    // Función para recargar la tabla
    function recargarTablaAnotaciones(search = '', page = 1) {
        const url = `php/estadisticas/anotaciones/anotaciones.php?search=${encodeURIComponent(search)}&page=${page}`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-anotaciones').innerHTML = data;

                // Reasignar los eventos de paginación después de recargar
                const paginacionLinks = document.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        currentPage = this.getAttribute("data-page");
                        recargarTablaAnotaciones(searchTerm, currentPage);
                    });
                });
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Llamada inicial para cargar la tabla
    recargarTablaAnotaciones(searchTerm, currentPage);

    // Asignar evento para la barra de búsqueda
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function (e) {
        searchTerm = e.target.value;
        recargarTablaAnotaciones(searchTerm, 1);
    });

    // Delegación de eventos en la tabla
    document.getElementById("tabla-anotaciones").addEventListener("click", function (event) {
        const target = event.target;

        // Botón "Agregar Goles"
        if (target.classList.contains("btn-agregar-goles")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalAgregar").modal("show");
        }

        // Botón "Editar"
        if (target.classList.contains("btn-editar")) {
            jugadorId = target.getAttribute("data-jugador-id");
            const cantidadAnotaciones = target.getAttribute("data-cantidad-anotaciones");
            document.getElementById("golesEdit").value = cantidadAnotaciones;
            $("#modalEditar").modal("show");
        }

        // Botón "Borrar"
        if (target.classList.contains("btn-borrar")) {
            jugadorId = target.getAttribute("data-jugador-id");

            if (confirm("¿Estás seguro de que deseas eliminar las anotaciones de este jugador?")) {
                fetch("php/estadisticas/anotaciones/borrarAnotacion.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `jugadorId=${jugadorId}`,
                })
                    .then(response => response.text())
                    .then(data => {
                        alert(data);
                        recargarTablaAnotaciones(searchTerm, currentPage);
                    })
                    .catch(error => console.error("Error al borrar anotación:", error));
            }
        }
    });

    // Manejo del formulario de agregar goles
    document.getElementById("formAgregar").addEventListener("submit", function (event) {
        event.preventDefault();
        const cantidadGoles = document.getElementById("goles").value;

        fetch("php/estadisticas/anotaciones/agregarAnotacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadGoles=${cantidadGoles}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalAgregar").modal("hide");
                recargarTablaAnotaciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al agregar anotación:", error));
    });

    // Manejo del formulario de editar goles
    document.getElementById("formEditar").addEventListener("submit", function (event) {
        event.preventDefault();
        const cantidadGoles = document.getElementById("golesEdit").value;

        fetch("php/estadisticas/anotaciones/editarAnotacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadGoles=${cantidadGoles}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalEditar").modal("hide");
                recargarTablaAnotaciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al editar anotación:", error));
    });
});