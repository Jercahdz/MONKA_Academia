<?php
include("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'];
$palabraSeguridad = $data['palabraSeguridad'];

$query = "SELECT * FROM usuarios WHERE correo = ? AND palabraSeguridad = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $correo, $palabraSeguridad);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Guardamos el correo en la sesión para usarlo en el cambio de contraseña
    session_start();
    $_SESSION['correoRecuperacion'] = $correo;
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Datos incorrectos"]);
}
?>