<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    // Actualizar la cantidad de anotaciones del jugador a 0
    $sql = "UPDATE Anotaciones SET cantidadAnotaciones = 0 WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if ($stmt->execute()) {
        echo "Se eliminaron con exito las anotaciones del jugador";
    } else {
        echo "Error al actualizar la cantidad de anotaciones: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
