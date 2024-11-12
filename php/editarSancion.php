<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);
    $tarjetasAmarillas = intval($_POST['tarjetasAmarillas']);
    $tarjetasRojas = intval($_POST['tarjetasRojas']);

    // Actualizar la cantidad de tarjetas amarillas y rojas
    $sql = "UPDATE Sanciones SET amarillas = ?, rojas = ? WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $tarjetasAmarillas, $tarjetasRojas, $jugadorId);

    if ($stmt->execute()) {
        echo "Sanción actualizada exitosamente";
    } else {
        echo "Error al actualizar la sanción: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>