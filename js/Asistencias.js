document.addEventListener("DOMContentLoaded", function () {
    // Variable para almacenar el jugadorId
    let jugadorId = null;

    // Función para recargar los datos de la tabla de asistencias
    function recargarTablaAsistencias() {
        // Usamos fetch para actualizar la tabla sin recargar la página
        fetch('php/asistencias.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-asistencias').innerHTML = data;
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Escuchar el clic en los botones de "Agregar Asistencias"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-agregar-asistencias")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Abrir el modal de agregar asistencias
            $("#modalAgregarAsistencia").modal("show");
        }
    });

    // Manejar el envío del formulario de agregar asistencias
    document.getElementById("formAgregarAsistencia").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de asistencias ingresada
        const cantidadAsistencias = document.getElementById("cantidadAsistencias").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/agregarAsistencia.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadAsistencias=${cantidadAsistencias}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal
            $("#modalAgregarAsistencia").modal("hide");

            // Recargar la tabla de asistencias sin recargar la página
            recargarTablaAsistencias();
        })
        .catch(error => console.error("Error al agregar asistencia:", error));
    });

    // Escuchar el clic en los botones de "Editar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-editar-asistencias")) {
            // Obtener el ID del jugador y la cantidad de asistencias actuales desde los atributos data
            jugadorId = event.target.getAttribute("data-jugador-id");
            const cantidadAsistencias = event.target.getAttribute("data-cantidad-asistencias");

            // Colocar la cantidad de asistencias actual en el campo del modal de edición
            document.getElementById("cantidadAsistenciasEditar").value = cantidadAsistencias;

            // Mostrar el modal de edición
            $("#modalEditarAsistencia").modal("show");
        }
    });

    // Manejar el envío del formulario de edición
    document.getElementById("formEditarAsistencia").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de asistencias modificada
        const cantidadAsistencias = document.getElementById("cantidadAsistenciasEditar").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/editarAsistencia.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadAsistencias=${cantidadAsistencias}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal de edición
            $("#modalEditarAsistencia").modal("hide");

            // Recargar la tabla de asistencias sin recargar la página
            recargarTablaAsistencias();
        })
        .catch(error => console.error("Error al editar asistencia:", error));
    });

    // Escuchar el clic en los botones de "Borrar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-borrar-asistencias")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Confirmar la acción de borrar
            if (confirm("¿Estás seguro de que deseas eliminar las asistencias de este jugador?")) {
                // Enviar los datos al servidor mediante fetch
                fetch("php/borrarAsistencia.php", {
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

                    // Recargar la tabla de asistencias sin recargar la página
                    recargarTablaAsistencias();
                })
                .catch(error => console.error("Error al borrar asistencia:", error));
            }
        }
    });
});