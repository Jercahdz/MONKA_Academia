<?php
session_start();
include("../conexion.php");

// Verificar si hay un usuario logueado
if (isset($_SESSION['nombreUsuario'])) {
    $userName = $_SESSION['nombreUsuario'];
    $loggedIn = true;
    $rolId = $_SESSION['rolId']; // Obtener el rol del usuario
} else {
    $userName = 'Invitado';
    $loggedIn = false;
    $rolId = 0; // Sin rol asignado
}

// Devolver datos como texto plano separados por comas
if ($loggedIn) {
    echo "$userName, Conectado, $rolId";
} else {
    echo "$userName, Desconectado, $rolId";
}
?>