window.asistenciasJsActiva = true;

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
        const tablaContainer = document.getElementById("tabla-asistencias");

        if (!tablaContainer) return;

        tablaContainer.addEventListener("click", function (event) {
            const target = event.target;

            // Botón "Agregar Asistencias"
            if (target.classList.contains("btn-agregar-asistencias")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalAgregarAsistencia").modal("show");
            }

            // Botón "Editar"
            if (target.classList.contains("btn-editar-asistencias")) {
                jugadorId = target.getAttribute("data-jugador-id");
                cargarAsistenciasJugador(jugadorId); // Cargar las opciones dinámicas
                $("#modalEditarAsistencia").modal("show");
            }

            // Botón "Borrar"
            if (target.classList.contains("btn-borrar-asistencias")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalBorrarAsistencia").modal("show");
            }
        });
    }

    // Asignar evento para la barra de búsqueda (actualiza mientras se escribe)
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            searchTerm = e.target.value;
            cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias', searchTerm, 1); // Reiniciar a la primera página
        });
    }

    // Manejo del modal de agregar asistencias
    const formAgregar = document.getElementById("formAgregarAsistencia");
    if (formAgregar) {
        formAgregar.addEventListener("submit", function (event) {
            event.preventDefault();
            const cantidadAsistencias = document.getElementById("cantidadAsistencias").value;

            fetch("php/estadisticas/asistencias/agregarAsistencia.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `jugadorId=${jugadorId}&cantidadAsistencias=${cantidadAsistencias}`,
            })
                .then(response => response.text())
                .then(() => {
                    $("#modalAgregarAsistencia").modal("hide");
                    cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al agregar asistencia:", error));
        });
    }

    // Manejo del modal de editar asistencias
    const formEditar = document.getElementById("formEditarAsistencia");
    if (formEditar) {
        formEditar.addEventListener("submit", function (event) {
            event.preventDefault();

            const cantidadAsistencias = document.getElementById("cantidadAsistenciasEditar").value;
            const asistenciaId = document.getElementById("asistenciaSelect").value;

            fetch("php/estadisticas/asistencias/editarAsistencia.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `asistenciaId=${asistenciaId}&cantidadAsistencias=${cantidadAsistencias}`,
            })
                .then(response => response.text())
                .then(() => {
                    $("#modalEditarAsistencia").modal("hide");
                    cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al editar asistencia:", error));
        });
    }

    // Manejo del modal de borrar asistencias
    const confirmarBorrar = document.getElementById("confirmarBorrarAsistencia");
    if (confirmarBorrar) {
        confirmarBorrar.addEventListener("click", function () {
            if (jugadorId) {
                fetch("php/estadisticas/asistencias/borrarAsistencia.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `jugadorId=${jugadorId}`,
                })
                    .then(response => response.text())
                    .then(() => {
                        $("#modalBorrarAsistencia").modal("hide");
                        cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias', searchTerm, currentPage);
                    })
                    .catch(error => console.error("Error al borrar asistencia:", error));
            }
        });
    }

    // Limitar las fechas de inicio y fin
    function limitarFechasAsistencias() {
        const hoy = new Date().toISOString().split("T")[0];
        const fechaInicio = document.getElementById("fechaInicioModalAsistencias");
        const fechaFin = document.getElementById("fechaFinModalAsistencias");

        if (fechaInicio && fechaFin) {
            fechaInicio.max = hoy;
            fechaFin.max = hoy;

            fechaInicio.addEventListener("change", function () {
                fechaFin.min = this.value;

                if (fechaFin.value && fechaFin.value < this.value) {
                    alert("⚠️ Error: La fecha de fin no puede ser menor que la fecha de inicio.");
                    fechaFin.value = ""; 
                }
            });

            fechaFin.addEventListener("change", function () {
                if (this.value > hoy) {
                    alert("⚠️ Error: No puedes seleccionar una fecha futura.");
                    this.value = ""; 
                }

                if (fechaInicio.value && this.value < fechaInicio.value) {
                    alert("⚠️ Error: La fecha de fin no puede ser menor que la fecha de inicio.");
                    this.value = ""; 
                }
            });
        }
    }

    // Cargar asistencias de un jugador en el modal de edición
    function cargarAsistenciasJugador(jugadorId) {
        const fechaInicio = document.getElementById("fechaInicioModalAsistencias")?.value || '';
        const fechaFin = document.getElementById("fechaFinModalAsistencias")?.value || '';

        const url = `php/estadisticas/asistencias/obtenerFechaAsistencia.php?jugadorId=${jugadorId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById("asistenciaSelect");
                if (select) {
                    select.innerHTML = "";
                    if (data.length === 0) {
                        select.innerHTML = "<option disabled>No hay asistencias</option>";
                    } else {
                        data.forEach(asistencia => {
                            const option = document.createElement("option");
                            option.value = asistencia.asistenciaId;
                            option.textContent = `Fecha: ${asistencia.fecha}, Asistencias: ${asistencia.cantidadAsistencias}`;
                            select.appendChild(option);
                        });
                    }
                }
            })
            .catch(error => console.error("❌ Error al cargar asistencias:", error));
    }

    // Agregar eventos para actualizar al cambiar fechas
    document.getElementById("fechaInicioModalAsistencias")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarAsistenciasJugador(jugadorId);
        }
    });

    document.getElementById("fechaFinModalAsistencias")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarAsistenciasJugador(jugadorId);
        }
    });

    // Limitar fechas al cargar el script
    limitarFechasAsistencias();

    // Cargar datos iniciales de la tabla
    cargarDatos('php/estadisticas/asistencias/asistencias.php', 'tabla-asistencias');
});