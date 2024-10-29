<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    // Eliminar las evaluaciones del jugador
    $sql = "DELETE FROM Evaluaciones WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if ($stmt->execute()) {
        echo "Se eliminaron con éxito las evaluaciones del jugador";
    } else {
        echo "Error al eliminar las evaluaciones: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>