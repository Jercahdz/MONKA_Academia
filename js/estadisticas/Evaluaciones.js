document.addEventListener("DOMContentLoaded", function () {
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    function recargarTablaEvaluaciones(search = '', page = 1) {
        const url = `php/estadisticas/evaluaciones/evaluaciones.php?search=${encodeURIComponent(search)}&page=${page}`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-evaluaciones').innerHTML = data;

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

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function (e) {
        searchTerm = e.target.value;
        recargarTablaEvaluaciones(searchTerm, 1);
    });

    document.getElementById("tabla-evaluaciones").addEventListener("click", function (event) {
        const target = event.target;

        // Botón "Agregar Evaluacion"
        if (target.classList.contains("btn-agregar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalAgregar").modal("show");
        }

        // Botón "Editar"
        if (target.classList.contains("btn-editar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            const evaluaciones = target.getAttribute("data-evaluaciones");
            document.getElementById("evaluacionEdit").value = evaluaciones;
            $("#modalEditar").modal("show");
        }

        // Botón "Borrar"
        if (target.classList.contains("btn-borrar-evaluacion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalBorrarEvaluacion").modal("show");
        }
    });

    // Manejo del modal de agregar evaluaciones
    document.getElementById("formAgregar").addEventListener("submit", function (event) {
        event.preventDefault();
        const evaluaciones = document.getElementById("evaluacion").value;

        fetch("php/estadisticas/evaluaciones/agregarEvaluacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluaciones}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalAgregar").modal("hide");
                recargarTablaEvaluaciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al agregar evaluación:", error));
    });

    // Manejo del modal de editar evaluaciones
    document.getElementById("formEditar").addEventListener("submit", function (event) {
        event.preventDefault();
        const evaluaciones = document.getElementById("evaluacionEdit").value;

        fetch("php/estadisticas/evaluaciones/editarEvaluacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluaciones}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalEditar").modal("hide");
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