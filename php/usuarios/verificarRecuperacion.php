<?php
include("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$correo = trim($data['correo']);
$palabraSeguridad = trim($data['palabraSeguridad']);

// Validar campos vacíos
if (empty($correo) || empty($palabraSeguridad)) {
    echo json_encode([
        "success" => false, 
        "message" => "Por favor, complete todos los campos."
    ]);
    exit;
}

// Validar formato de correo
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false, 
        "message" => "Por favor, ingrese un correo electrónico válido."
    ]);
    exit;
}

// Verificar si el correo existe
$query_email = "SELECT * FROM usuarios WHERE correo = ?";
$stmt_email = $conn->prepare($query_email);
$stmt_email->bind_param("s", $correo);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

if ($result_email->num_rows === 0) {
    echo json_encode([
        "success" => false, 
        "message" => "El correo electrónico no está registrado en el sistema."
    ]);
    exit;
}

// Verificar correo y palabra de seguridad
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
    echo json_encode([
        "success" => false, 
        "message" => "La palabra de seguridad no es correcta para este correo."
    ]);
}
?>