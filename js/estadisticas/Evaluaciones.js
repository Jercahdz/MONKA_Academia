document.addEventListener("DOMContentLoaded", function () {
    // Variable para almacenar el jugadorId
    let jugadorId = null;

    // Función para recargar los datos de la tabla de evaluaciones
    function recargarTablaEvaluaciones() {
        // Usamos fetch para actualizar la tabla sin recargar la página
        fetch('php/estadisticas/evaluaciones/evaluaciones.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-evaluaciones').innerHTML = data;
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Escuchar el clic en los botones de "Agregar Evaluación"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-agregar-evaluacion")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Abrir el modal de agregar evaluación
            $("#modalAgregarEvaluacion").modal("show");
        }
    });

    // Manejar el envío del formulario de agregar evaluación
    document.getElementById("formAgregarEvaluacion").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener el puntaje de evaluación ingresado
        const evaluacionPuntaje = document.getElementById("evaluacionPuntaje").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/estadisticas/evaluaciones/agregarEvaluacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluacionPuntaje}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal
            $("#modalAgregarEvaluacion").modal("hide");

            // Recargar la tabla de evaluaciones sin recargar la página
            recargarTablaEvaluaciones();
        })
        .catch(error => console.error("Error al agregar evaluación:", error));
    });

    // Escuchar el clic en los botones de "Editar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-editar-evaluacion")) {
            // Obtener el ID del jugador y el puntaje de evaluación actual desde los atributos data
            jugadorId = event.target.getAttribute("data-jugador-id");
            const evaluacionPuntaje = event.target.getAttribute("data-evaluaciones");

            // Colocar el puntaje actual en el campo del modal de edición
            document.getElementById("evaluacionPuntajeEditar").value = evaluacionPuntaje;

            // Mostrar el modal de edición
            $("#modalEditarEvaluacion").modal("show");
        }
    });

    // Manejar el envío del formulario de edición
    document.getElementById("formEditarEvaluacion").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener el puntaje de evaluación modificado
        const evaluacionPuntaje = document.getElementById("evaluacionPuntajeEditar").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/estadisticas/evaluaciones/editarEvaluacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&evaluaciones=${evaluacionPuntaje}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal de edición
            $("#modalEditarEvaluacion").modal("hide");

            // Recargar la tabla de evaluaciones sin recargar la página
            recargarTablaEvaluaciones();
        })
        .catch(error => console.error("Error al editar evaluación:", error));
    });

    // Escuchar el clic en los botones de "Borrar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-borrar-evaluacion")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Confirmar la acción de borrar
            if (confirm("¿Estás seguro de que deseas eliminar las evaluaciones de este jugador?")) {
                // Enviar los datos al servidor mediante fetch
                fetch("php/estadisticas/evaluaciones/borrarEvaluacion.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `jugadorId=${jugadorId}`,
                })
                .then(response => response.text())
                .then(data => {
                    // Mostrar mensaje de éxito o error
                    alert(data);

                    // Recargar la tabla de evaluaciones sin recargar la página
                    recargarTablaEvaluaciones();
                })
                .catch(error => console.error("Error al borrar evaluación:", error));
            }
        }
    });
});