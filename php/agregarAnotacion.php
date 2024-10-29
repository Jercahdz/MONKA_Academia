<?php
include("conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$cantidadGoles = $_POST['cantidadGoles'];

// Verificar si ya existe una anotación para el jugador
$sqlVerificar = "SELECT * FROM Anotaciones WHERE jugadorId = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("i", $jugadorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la cantidad de goles si ya existe una anotación
    $sqlActualizar = "UPDATE Anotaciones SET cantidadAnotaciones = cantidadAnotaciones + ? WHERE jugadorId = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("ii", $cantidadGoles, $jugadorId);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva anotación si no existe
    $sqlInsertar = "INSERT INTO Anotaciones (cantidadAnotaciones, jugadorId) VALUES (?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("ii", $cantidadGoles, $jugadorId);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>