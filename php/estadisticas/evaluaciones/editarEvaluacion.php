<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $evaluacionId = intval($_POST['evaluacionId']);
    $evaluaciones = $_POST['evaluaciones'];

    // Actualizar solo la evaluación seleccionada
    $sql = "UPDATE Evaluaciones SET evaluaciones = ? WHERE evaluacionId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $evaluaciones, $evaluacionId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la evaluación: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>