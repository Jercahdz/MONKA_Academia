window.evaluacionesJsActiva = true;

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
        const tablaContainer = document.getElementById("tabla-evaluaciones");

        if (!tablaContainer) return;

        tablaContainer.addEventListener("click", function (event) {
            const target = event.target;

            // Botón "Agregar Evaluación"
            if (target.classList.contains("btn-agregar-evaluacion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalAgregarEvaluacion").modal("show");
            }

            // Botón "Editar"
            if (target.classList.contains("btn-editar-evaluacion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                cargarEvaluacionesJugador(jugadorId); // Cargar las opciones dinámicas
                $("#modalEditarEvaluacion").modal("show");
            }

            // Botón "Borrar"
            if (target.classList.contains("btn-borrar-evaluacion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalBorrarEvaluacion").modal("show");
            }
        });
    }

    // Asignar evento para la barra de búsqueda (actualiza mientras se escribe)
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            searchTerm = e.target.value;
            cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones', searchTerm, 1); // Reiniciar a la primera página
        });
    }

    // Manejo del modal de agregar evaluaciones
    const formAgregar = document.getElementById("formAgregarEvaluacion");
    if (formAgregar) {
        formAgregar.addEventListener("submit", function (event) {
            event.preventDefault();
            const evaluaciones = document.getElementById("evaluacionPuntaje").value;

            fetch("php/estadisticas/evaluaciones/agregarEvaluacion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `jugadorId=${jugadorId}&evaluaciones=${evaluaciones}`,
            })
                .then(response => response.text())
                .then(() => {
                    $("#modalAgregarEvaluacion").modal("hide");
                    cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al agregar evaluación:", error));
        });
    }

    // Manejo del modal de editar evaluaciones
    const formEditar = document.getElementById("formEditarEvaluacion");
    if (formEditar) {
        formEditar.addEventListener("submit", function (event) {
            event.preventDefault();
            const evaluaciones = document.getElementById("evaluacionPuntajeEditar").value;
            const evaluacionId = document.getElementById("evaluacionSelect").value;

            fetch("php/estadisticas/evaluaciones/editarEvaluacion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `evaluacionId=${evaluacionId}&evaluaciones=${evaluaciones}`,
            })
                .then(response => response.text())
                .then(() => {
                    $("#modalEditarEvaluacion").modal("hide");
                    cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al editar evaluación:", error));
        });
    }

    // Manejo del modal de borrar evaluaciones
    const confirmarBorrar = document.getElementById("confirmarBorrarEvaluacion");
    if (confirmarBorrar) {
        confirmarBorrar.addEventListener("click", function () {
            if (jugadorId) {
                fetch("php/estadisticas/evaluaciones/borrarEvaluacion.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `jugadorId=${jugadorId}`,
                })
                    .then(response => response.text())
                    .then(() => {
                        $("#modalBorrarEvaluacion").modal("hide");
                        cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones', searchTerm, currentPage);
                    })
                    .catch(error => console.error("Error al borrar evaluación:", error));
            }
        });
    }

    // Limitar las fechas de inicio y fin
    function limitarFechasEvaluaciones() {
        const hoy = new Date().toISOString().split("T")[0];
        const fechaInicio = document.getElementById("fechaInicioModalEvaluaciones");
        const fechaFin = document.getElementById("fechaFinModalEvaluaciones");

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

    // Cargar evaluaciones de un jugador en el modal de edición
    function cargarEvaluacionesJugador(jugadorId) {
        const fechaInicio = document.getElementById("fechaInicioModalEvaluaciones")?.value || '';
        const fechaFin = document.getElementById("fechaFinModalEvaluaciones")?.value || '';

        const url = `php/estadisticas/evaluaciones/obtenerFechaEvaluacion.php?jugadorId=${jugadorId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById("evaluacionSelect");
                if (select) {
                    select.innerHTML = "";
                    if (data.length === 0) {
                        select.innerHTML = "<option disabled>No hay evaluaciones</option>";
                    } else {
                        data.forEach(evaluacion => {
                            const option = document.createElement("option");
                            option.value = evaluacion.evaluacionId;
                            option.textContent = `Fecha: ${evaluacion.fecha}, Evaluación: ${evaluacion.evaluaciones}`;
                            select.appendChild(option);
                        });
                    }
                }
            })
            .catch(error => console.error("❌ Error al cargar evaluaciones:", error));
    }

    // Agregar eventos para actualizar al cambiar fechas
    document.getElementById("fechaInicioModalEvaluaciones")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarEvaluacionesJugador(jugadorId);
        }
    });

    document.getElementById("fechaFinModalEvaluaciones")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarEvaluacionesJugador(jugadorId);
        }
    });

    // Limitar fechas al cargar el script
    limitarFechasEvaluaciones();

    // Cargar datos iniciales de la tabla
    cargarDatos('php/estadisticas/evaluaciones/evaluaciones.php', 'tabla-evaluaciones');
});