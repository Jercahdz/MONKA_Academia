<?php
include("../../conexion.php");

$jugadorId = $_POST['jugadorId'];
$cantidadAsistencias = $_POST['cantidadAsistencias'];
$fecha = date('Y-m-d');

// Verificar si ya existe una asistencia para el jugador en la fecha actual
$sqlVerificar = "SELECT * FROM Asistencias WHERE jugadorId = ? AND fecha = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("is", $jugadorId, $fecha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la cantidad de asistencias si ya existe un registro para hoy
    $sqlActualizar = "UPDATE Asistencias SET cantidadAsistencias = cantidadAsistencias + ? WHERE jugadorId = ? AND fecha = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("iis", $cantidadAsistencias, $jugadorId, $fecha);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva asistencia para la fecha actual
    $sqlInsertar = "INSERT INTO Asistencias (cantidadAsistencias, jugadorId, fecha) VALUES (?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("iis", $cantidadAsistencias, $jugadorId, $fecha);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

$stmt->close();
$conn->close();
?>