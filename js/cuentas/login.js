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