<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);
    $cantidadGoles = intval($_POST['cantidadGoles']);

    // Actualizar la cantidad de anotaciones
    $sql = "UPDATE Anotaciones SET cantidadAnotaciones = ? WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cantidadGoles, $jugadorId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la anotación: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>