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
        header("Location: ../../login.html?error=El nombre de usuario no es válido.");
        exit();
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../../login.html?error=El correo electrónico no es válido.");
        exit();
    }

    // Verificar si el correo ya existe
    $query = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        header("Location: ../../login.html?error=El correo electrónico ya está en uso.");
        exit();
    }

    if (strlen($contrasenna) < 8) {
        header("Location: ../../login.html?error=La contraseña debe tener al menos 8 caracteres.");
        exit();
    }

    // Encriptar la contraseña
    $contrasena = password_hash($contrasenna, PASSWORD_DEFAULT);

    // Insertar usuario
    $sql = "INSERT INTO usuarios (nombreUsuario, correo, contrasena, rolId) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nombreUsuario, $correo, $contrasena, $rolId);

    if ($stmt->execute() === TRUE) {
        header("Location: ../../login.html?success=Usuario registrado con éxito.");
        exit();
    } else {
        header("Location: ../../login.html?error=No se pudo registrar al usuario.");
        exit();
    }

    $stmt->close();
}
?>
