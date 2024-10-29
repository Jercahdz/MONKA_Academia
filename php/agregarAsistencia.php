<?php
include("conexion.php");

$jugadorId = $_POST['jugadorId'];
$cantidadAsistencias = $_POST['cantidadAsistencias'];

// Verificar si ya existe una asistencia para el jugador
$sqlVerificar = "SELECT * FROM Asistencias WHERE jugadorId = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("i", $jugadorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la cantidad de asistencias si ya existe un registro
    $sqlActualizar = "UPDATE Asistencias SET cantidadAsistencias = cantidadAsistencias + ? WHERE jugadorId = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("ii", $cantidadAsistencias, $jugadorId);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva asistencia si no existe
    $sqlInsertar = "INSERT INTO Asistencias (cantidadAsistencias, jugadorId) VALUES (?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("ii", $cantidadAsistencias, $jugadorId);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

$stmt->close();
$conn->close();
?>