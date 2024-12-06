document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    // Función para recargar la tabla
    function recargarTablaAsistencias(search = '', page = 1) {
        const url = `php/estadisticas/asistencias/asistencias.php?search=${encodeURIComponent(search)}&page=${page}`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Crear un contenedor temporal para procesar la tabla
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;

                // Extraer y reemplazar solo el contenido del thead y tbody
                const newThead = tempDiv.querySelector("thead");
                const newTbody = tempDiv.querySelector("tbody");

                if (newThead) {
                    const theadElement = document.getElementById("tabla-cabecera-asistencias");
                    theadElement.innerHTML = newThead.innerHTML;

                    // Asegurar que la clase thead-dark esté aplicada
                    if (!theadElement.classList.contains("thead-dark")) {
                        theadElement.classList.add("thead-dark");
                    }
                }
                if (newTbody) {
                    document.getElementById("tabla-asistencias").innerHTML = newTbody.innerHTML;
                }

                // Reasignar los eventos de paginación después de recargar
                const paginacionLinks = document.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        currentPage = this.getAttribute("data-page");
                        recargarTablaAsistencias(searchTerm, currentPage);
                    });
                });
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Llamada inicial para cargar la tabla
    recargarTablaAsistencias(searchTerm, currentPage);

    // Asignar evento para la barra de búsqueda
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function (e) {
        searchTerm = e.target.value;
        recargarTablaAsistencias(searchTerm, 1);
    });

    // Delegación de eventos en la tabla
    document.getElementById("tabla-asistencias").addEventListener("click", function (event) {
        const target = event.target;

        // Botón "Agregar Asistencias"
        if (target.classList.contains("btn-agregar-asistencias")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalAgregarAsistencia").modal("show");
        }

        // Botón "Editar"
        if (target.classList.contains("btn-editar-asistencias")) {
            jugadorId = target.getAttribute("data-jugador-id");
            const cantidadAsistencias = target.getAttribute("data-cantidad-asistencias");
            document.getElementById("cantidadAsistenciasEditar").value = cantidadAsistencias;
            $("#modalEditarAsistencia").modal("show");
        }

        // Botón "Borrar"
        if (target.classList.contains("btn-borrar-asistencias")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalBorrarAsistencia").modal("show");
        }
    });

    // Manejo del modal de agregar asistencias
    document.getElementById("formAgregarAsistencia").addEventListener("submit", function (event) {
        event.preventDefault();
        const cantidadAsistencias = document.getElementById("cantidadAsistencias").value;

        fetch("php/estadisticas/asistencias/agregarAsistencia.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadAsistencias=${cantidadAsistencias}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalAgregarAsistencia").modal("hide");
                recargarTablaAsistencias(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al agregar asistencia:", error));
    });

    // Manejo del modal de editar asistencias
    document.getElementById("formEditarAsistencia").addEventListener("submit", function (event) {
        event.preventDefault();
        const cantidadAsistencias = document.getElementById("cantidadAsistenciasEditar").value;

        fetch("php/estadisticas/asistencias/editarAsistencia.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadAsistencias=${cantidadAsistencias}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalEditarAsistencia").modal("hide");
                recargarTablaAsistencias(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al editar asistencia:", error));
    });

    // Manejo del modal de borrar asistencias
    document.getElementById("confirmarBorrarAsistencia").addEventListener("click", function () {
        if (jugadorId) {
            fetch("php/estadisticas/asistencias/borrarAsistencia.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `jugadorId=${jugadorId}`,
            })
                .then(response => response.text())
                .then(data => {
                    $("#modalBorrarAsistencia").modal("hide");
                    alert(data);
                    recargarTablaAsistencias(searchTerm, currentPage);
                })
                .catch(error => console.error("Error al borrar asistencia:", error));
        }
    });
});