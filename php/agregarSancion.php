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
    // Actualizar la cantidad de tarjetas si ya existe una sanción
    $sqlActualizar = "UPDATE Sanciones SET amarillas = amarillas + ?, rojas = rojas + ? WHERE jugadorId = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("iii", $tarjetasAmarillas, $tarjetasRojas, $jugadorId);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva sanción si no existe
    $sqlInsertar = "INSERT INTO Sanciones (amarillas, rojas, jugadorId) VALUES (?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("iii", $tarjetasAmarillas, $tarjetasRojas, $jugadorId);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>