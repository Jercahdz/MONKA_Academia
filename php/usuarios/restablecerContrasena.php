<?php
session_start();
include("../conexion.php");

if (!isset($_SESSION['correoRecuperacion'])) {
    echo json_encode(["success" => false, "message" => "Sesión no válida. Intente de nuevo."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$nuevaContrasena = $data['nuevaContrasena'];

if (strlen($nuevaContrasena) < 8) {
    echo json_encode(["success" => false, "message" => "La contraseña debe tener al menos 8 caracteres."]);
    exit();
}

$contrasenaHash = password_hash($nuevaContrasena, PASSWORD_DEFAULT);
$query = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $contrasenaHash, $_SESSION['correoRecuperacion']);

if ($stmt->execute()) {
    session_destroy(); 
    echo json_encode(["success" => true, "message" => "Contraseña cambiada con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "No se pudo cambiar la contraseña"]);
}
?>