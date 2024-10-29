<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);
    $cantidadGoles = intval($_POST['cantidadGoles']);

    // Actualizar la cantidad de anotaciones
    $sql = "UPDATE Anotaciones SET cantidadAnotaciones = ? WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cantidadGoles, $jugadorId);

    if ($stmt->execute()) {
        echo "Anotación actualizada exitosamente";
    } else {
        echo "Error al actualizar la anotación: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>