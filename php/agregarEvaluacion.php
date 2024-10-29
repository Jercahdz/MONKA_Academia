<?php
include("conexion.php");

// Obtener los datos del POST
$jugadorId = $_POST['jugadorId'];
$evaluaciones = $_POST['evaluaciones'];

// Verificar si ya existe una evaluación para el jugador
$sqlVerificar = "SELECT * FROM Evaluaciones WHERE jugadorId = ?";
$stmt = $conn->prepare($sqlVerificar);
$stmt->bind_param("i", $jugadorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Actualizar la evaluación si ya existe una
    $sqlActualizar = "UPDATE Evaluaciones SET evaluaciones = ? WHERE jugadorId = ?";
    $stmtActualizar = $conn->prepare($sqlActualizar);
    $stmtActualizar->bind_param("si", $evaluaciones, $jugadorId);
    $stmtActualizar->execute();
    $stmtActualizar->close();
} else {
    // Insertar una nueva evaluación si no existe
    $sqlInsertar = "INSERT INTO Evaluaciones (evaluaciones, jugadorId) VALUES (?, ?)";
    $stmtInsertar = $conn->prepare($sqlInsertar);
    $stmtInsertar->bind_param("si", $evaluaciones, $jugadorId);
    $stmtInsertar->execute();
    $stmtInsertar->close();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>