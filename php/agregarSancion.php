<?php
include("conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$tarjetasAmarillas = $_POST['tarjetasAmarillas'];
$tarjetasRojas = $_POST['tarjetasRojas'];

// Verificar si ya existe una sanción para el jugador
$sqlVerificar = "SELECT * FROM Sanciones WHERE jugadorId = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("i", $jugadorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar las sanciones existentes
    $sqlActualizar = "UPDATE Sanciones SET amarillas = amarillas + ?, rojas = rojas + ? WHERE jugadorId = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("iii", $tarjetasAmarillas, $tarjetasRojas, $jugadorId);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva sanción si no existe
    $sqlInsertar = "INSERT INTO Sanciones (jugadorId, amarillas, rojas) VALUES (?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("iii", $jugadorId, $tarjetasAmarillas, $tarjetasRojas);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

$stmt->close();
$conn->close();
?>