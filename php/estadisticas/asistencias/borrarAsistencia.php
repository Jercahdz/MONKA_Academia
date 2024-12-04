<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);

    $sql = "UPDATE Asistencias SET cantidadAsistencias = 0 WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la cantidad de asistencias: " . $conn->error);
    }

    $stmt->close();
    $conn->close();
}
?>