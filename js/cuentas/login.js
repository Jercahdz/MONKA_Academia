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

// Evento para mostrar la contraseña en el formulario de inicio de sesión
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

    const recoveryModal = document.getElementById('modalRecuperacion');
    if (recoveryModal) {
        const inputs = recoveryModal.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(event) {
                // Verificar si la tecla presionada es Enter (código 13)
                if (event.key === 'Enter') {
                    // Prevenir el comportamiento por defecto del Enter
                    event.preventDefault();
                    
                    // Llamar a la función de verificación de datos
                    verificarDatos();
                }
            });
        });
    }

    const changePasswordModal = document.getElementById('modalCambioContrasena');
    if (changePasswordModal) {
        const inputs = changePasswordModal.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(event) {
                // Verificar si la tecla presionada es Enter (código 13)
                if (event.key === 'Enter') {
                    // Prevenir el comportamiento por defecto del Enter
                    event.preventDefault();
                    
                    // Llamar a la función de cambio de contraseña
                    cambiarContrasena();
                }
            });
        });
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

// Función para mostrar mensajes en modales
function showModalMessage(modalId, message, type) {
    // Primero, remover cualquier mensaje existente
    const existingMessage = document.querySelector(`#${modalId} .modal-message`);
    if (existingMessage) {
        existingMessage.remove();
    }

    // Crear contenedor de mensaje
    const messageContainer = document.createElement("div");
    messageContainer.classList.add('modal-message');
    messageContainer.classList.add(type === 'error' ? 'error-message' : 'success-message');
    messageContainer.textContent = message;

    // Insertar el mensaje justo después del encabezado del modal
    const modalHeader = document.querySelector(`#${modalId} .modal-header`);
    modalHeader.insertAdjacentElement('afterend', messageContainer);

    // Remover el mensaje después de 5 segundos
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

    // Limpiar formularios y mensajes
    const modal = document.getElementById(id);
    modal.querySelectorAll('input').forEach(input => input.value = '');
    
    const existingMessage = modal.querySelector('.modal-message');
    if (existingMessage) {
        existingMessage.remove();
    }
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
            // Cambiar de alert a showModalMessage
            showModalMessage("modalRecuperacion", data.message, "error");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showModalMessage("modalRecuperacion", "Ocurrió un error. Intente de nuevo.", "error");
    });
}

// Función para cambiar la contraseña
function cambiarContrasena() {
    const nuevaContrasena = document.getElementById("nuevaContrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;

    if (nuevaContrasena !== confirmarContrasena) {
        // Cambiar de alert a showModalMessage
        showModalMessage("modalCambioContrasena", "Las contraseñas no coinciden.", "error");
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
            // Mostrar mensaje de éxito en el modal
            showModalMessage("modalCambioContrasena", "Contraseña cambiada con éxito.", "success");
            
            // Redirigir después de un breve tiempo
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            // Mostrar mensaje de error en el modal
            showModalMessage("modalCambioContrasena", data.message, "error");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showModalMessage("modalCambioContrasena", "Ocurrió un error. Intente de nuevo.", "error");
    });
}