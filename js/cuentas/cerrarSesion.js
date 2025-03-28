let tiempoInactivo;

// Función para verificar si hay sesión activa antes de cerrar sesión
function verificarSesionYCerrar() {
    fetch('php/usuarios/controlSesion.php')
        .then(response => response.text())
        .then(data => {
            const response = data.trim().split(', ');
            const status = response[1]; // 'Conectado' o 'Desconectado'

            if (status === 'Conectado') {
                cerrarSesion(); // Solo cerrar si hay sesión activa
            }
        })
        .catch(error => console.error("Error al verificar la sesión:", error));
}

// Función para cerrar sesión automáticamente
function cerrarSesion() {
    fetch('php/usuarios/cerrarSesion.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                mostrarMensajeCierre();
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
}

// Función para cerrar sesión manualmente
document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    fetch('php/usuarios/cerrarSesion.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success" || data.status === "no_session") {
                window.location.href = "login.html";
            }
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
});


// Mostrar modal cuando la sesión expira
function mostrarMensajeCierre() {
    let modal = document.createElement("div");
    modal.id = "modalSesionExpirada";
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        pointer-events: auto;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
            min-width: 300px;
        ">
            <h2>Sesión Expirada</h2>
            <p>Tu sesión ha finalizado por inactividad.</p>
            <button id="aceptarCerrarSesion" style="
                background: red;
                color: white;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                border-radius: 5px;
            ">Aceptar</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden"; // Evita el scroll y bloquea interacción

    document.getElementById("aceptarCerrarSesion").addEventListener("click", function () {
        let modal = document.getElementById("modalSesionExpirada");
        if (modal) {
            modal.remove();
        }
        document.body.style.overflow = "auto"; // Restaura la interacción
        window.location.href = "login.html";
    });
}

// Reiniciar el contador cuando el usuario interactúa
function reiniciarTemporizador() {
    clearTimeout(tiempoInactivo);
    tiempoInactivo = setTimeout(verificarSesionYCerrar, 5000); // 5 segundos
    //tiempoInactivo = setTimeout(verificarSesionYCerrar, 300000); // 5 minutos
}

// Detectar eventos de actividad
document.addEventListener("mousemove", reiniciarTemporizador);
document.addEventListener("keypress", reiniciarTemporizador);
document.addEventListener("click", reiniciarTemporizador);
document.addEventListener("scroll", reiniciarTemporizador);

// Iniciar el contador al cargar la página
reiniciarTemporizador();