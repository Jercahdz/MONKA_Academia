<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $anotacionId = intval($_POST['anotacionId']);
    $cantidadGoles = intval($_POST['cantidadGoles']);

    // Actualizar solo la anotación seleccionada
    $sql = "UPDATE Anotaciones SET cantidadAnotaciones = ? WHERE anotacionId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cantidadGoles, $anotacionId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la anotación: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>