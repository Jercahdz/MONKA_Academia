<?php
session_start();
include("../conexion.php");

// Verificar si hay un usuario logueado
if (isset($_SESSION['nombreUsuario'])) {
    $userName = $_SESSION['nombreUsuario'];
    $loggedIn = true;
} else {
    $userName = 'Invitado';
    $loggedIn = false;
}

// Devolver datos como texto plano separados por comas
if ($loggedIn) {
    echo "$userName, Conectado";
} else {
    echo "$userName, Desconectado";
}
?>