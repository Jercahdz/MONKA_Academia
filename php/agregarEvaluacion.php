<?php
include("conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$evaluaciones = $_POST['evaluaciones'];
$fecha = date('Y-m-d'); // Fecha actual

// Verificar si ya existe una evaluación para el jugador en la fecha actual
$sqlVerificar = "SELECT * FROM Evaluaciones WHERE jugadorId = ? AND fecha = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("is", $jugadorId, $fecha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la evaluación si ya existe un registro para hoy
    $sqlActualizar = "UPDATE Evaluaciones SET evaluaciones = ? WHERE jugadorId = ? AND fecha = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("sis", $evaluaciones, $jugadorId, $fecha);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva evaluación para la fecha actual
    $sqlInsertar = "INSERT INTO Evaluaciones (evaluaciones, jugadorId, fecha) VALUES (?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("sis", $evaluaciones, $jugadorId, $fecha);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

$stmt->close();
$conn->close();
?>