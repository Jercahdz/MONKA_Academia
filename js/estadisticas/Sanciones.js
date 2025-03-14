window.sancionesJsActiva = true;

document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    let jugadorId = null;
    let sancionId = null;
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
        const tablaContainer = document.getElementById("tabla-sanciones");

        if (!tablaContainer) return;

        tablaContainer.addEventListener("click", function (event) {
            const target = event.target;

            // Botón "Agregar Sanción"
            if (target.classList.contains("btn-agregar-sancion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalAgregarSancion").modal("show");
            }

            // Botón "Editar"
            if (target.classList.contains("btn-editar-sancion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                cargarSancionesJugador(jugadorId); // Cargar las opciones dinámicas
                $("#modalEditarSancion").modal("show");
            }

            // Botón "Borrar"
            if (target.classList.contains("btn-borrar-sancion")) {
                jugadorId = target.getAttribute("data-jugador-id");
                $("#modalBorrarSancion").modal("show");
            }
        });
    }

    // Asignar evento para la barra de búsqueda (actualiza mientras se escribe)
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            searchTerm = e.target.value;
            cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones', searchTerm, 1); // Reiniciar a la primera página
        });
    }

    // Manejo del modal de agregar sanciones
    const formAgregar = document.getElementById("formAgregarSancion");
    if (formAgregar) {
        formAgregar.addEventListener("submit", function (event) {
            event.preventDefault();
            const amarillas = document.getElementById("tarjetasAmarillas").value;
            const rojas = document.getElementById("tarjetasRojas").value;

            fetch("php/estadisticas/sanciones/agregarSancion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `jugadorId=${jugadorId}&tarjetasAmarillas=${amarillas}&tarjetasRojas=${rojas}`,
            })
                .then(() => {
                    $("#modalAgregarSancion").modal("hide");
                    cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al agregar sanción:", error));
        });
    }

    // Manejo del modal de editar sanciones
    const formEditar = document.getElementById("formEditarSancion");
    if (formEditar) {
        formEditar.addEventListener("submit", function (event) {
            event.preventDefault();
            const amarillas = document.getElementById("tarjetasAmarillasEditar").value;
            const rojas = document.getElementById("tarjetasRojasEditar").value;
            const sancionId = document.getElementById("sancionSelect").value;

            fetch("php/estadisticas/sanciones/editarSancion.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `sancionId=${sancionId}&tarjetasAmarillas=${amarillas}&tarjetasRojas=${rojas}`,
            })
                .then(() => {
                    $("#modalEditarSancion").modal("hide");
                    cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones', searchTerm, currentPage);
                })
                .catch(error => console.error("Error al editar sanción:", error));
        });
    }

    // Manejo del modal de borrar sanciones
    const confirmarBorrar = document.getElementById("confirmarBorrarSancion");
    if (confirmarBorrar) {
        confirmarBorrar.addEventListener("click", function () {
            if (jugadorId) {
                fetch("php/estadisticas/sanciones/borrarSancion.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `jugadorId=${jugadorId}`,
                })
                    .then(() => {
                        $("#modalBorrarSancion").modal("hide");
                        cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones', searchTerm, currentPage);
                    })
                    .catch(error => console.error("Error al borrar sanción:", error));
            }
        });
    }

    // Función para limitar las fechas de inicio y fin
    function limitarFechas() {
        const hoy = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
        const fechaInicio = document.getElementById("fechaInicioModalSanciones");
        const fechaFin = document.getElementById("fechaFinModalSanciones");

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

    // Función para cargar las sanciones de un jugador en el modal de editar
    function cargarSancionesJugador(jugadorId) {
        const fechaInicio = document.getElementById("fechaInicioModalSanciones")?.value || '';
        const fechaFin = document.getElementById("fechaFinModalSanciones")?.value || '';

        const url = `php/estadisticas/sanciones/obtenerFechaSancion.php?jugadorId=${jugadorId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById("sancionSelect");
                if (select) {
                    select.innerHTML = "";
                    if (data.length === 0) {
                        select.innerHTML = "<option disabled>No hay sanciones</option>";
                    } else {
                        data.forEach(sancion => {
                            const option = document.createElement("option");
                            option.value = sancion.sancionId;
                            option.textContent = `Fecha: ${sancion.fecha}, Amarillas: ${sancion.amarillas}, Rojas: ${sancion.rojas}`;
                            select.appendChild(option);
                        });
                    }
                }
            })
            .catch(error => console.error("❌ Error al cargar sanciones:", error));
    }

    document.getElementById("fechaInicioModalSanciones")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarSancionesJugador(jugadorId);
        }
    });

    document.getElementById("fechaFinModalSanciones")?.addEventListener("change", function () {
        if (jugadorId) {
            cargarSancionesJugador(jugadorId);
        }
    });

    limitarFechas();

    // Cargar datos iniciales de la tabla
    cargarDatos('php/estadisticas/sanciones/sanciones.php', 'tabla-sanciones');
});