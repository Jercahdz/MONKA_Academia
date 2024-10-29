<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    // Borrar las sanciones del jugador
    $sql = "DELETE FROM Sanciones WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if ($stmt->execute()) {
        echo "Sanciones eliminadas con éxito";
    } else {
        echo "Error al eliminar sanciones: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>