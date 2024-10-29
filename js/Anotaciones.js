document.addEventListener("DOMContentLoaded", function () {
    // Variable para almacenar el jugadorId
    let jugadorId = null;

    // Función para recargar los datos de la tabla de anotaciones
    function recargarTablaAnotaciones() {
        // Usamos fetch para actualizar la tabla sin recargar la página
        fetch('php/anotaciones.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-anotaciones').innerHTML = data;
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Escuchar el clic en los botones de "Agregar Goles"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-agregar-goles")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Abrir el modal de agregar goles
            $("#modalAgregar").modal("show");
        }
    });

    // Manejar el envío del formulario de agregar goles
    document.getElementById("formAgregar").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de goles ingresada
        const cantidadGoles = document.getElementById("goles").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/agregarAnotacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadGoles=${cantidadGoles}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal
            $("#modalAgregar").modal("hide");

            // Recargar la tabla de anotaciones sin recargar la página
            recargarTablaAnotaciones();
        })
        .catch(error => console.error("Error al agregar anotación:", error));
    });

    // Escuchar el clic en los botones de "Editar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-editar")) {
            // Obtener el ID del jugador y la cantidad de anotaciones actuales desde los atributos data
            jugadorId = event.target.getAttribute("data-jugador-id");
            const cantidadAnotaciones = event.target.getAttribute("data-cantidad-anotaciones");

            // Colocar la cantidad de goles actual en el campo del modal de edición
            document.getElementById("golesEdit").value = cantidadAnotaciones;

            // Mostrar el modal de edición
            $("#modalEditar").modal("show");
        }
    });

    // Manejar el envío del formulario de edición
    document.getElementById("formEditar").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de goles modificada
        const cantidadGoles = document.getElementById("golesEdit").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/editarAnotacion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&cantidadGoles=${cantidadGoles}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal de edición
            $("#modalEditar").modal("hide");

            // Recargar la tabla de anotaciones sin recargar la página
            recargarTablaAnotaciones();
        })
        .catch(error => console.error("Error al editar anotación:", error));
    });

    // Escuchar el clic en los botones de "Borrar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-borrar")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Confirmar la acción de borrar
            if (confirm("¿Estás seguro de que deseas eliminar las anotaciones de este jugador?")) {
                // Enviar los datos al servidor mediante fetch
                fetch("php/borrarAnotacion.php", {
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

                    // Recargar la tabla de anotaciones sin recargar la página
                    recargarTablaAnotaciones();
                })
                .catch(error => console.error("Error al borrar anotación:", error));
            }
        }
    });
});