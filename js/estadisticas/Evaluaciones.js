document.addEventListener("DOMContentLoaded", function () {
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    // Función para recargar la tabla
    function recargarTablaEvaluaciones(search = '', page = 1) {
        const url = `php/estadisticas/evaluaciones/evaluaciones.php?search=${encodeURIComponent(search)}&page=${page}`;
    
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
                    const theadElement = document.getElementById("tabla-cabecera-evaluaciones");
                    theadElement.innerHTML = newThead.innerHTML;
    
                    // Asegurar que la clase thead-dark esté aplicada
                    if (!theadElement.classList.contains("thead-dark")) {
                        theadElement.classList.add("thead-dark");
                    }
                }
                if (newTbody) {
                    document.getElementById("tabla-evaluaciones").innerHTML = newTbody.innerHTML;
                }
    
                // Reasignar los eventos de paginación después de recargar
                const paginacionLinks = document.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        currentPage = this.getAttribute("data-page");
                        recargarTablaEvaluaciones(searchTerm, currentPage);
                    });
                });
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    recargarTablaEvaluaciones(searchTerm, currentPage);

    // Asignar evento para la barra de búsqueda
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function (e) {
        searchTerm = e.target.value;
        recargarTablaEvaluaciones(searchTerm, 1);
    });

    // Delegación de eventos en la tabla
    document.getElementById("tabla-evaluaciones").addEventListener("click", function (event) {
        const target = event.target;

        // Botón "Agregar Evaluacion"
        if (target.classList.contains("btn-agregar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalAgregarEvaluacion").modal("show");
        }

        // Botón "Editar"
        if (target.classList.contains("btn-editar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            const evaluaciones = target.getAttribute("data-evaluaciones");
            document.getElementById("evaluacionPuntajeEditar").value = evaluaciones;
            $("#modalEditarEvaluacion").modal("show");
        }

        // Botón "Borrar"
        if (target.classList.contains("btn-borrar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalBorrarEvaluacion").modal("show");
        }
    });

    // Manejo del modal de agregar evaluaciones
    document.getElementById("formAgregarEvaluacion").addEventListener("submit", function (event) {
        event.preventDefault();
        const evaluaciones = document.getElementById("evaluacionPuntaje").value;

        fetch("php/estadisticas/evaluaciones/agregarEvaluacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluaciones}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalAgregarEvaluacion").modal("hide");
                recargarTablaEvaluaciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al agregar evaluación:", error));
    });

    // Manejo del modal de editar evaluaciones
    document.getElementById("formEditarEvaluacion").addEventListener("submit", function (event) {
        event.preventDefault();
        const evaluaciones = document.getElementById("evaluacionPuntajeEditar").value;

        fetch("php/estadisticas/evaluaciones/editarEvaluacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluaciones}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalEditarEvaluacion").modal("hide");
                recargarTablaEvaluaciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al editar evaluación:", error));
    });

    // Manejo del modal de borrar evaluaciones
    document.getElementById("confirmarBorrarEvaluacion").addEventListener("click", function () {
        if (jugadorId) {
            fetch("php/estadisticas/evaluaciones/borrarEvaluacion.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `jugadorId=${jugadorId}`,
            })
                .then(response => response.text())
                .then(data => {
                    $("#modalBorrarEvaluacion").modal("hide");
                    alert(data);
                    recargarTablaAsistencias(searchTerm, currentPage);
                })
                .catch(error => console.error("Error al borrar evaluacion:", error));
        }
    });
});