<?php
session_start();
include("../conexion.php");

header('Content-Type: application/json'); // Asegurar respuesta en JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['usuarioId'])) {
        // Actualizar estado en la base de datos
        $sql = "UPDATE usuarios SET enLinea = 0 WHERE usuarioId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $_SESSION['usuarioId']);
        $stmt->execute();
        $stmt->close();

        // Cerrar sesión
        session_unset();
        session_destroy();

        // Responder en JSON para que JS pueda interpretarlo
        echo json_encode(["status" => "success"]);
        exit();
    }
}

// Si no hay sesión, también enviamos una respuesta JSON
echo json_encode(["status" => "no_session"]);
exit();
?>