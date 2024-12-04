<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jugadorId = intval($_POST['jugadorId']);
    $cantidadAsistencias = intval($_POST['cantidadAsistencias']);

    $sql = "UPDATE Asistencias SET cantidadAsistencias = ? WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cantidadAsistencias, $jugadorId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la asistencia: " . $conn->error);
    }

    $stmt->close();
    $conn->close();
}
?>