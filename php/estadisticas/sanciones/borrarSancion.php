<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    // Actualizar las sanciones del jugador a 0
    $sql = "UPDATE Sanciones SET amarillas = 0, rojas = 0 WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if ($stmt->execute()) {
        echo "Se eliminaron con éxito las sanciones del jugador";
    } else {
        echo "Error al actualizar las sanciones: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>