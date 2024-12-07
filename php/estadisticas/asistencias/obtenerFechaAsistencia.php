<?php
include("../../conexion.php");

if (isset($_GET['jugadorId'])) {
    $jugadorId = intval($_GET['jugadorId']);

    $sql = "SELECT asistenciaId, fecha, cantidadAsistencias FROM Asistencias WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $asistencias = [];
    while ($row = $result->fetch_assoc()) {
        $asistencias[] = $row;
    }

    echo json_encode($asistencias);

    $stmt->close();
    $conn->close();
}
?>