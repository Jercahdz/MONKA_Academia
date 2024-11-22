<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    // Eliminar la evaluación del jugador (establecer en 'Sin evaluaciones' o eliminar el registro)
    $sql = "UPDATE Evaluaciones SET evaluaciones = 'Sin evaluaciones' WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if ($stmt->execute()) {
        echo "Se eliminaron con éxito las evaluaciones del jugador";
    } else {
        echo "Error al eliminar la evaluación: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>