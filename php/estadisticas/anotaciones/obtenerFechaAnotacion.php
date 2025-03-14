<?php
include("../../conexion.php");

header("Content-Type: application/json");

if (isset($_GET['jugadorId'])) {
    $jugadorId = intval($_GET['jugadorId']);
    $fechaInicio = isset($_GET['fechaInicio']) ? $_GET['fechaInicio'] : null;
    $fechaFin = isset($_GET['fechaFin']) ? $_GET['fechaFin'] : null;

    // Base query
    $sql = "SELECT anotacionId, fecha, cantidadAnotaciones FROM Anotaciones WHERE jugadorId = ?";
    
    // Agregar filtros de fecha si están presentes
    if ($fechaInicio && $fechaFin) {
        $sql .= " AND fecha BETWEEN ? AND ?";
    } elseif ($fechaInicio) {
        $sql .= " AND fecha >= ?";
    } elseif ($fechaFin) {
        $sql .= " AND fecha <= ?";
    }

    $stmt = $conn->prepare($sql);

    // Vincular parámetros dinámicamente
    if ($fechaInicio && $fechaFin) {
        $stmt->bind_param("iss", $jugadorId, $fechaInicio, $fechaFin);
    } elseif ($fechaInicio) {
        $stmt->bind_param("is", $jugadorId, $fechaInicio);
    } elseif ($fechaFin) {
        $stmt->bind_param("is", $jugadorId, $fechaFin);
    } else {
        $stmt->bind_param("i", $jugadorId);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $anotaciones = [];
    while ($row = $result->fetch_assoc()) {
        $anotaciones[] = $row;
    }

    echo json_encode($anotaciones);

    $stmt->close();
    $conn->close();
}
?>