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
        
        