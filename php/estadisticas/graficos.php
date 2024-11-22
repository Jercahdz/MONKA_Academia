<?php
include("../../conexion.php");

// Obtener los datos enviados
$categoria = $_POST['categoria'];
$fechaInicio = $_POST['fechaInicio'] ?? null;
$fechaFin = $_POST['fechaFin'] ?? null;

$sqlBase = "
    SELECT j.nombreJugador, 
           IFNULL(SUM(a.cantidadAnotaciones), 0) AS anotaciones,
           IFNULL(SUM(asist.cantidadAsistencias), 0) AS asistencias,
           IFNULL(SUM(s.amarillas + s.rojas), 0) AS sanciones,
           IFNULL(COUNT(e.evaluacionId), 0) AS evaluaciones
    FROM Jugadores j
    LEFT JOIN Anotaciones a ON j.jugadorId = a.jugadorId
    LEFT JOIN Asistencias asist ON j.jugadorId = asist.jugadorId
    LEFT JOIN Sanciones s ON j.jugadorId = s.jugadorId
    LEFT JOIN Evaluaciones e ON j.jugadorId = e.jugadorId
    WHERE j.categoriaId = ?
";

// Agregar filtros de fecha
if ($fechaInicio && $fechaFin) {
    $sqlBase .= " AND (
        (a.fecha BETWEEN ? AND ?) OR
        (asist.fecha BETWEEN ? AND ?) OR
        (s.fecha BETWEEN ? AND ?) OR
        (e.fecha BETWEEN ? AND ?)
    )";
}

$sqlBase .= " GROUP BY j.nombreJugador";

$stmt = $conn->prepare($sqlBase);
if ($fechaInicio && $fechaFin) {
    $stmt->bind_param("issssssss", $categoria, $fechaInicio, $fechaFin, $fechaInicio, $fechaFin, $fechaInicio, $fechaFin, $fechaInicio, $fechaFin);
} else {
    $stmt->bind_param("i", $categoria);
}
$stmt->execute();
$result = $stmt->get_result();

$labels = [];
$datasets = [
    "anotaciones" => ["label" => "Anotaciones", "data" => [], "borderColor" => "blue", "fill" => false],
    "asistencias" => ["label" => "Asistencias", "data" => [], "borderColor" => "green", "fill" => false],
    "sanciones" => ["label" => "Sanciones", "data" => [], "borderColor" => "red", "fill" => false],
    "evaluaciones" => ["label" => "Evaluaciones", "data" => [], "borderColor" => "orange", "fill" => false],
];

while ($row = $result->fetch_assoc()) {
    $labels[] = $row['nombreJugador'];
    $datasets["anotaciones"]["data"][] = $row['anotaciones'];
    $datasets["asistencias"]["data"][] = $row['asistencias'];
    $datasets["sanciones"]["data"][] = $row['sanciones'];
    $datasets["evaluaciones"]["data"][] = $row['evaluaciones'];
}

echo json_encode([
    "labels" => $labels,
    "datasets" => $datasets,
]);

$conn->close();
?>