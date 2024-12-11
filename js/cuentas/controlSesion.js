document.addEventListener('DOMContentLoaded', function () {
    const userNameElement = document.getElementById('userName');
    const registroLink = document.getElementById('registroLink');
    const logoutOption = document.getElementById('logoutOption');
    const loginOption = document.getElementById('loginOption');

    // Solicitud AJAX para verificar el estado de sesión
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/php/usuarios/controlSesion.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Separar los datos recibidos
            const response = xhr.responseText.trim().split(', ');
            const userName = response[0]; // Nombre del usuario
            const status = response[1];  // Estado de conexión
            const rolId = parseInt(response[2]); // Rol del usuario

            // Actualizar la interfaz según el estado y el rol
            userNameElement.textContent = userName;

            if (status === 'Conectado') {
                logoutOption.style.display = 'block';
                loginOption.style.display = 'none';

                if (rolId === 1) { // Mostrar "Registro de Jugadores" solo si es admin
                    registroLink.style.display = 'block';
                } else {
                    registroLink.style.display = 'none';
                }
            } else {
                userNameElement.textContent = 'Invitado';
                logoutOption.style.display = 'none';
                loginOption.style.display = 'block';
                registroLink.style.display = 'none';
            }
        }
    };
    xhr.send(); // Enviar la solicitud
});