<?php
session_start();
include("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $nombreUsuario = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasenna = $_POST['password'];
    $rolId = 2;

    // Validaciones
    if (empty($nombreUsuario) || strlen($nombreUsuario) > 50) {
        echo "<script>console.log('Error: El nombre de usuario no es válido.');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "<script>console.log('Error: El correo electrónico no es válido.');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    // Verificar si el correo ya existe
    $query = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>console.log('Error: El correo electrónico ya está en uso.');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    if (strlen($contrasenna) < 8) {
        echo "<script>console.log('Error: La contraseña debe tener al menos 8 caracteres.');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    // Encriptar la contraseña de manera segura
    $contrasena = password_hash($contrasenna, PASSWORD_DEFAULT);

    // Preparar la consulta para insertar el nuevo usuario
    $sql = "INSERT INTO usuarios (nombreUsuario, correo, contrasena, rolId) 
            VALUES (?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nombreUsuario, $correo, $contrasena, $rolId);

    if ($stmt->execute() === TRUE) {
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    } else {
        echo "<script>console.log('Error: No se pudo registrar al usuario. Detalle: " . $stmt->error . "');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    $stmt->close();
}
?>