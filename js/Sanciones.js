document.addEventListener("DOMContentLoaded", function () {
    // Variable para almacenar el jugadorId
    let jugadorId = null;

    // Función para recargar los datos de la tabla de sanciones
    function recargarTablaSanciones() {
        // Usamos fetch para actualizar la tabla sin recargar la página
        fetch('php/sanciones.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('tabla-sanciones').innerHTML = data;
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }

    // Escuchar el clic en los botones de "Agregar Sanción"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-agregar-sancion")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Abrir el modal de agregar sanción
            $("#modalAgregarSancion").modal("show");
        }
    });

    // Manejar el envío del formulario de agregar sanción
    document.getElementById("formAgregarSancion").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de tarjetas amarillas y rojas ingresadas
        const tarjetasAmarillas = document.getElementById("tarjetasAmarillas").value;
        const tarjetasRojas = document.getElementById("tarjetasRojas").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/agregarSancion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&tarjetasAmarillas=${tarjetasAmarillas}&tarjetasRojas=${tarjetasRojas}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal
            $("#modalAgregarSancion").modal("hide");

            // Recargar la tabla de sanciones sin recargar la página
            recargarTablaSanciones();
        })
        .catch(error => console.error("Error al agregar sanción:", error));
    });

    // Escuchar el clic en los botones de "Editar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-editar-sancion")) {
            // Obtener el ID del jugador y la cantidad de tarjetas actuales desde los atributos data
            jugadorId = event.target.getAttribute("data-jugador-id");
            const tarjetasAmarillas = event.target.getAttribute("data-tarjetas-amarillas");
            const tarjetasRojas = event.target.getAttribute("data-tarjetas-rojas");

            // Colocar la cantidad de tarjetas actual en los campos del modal de edición
            document.getElementById("tarjetasAmarillasEditar").value = tarjetasAmarillas;
            document.getElementById("tarjetasRojasEditar").value = tarjetasRojas;

            // Mostrar el modal de edición
            $("#modalEditarSancion").modal("show");
        }
    });

    // Manejar el envío del formulario de edición
    document.getElementById("formEditarSancion").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener la cantidad de tarjetas modificadas
        const tarjetasAmarillas = document.getElementById("tarjetasAmarillasEditar").value;
        const tarjetasRojas = document.getElementById("tarjetasRojasEditar").value;

        // Enviar los datos al servidor mediante fetch
        fetch("php/editarSancion.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `jugadorId=${jugadorId}&tarjetasAmarillas=${tarjetasAmarillas}&tarjetasRojas=${tarjetasRojas}`,
        })
        .then(response => response.text())
        .then(data => {
            // Cerrar el modal de edición
            $("#modalEditarSancion").modal("hide");

            // Recargar la tabla de sanciones sin recargar la página
            recargarTablaSanciones();
        })
        .catch(error => console.error("Error al editar sanción:", error));
    });

    // Escuchar el clic en los botones de "Borrar"
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-borrar-sancion")) {
            // Obtener el ID del jugador desde el atributo data
            jugadorId = event.target.getAttribute("data-jugador-id");

            // Confirmar la acción de borrar
            if (confirm("¿Estás seguro de que deseas eliminar las sanciones de este jugador?")) {
                // Enviar los datos al servidor mediante fetch
                fetch("php/borrarSancion.php", {
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

                    // Recargar la tabla de sanciones sin recargar la página
                    recargarTablaSanciones();
                })
                .catch(error => console.error("Error al borrar sanción:", error));
            }
        }
    });
});