<?php
session_start();
include("../conexion.php");

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../../login.html?error=Método no permitido.");
    exit();
}

// Validar entrada
$correo = filter_input(INPUT_POST, 'correo', FILTER_VALIDATE_EMAIL);
$contrasenna = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

if (!$correo || empty($contrasenna)) {
    header("Location: ../../login.html?error=Correo o contraseña inválidos.");
    exit();
}

try {
    // Consulta para verificar credenciales y estado
    $sql = "SELECT usuarioId, nombreUsuario, rolId, contrasena, enLinea FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows !== 1) {
        header("Location: ../../login.html?error=Usuario o contraseña incorrectos.");
        exit();
    }

    $usuario = $result->fetch_assoc();

    // Verificar si ya tiene sesión activa
    if ($usuario['enLinea'] == 1) {
        header("Location: ../../login.html?error=Este usuario ya tiene una sesión activa en otro dispositivo.");
        exit();
    }

    // Verificar la contraseña
    if (!password_verify($contrasenna, $usuario['contrasena'])) {
        header("Location: ../../login.html?error=Usuario o contraseña incorrectos.");
        exit();
    }

    // Actualizar el estado a en línea
    $updateSql = "UPDATE usuarios SET enLinea = 1 WHERE usuarioId = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("i", $usuario['usuarioId']);
    $updateStmt->execute();
    $updateStmt->close();

    // Guardar sesión
    $_SESSION['usuarioId'] = $usuario['usuarioId'];
    $_SESSION['nombreUsuario'] = $usuario['nombreUsuario'];
    $_SESSION['rolId'] = $usuario['rolId'];

    session_regenerate_id(true);

    // Redirigir al inicio con mensaje de éxito
    header("Location: ../../index.html?success=Inicio de sesión exitoso.");
    exit();

} catch (Exception $e) {
    error_log($e->getMessage());
    header("Location: ../../login.html?error=Errorr interno.");
    exit();
}

$stmt->close();
$conn->close();
?>