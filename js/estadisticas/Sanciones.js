document.addEventListener("DOMContentLoaded", function () {
    let jugadorId = null;
    let searchTerm = '';
    let currentPage = 1;

    function recargarTablaSanciones(search = '', page = 1) {
        const url = `php/estadisticas/sanciones/sanciones.php?search=${encodeURIComponent(search)}&page=${page}`;
    
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Crear un contenedor temporal para procesar la tabla
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;
    
                // Extraer y reemplazar el contenido del thead y tbody
                const newThead = tempDiv.querySelector("thead");
                const newTbody = tempDiv.querySelector("tbody");
    
                if (newThead) {
                    const theadElement = document.getElementById("tabla-cabecera-sanciones");
                    theadElement.innerHTML = newThead.innerHTML;
    
                    // Asegurar que la clase thead-dark esté aplicada
                    if (!theadElement.classList.contains("thead-dark")) {
                        theadElement.classList.add("thead-dark");
                    }
                }
                if (newTbody) {
                    document.getElementById("tabla-sanciones").innerHTML = newTbody.innerHTML;
                }
    
                // Reasignar eventos de paginación después de recargar
                const paginacionLinks = document.querySelectorAll('.pagination a');
                paginacionLinks.forEach(link => {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        currentPage = this.getAttribute("data-page");
                        recargarTablaSanciones(searchTerm, currentPage);
                    });
                });
            })
            .catch(error => console.error("Error al recargar la tabla:", error));
    }
    
    recargarTablaAnotaciones(searchTerm, currentPage);

    // Búsqueda
    document.getElementById("searchInput").addEventListener("input", function (e) {
        searchTerm = e.target.value;
        recargarTablaSanciones(searchTerm, 1);
    });

    // Delegación de eventos en la tabla
    document.getElementById("tabla-sanciones").addEventListener("click", function (event) {
        const target = event.target;

        // Botón "Agrear Sanción"
        if (target.classList.contains("btn-agregar-sancion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalAgregarSancion").modal("show");
        }

        // Botón "Editar"
        if (target.classList.contains("btn-editar-sancion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            const rojas = target.getAttribute("data-rojas");
            const amarillas = target.getAttribute("data-amarillas");

            document.getElementById("tarjetasAmarillasEditar").value = amarillas;
            document.getElementById("tarjetasRojasEditar").value = rojas;
            $("#modalEditarSancion").modal("show");
        }

        // Botón "Borrar"
        if (target.classList.contains("btn-borrar-sancion")) {
            jugadorId = target.getAttribute("data-jugador-id");
            $("#modalBorrarSancion").modal("show");
        }
    });

    // Manejo de los formularios

    // Manejo del modal de agregar sanciones
    document.getElementById("formAgregarSancion").addEventListener("submit", function (event) {
        event.preventDefault();
        const amarillas = document.getElementById("tarjetasAmarillas").value;
        const rojas = document.getElementById("tarjetasRojas").value;

        fetch("php/estadisticas/sanciones/agregarSancion.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `jugadorId=${jugadorId}&tarjetasAmarillas=${amarillas}&tarjetasRojas=${rojas}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalAgregarSancion").modal("hide");
                recargarTablaSanciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al agregar sanción:", error));
    });

    // Manejo del modal de editar sanciones
    document.getElementById("formEditarSancion").addEventListener("submit", function (event) {
        event.preventDefault();
        const amarillas = document.getElementById("tarjetasAmarillasEditar").value;
        const rojas = document.getElementById("tarjetasRojasEditar").value;

        fetch("php/estadisticas/sanciones/editarSancion.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `jugadorId=${jugadorId}&tarjetasAmarillas=${amarillas}&tarjetasRojas=${rojas}`,
        })
            .then(response => response.text())
            .then(data => {
                $("#modalEditarSancion").modal("hide");
                recargarTablaSanciones(searchTerm, currentPage);
            })
            .catch(error => console.error("Error al editar sanción:", error));
    });

    // Manejo del modal de borrar sanciones
    document.getElementById("confirmarBorrarSancion").addEventListener("click", function () {
        if (jugadorId) {
            fetch("php/estadisticas/sanciones/borrarSancion.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `jugadorId=${jugadorId}`,
            })
                .then(response => response.text())
                .then(data => {
                    $("#modalBorrarSancion").modal("hide");
                    alert(data);
                    recargarTablaAsistencias(searchTerm, currentPage);
                })
                .catch(error => console.error("Error al borrar sanciones:", error));
        }
    });
});