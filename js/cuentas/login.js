const container = document.querySelector('.container');
const toggleButton = document.querySelector('.toggle-button');
const signInForm = document.querySelector('.sign-in');
const signUpForm = document.querySelector('.sign-up');

toggleButton.addEventListener('click', () => {
    container.classList.toggle('toggle');

    if (container.classList.contains('toggle')) {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'flex';
        toggleButton.textContent = 'Iniciar Sesión';
    } else {
        signInForm.style.display = 'flex';
        signUpForm.style.display = 'none';
        toggleButton.textContent = 'Registrarse';
    }
});

// Funcion del ojo para mostrar la contraseña
function togglePassword(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.setAttribute("name", "eye-off-outline"); 
    } else {
        passwordInput.type = "password";
        icon.setAttribute("name", "eye-outline");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get("error");
    const successMessage = urlParams.get("success");

    if (errorMessage) {
        showMessage(errorMessage, "error");
    }
    if (successMessage) {
        showMessage(successMessage, "success");
    }
});

// Mostrar mensaje de error o éxito en el formulario
function showMessage(message, type) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(type === "error" ? "error-message" : "success-message");
    messageContainer.textContent = message;

    const form = document.querySelector(".container-form");
    form.insertBefore(messageContainer, form.firstChild);

    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

// Para abrir un modal
function abrirModal(id) {
    document.getElementById(id).style.display = 'flex';
    document.body.style.overflow = 'hidden'
}

// Para cerrar un modal
function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto'
}

// Evento para abrir el modal de recuperación al hacer clic en "¿Olvidaste tu contraseña?"
document.querySelector(".forgot-password").addEventListener("click", function (e) {
    e.preventDefault();
    abrirModal("modalRecuperacion");
});

// Función para verificar el correo y la palabra de seguridad
function verificarDatos() {
    const correo = document.getElementById("correoRecuperacion").value;
    const palabraSeguridad = document.getElementById("palabraSeguridad").value;

    fetch("php/usuarios/verificarRecuperacion.php", {
        method: "POST",
        body: JSON.stringify({ correo, palabraSeguridad }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cerrarModal("modalRecuperacion");
            abrirModal("modalCambioContrasena");
        } else {
            alert(data.message);
        }
    });
}

// Función para cambiar la contraseña
function cambiarContrasena() {
    const nuevaContrasena = document.getElementById("nuevaContrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;

    if (nuevaContrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    fetch("php/usuarios/restablecerContrasena.php", {
        method: "POST",
        body: JSON.stringify({ nuevaContrasena }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cerrarModal("modalCambioContrasena"); // Cerrar modal de cambio de contraseña
            alert("Contraseña cambiada con éxito.");
        } else {
            alert(data.message);
        }
    });
}