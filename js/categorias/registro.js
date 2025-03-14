// Función para limitar la fecha de nacimiento
function limitarFechaNacimiento() {
    const fechaNacimientoInput = document.getElementById("edad");

    if (fechaNacimientoInput) {
        const hoy = new Date();
        const minEdad = 8;
        const maxEdad = 22;

        // Calcular las fechas límite
        const maxFecha = new Date(hoy.getFullYear() - minEdad, hoy.getMonth(), hoy.getDate()).toISOString().split("T")[0];
        const minFecha = new Date(hoy.getFullYear() - maxEdad, hoy.getMonth(), hoy.getDate()).toISOString().split("T")[0];

        // Establecer valores mínimo y máximo
        fechaNacimientoInput.min = minFecha;
        fechaNacimientoInput.max = maxFecha;

        // Validación en el evento change
        fechaNacimientoInput.addEventListener("change", function () {
            const fechaSeleccionada = new Date(this.value);
            const minFechaDate = new Date(minFecha);
            const maxFechaDate = new Date(maxFecha);

            if (fechaSeleccionada < minFechaDate || fechaSeleccionada > maxFechaDate) {
                alert("⚠️ Error: La fecha de nacimiento debe estar entre 8 y 22 años de edad.");
                this.value = ""; // Vaciar el campo si la fecha es inválida
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", limitarFechaNacimiento);

document.addEventListener("DOMContentLoaded", function () {
    verificarAcceso();
});

function verificarAcceso() {
    fetch("php/jugadores/verificarSesion.php")
        .then(response => response.json())
        .then(data => {
            if (data.rolId !== 1) { // Si el usuario no es administrador
                alert("⚠️ Solo los administradores pueden acceder a este módulo.");
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            alert("⚠️ Hubo un error en verificar tu sesión.");
            window.location.href = 'login.html';
        });
}
