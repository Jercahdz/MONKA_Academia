<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $asistenciaId = intval($_POST['asistenciaId']);
    $cantidadAsistencias = intval($_POST['cantidadAsistencias']);

    // Actualizar solo la asistencia seleccionada
    $sql = "UPDATE Asistencias SET cantidadAsistencias = ? WHERE asistenciaId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cantidadAsistencias, $asistenciaId);

    if (!$stmt->execute()) {
        error_log("Error al actualizar la asistencia: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>