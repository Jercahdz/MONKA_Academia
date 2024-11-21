<?php
include("conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$tarjetasAmarillas = $_POST['tarjetasAmarillas'];
$tarjetasRojas = $_POST['tarjetasRojas'];
$fecha = date('Y-m-d'); // Fecha actual

// Verificar si ya existe una sanción para el jugador en la fecha actual
$sqlVerificar = "SELECT * FROM Sanciones WHERE jugadorId = ? AND fecha = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("is", $jugadorId, $fecha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar las tarjetas si ya existe una sanción para hoy
    $sqlActualizar = "UPDATE Sanciones SET amarillas = amarillas + ?, rojas = rojas + ? WHERE jugadorId = ? AND fecha = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("iiis", $tarjetasAmarillas, $tarjetasRojas, $jugadorId, $fecha);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva sanción para la fecha actual
    $sqlInsertar = "INSERT INTO Sanciones (amarillas, rojas, jugadorId, fecha) VALUES (?, ?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("iiis", $tarjetasAmarillas, $tarjetasRojas, $jugadorId, $fecha);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

$stmt->close();
$conn->close();
?>