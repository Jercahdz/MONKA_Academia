document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    // Función para cargar los datos de la tabla
    function cargarDatos(url, idTabla, search = '', page = 1) {
        const fullUrl = `${url}?search=${encodeURIComponent(search)}&page=${page}`;
        const tablaElement = document.getElementById(idTabla);

        // Verificar si el elemento existe antes de manipularlo
        if (!tablaElement) {
            console.error(`No se encontró el contenedor con ID: ${idTabla}`);
            return;
        }

        fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos de ${url}`);
                }
                return response.text();
            })
            .then(data => {
                tablaElement.innerHTML = data;

                // Reasignar eventos a los enlaces de paginación
                const paginacionLinks = tablaElement.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        const page = this.getAttribute("data-page");
                        cargarDatos(url, idTabla, search, page);
                    });
                });

                // Reasignar eventos de botones en la tabla
                inicializarEventosTabla();
            })
            .catch(error => {
                console.error(`Hubo un problema con la solicitud AJAX para ${url}:`, error);
                tablaElement.innerHTML = '<tr><td colspan="5">Error al cargar datos.</td></tr>';
            });
    }

    // Función para inicializar eventos en la tabla
    function inicializarEventosTabla() {
        const tablaContainer = document.getElementById("tabla-anotaciones");

        if (!tablaContainer) return;

        tablaContainer.addEventListener("click", function (event) {
            const target = event.target;

            // Botón "Agregar Goles"
            if (target.classList.contains("btn-agregar-goles")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalAgregar").modal("show");
            }

            // Botón "Editar"
            if (target.classList.contains("btn-editar")) {
                jugadorId = target.getAttribute("data-jugador-id");
                cargarAnotacionesJugador(jugadorId); // Cargar las opciones dinámicas
                $("#modalEditar").modal("show");
            }

            // Botón "Borrar"
            if (target.classList.contains("btn-borrar-anotacion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalBorrarAnotacion").modal("show");
            }
        });
    }

    // Asignar evento para la barra de búsqueda (actualiza mientras se escribe)
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            searchTerm = e.target.value;
            cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones', searchTerm, 1); // Reiniciar a la primera página
        });
    }

    // Manejo del modal de agregar goles
    // Manejo del modal de agregar goles
    const formAgregar = document.getElementById("formAgregar");
    if (formAgregar) {
        formAgregar.addEventListener("submit", function (event) {
            event.preventDefault();
            const cantidadGoles = document.getElementById("goles").value;

            fetch("php/estadisticas/anotaciones/agregarAnotacion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `jugadorId=${jugadorId}&cantidadGoles=${cantidadGoles}`,
            })
                .then(response => response.text())
                .then(() => {
                    // Cerrar el modal al guardar
                    $("#modalAgregar").modal("hide");
                    // Actualizar la tabla
                    cargarDatos(
                        "php/estadisticas/anotaciones/anotaciones.php",
                        "tabla-anotaciones",
                        searchTerm,
                        currentPage
                    );
                })
                .catch(error => console.error("Error al agregar anotación:", error));
        });
    }

    // Manejo del modal de editar goles
    const formEditar = document.getElementById("formEditar");
    if (formEditar) {
        formEditar.addEventListener("submit", function (event) {
            event.preventDefault();

            const cantidadGoles = document.getElementById("golesEdit").value;
            const anotacionId = document.getElementById("anotacionSelect").value;

            fetch("php/estadisticas/anotaciones/editarAnotacion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `anotacionId=${anotacionId}&cantidadGoles=${cantidadGoles}`,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success || typeof data.success === "undefined") {
                        $("#modalEditar").modal("hide");
                        cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones', searchTerm, currentPage);
                    } else {
                        alert("Error: " + data.message);
                    }
                })
                .catch(error => console.error("Error al editar anotación:", error));
        });
    }

    // Manejo del modal de borrar
    const confirmarBorrar = document.getElementById("confirmarBorrar");
    if (confirmarBorrar) {
        confirmarBorrar.addEventListener("click", function () {
            if (jugadorId) {
                fetch("php/estadisticas/anotaciones/borrarAnotacion.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `jugadorId=${jugadorId}`,
                })
                    .then(response => response.text())
                    .then(() => {
                        $("#modalBorrarAnotacion").modal("hide");
                        cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones', searchTerm, currentPage);
                    })
                    .catch(error => console.error("Error al borrar anotación:", error));
            }
        });
    }

    // Cargar anotaciones de un jugador en el modal de edición
    function cargarAnotacionesJugador(jugadorId) {
        fetch(`php/estadisticas/anotaciones/obtenerFechaAnotacion.php?jugadorId=${jugadorId}`)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById("anotacionSelect");
                if (select) {
                    select.innerHTML = ""; // Limpiar opciones previas

                    data.forEach(anotacion => {
                        const option = document.createElement("option");
                        option.value = anotacion.anotacionId; // Usar el ID único
                        option.textContent = `Fecha: ${anotacion.fecha}, Goles: ${anotacion.cantidadAnotaciones}`;
                        select.appendChild(option);
                    });
                }
            })
            .catch(error => console.error("Error al cargar anotaciones:", error));
    }

    // Cargar datos iniciales de la tabla
    cargarDatos('php/estadisticas/anotaciones/anotaciones.php', 'tabla-anotaciones');
});