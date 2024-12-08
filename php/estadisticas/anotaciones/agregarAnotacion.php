<?php
include("../../conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$cantidadGoles = $_POST['cantidadGoles'];
$fecha = date('Y-m-d');

// Verificar si ya existe una anotación para el jugador en la fecha actual
$sqlVerificar = "SELECT * FROM Anotaciones WHERE jugadorId = ? AND fecha = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("is", $jugadorId, $fecha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la cantidad de goles si ya existe una anotación para hoy
    $sqlActualizar = "UPDATE Anotaciones SET cantidadAnotaciones = cantidadAnotaciones + ? WHERE jugadorId = ? AND fecha = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("iis", $cantidadGoles, $jugadorId, $fecha);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva anotación para la fecha actual
    $sqlInsertar = "INSERT INTO Anotaciones (cantidadAnotaciones, jugadorId, fecha) VALUES (?, ?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("iis", $cantidadGoles, $jugadorId, $fecha);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>