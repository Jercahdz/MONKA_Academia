<?php
include("../conexion.php");

$categoria = $_POST['categoria'];
$fechaInicio = $_POST['fechaInicio'] ?? null;
$fechaFin = $_POST['fechaFin'] ?? null;

// Construir la consulta dinámicamente
$sqlBase = "
    SELECT j.nombreJugador, 
           COALESCE(SUM(a.cantidadAnotaciones), 0) AS anotaciones,
           COALESCE(SUM(asist.cantidadAsistencias), 0) AS asistencias,
           COALESCE(SUM(s.amarillas + s.rojas), 0) AS sanciones,
           COALESCE((SELECT e2.evaluaciones 
                     FROM Evaluaciones e2 
                     WHERE e2.jugadorId = j.jugadorId 
                     " . ($fechaInicio && $fechaFin ? "AND e2.fecha BETWEEN ? AND ?" : "") . "
                     ORDER BY e2.fecha DESC 
                     LIMIT 1), 0) AS evaluaciones
    FROM Jugadores j
    LEFT JOIN Anotaciones a ON j.jugadorId = a.jugadorId 
        " . ($fechaInicio && $fechaFin ? "AND a.fecha BETWEEN ? AND ?" : "") . "
    LEFT JOIN Asistencias asist ON j.jugadorId = asist.jugadorId 
        " . ($fechaInicio && $fechaFin ? "AND asist.fecha BETWEEN ? AND ?" : "") . "
    LEFT JOIN Sanciones s ON j.jugadorId = s.jugadorId 
        " . ($fechaInicio && $fechaFin ? "AND s.fecha BETWEEN ? AND ?" : "") . "
    WHERE j.categoriaId = ? 
    GROUP BY j.jugadorId";

// Preparar la consulta
$stmt = $conn->prepare($sqlBase);

// Vincular parámetros
$params = [];
$types = "";

if ($fechaInicio && $fechaFin) {
    array_push($params, $fechaInicio, $fechaFin); // Para Evaluaciones
    array_push($params, $fechaInicio, $fechaFin); // Para Anotaciones
    array_push($params, $fechaInicio, $fechaFin); // Para Asistencias
    array_push($params, $fechaInicio, $fechaFin); // Para Sanciones
    $types .= "ssssssss";
}

array_push($params, $categoria);
$types .= "i";

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

// Procesar los datos
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

// Enviar la respuesta en formato JSON
echo json_encode([
    "labels" => $labels, 
    "datasets" => $datasets,
    "fechaInicio" => $fechaInicio,
    "fechaFin" => $fechaFin
]);

$conn->close();
?>