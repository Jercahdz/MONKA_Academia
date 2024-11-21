document.addEventListener('DOMContentLoaded', function () {
    const userNameElement = document.getElementById('userName');
    const registroLink = document.getElementById('registroLink');
    const logoutOption = document.getElementById('logoutOption');

    if (userLoggedIn) {
        userNameElement.textContent = userName; // Set the username
        logoutOption.style.display = 'block'; // Show the logout option
        registroLink.style.display = 'block'; // Show the registration link
    } else {
        userNameElement.textContent = 'Guest'; // Default to Guest
        logoutOption.style.display = 'none'; // Hide the logout option
        registroLink.style.display = 'none'; // Hide the registration link
    }
});
