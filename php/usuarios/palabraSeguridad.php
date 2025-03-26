<?php
session_start();
include("../conexion.php");

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuarioId'])) {
    header("Location: ../../login.html?error=Debes iniciar sesión para acceder a esta página.");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuarioId = $_SESSION['usuarioId'];
    $palabraSeguridad = trim($_POST['palabraSeguridad']);

    // Verificar que la palabra no esté vacía
    if (empty($palabraSeguridad)) {
        header("Location: ../../palabraSeguridad.html?error=La palabra de seguridad no puede estar vacía.");
        exit();
    }

    // Guardar la palabra en la base de datos
    $sql = "UPDATE usuarios SET palabraSeguridad = ? WHERE usuarioId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $palabraSeguridad, $usuarioId);
    
    if ($stmt->execute()) {
        header("Location: ../../index.html?success=Palabra de seguridad guardada correctamente.");
    } else {
        header("Location: ../../definirPalabraSeguridad.html?error=Hubo un error al guardar la palabra de seguridad.");
    }

    $stmt->close();
    $conn->close();
}
?>