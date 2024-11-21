<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);
    $evaluaciones = $_POST['evaluaciones'];

    // Actualizar las evaluaciones
    $sql = "UPDATE Evaluaciones SET evaluaciones = ? WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $evaluaciones, $jugadorId);

    if ($stmt->execute()) {
        echo "Evaluación actualizada exitosamente";
    } else {
        echo "Error al actualizar la evaluación: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>