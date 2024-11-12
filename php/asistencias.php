<?php
session_start();
include("conexion.php");

// Obtener el parámetro de búsqueda
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$searchParam = '%' . $search . '%';

// Consulta SQL para obtener los datos
$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, j.dorsal,
        IFNULL(a.cantidadAnotaciones, 0) AS cantidadAnotaciones,
        c.nombreCategoria
    FROM Jugadores j
    LEFT JOIN Anotaciones a ON j.jugadorId = a.jugadorId
    LEFT JOIN Categoria c ON j.categoriaId = c.categoriaId
";

// Agregar cláusula WHERE si hay búsqueda
if (!empty($search)) {
    $sql .= " WHERE CONCAT(j.nombreJugador, ' ', j.apellidos) LIKE ?";
}

// Preparar la consulta
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Error al preparar la consulta: " . $conn->error);
}

// Vincular parámetros si hay búsqueda
if (!empty($search)) {
    $stmt->bind_param("s", $searchParam);
}

$stmt->execute();
$result = $stmt->get_result();

// Generar la tabla
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>" . htmlspecialchars($row['nombreJugador']) . "</td>
            <td>" . htmlspecialchars($row['apellidos']) . "</td>
            <td>" . htmlspecialchars($row['edad']) . "</td>
            <td>" . htmlspecialchars($row['cantidadAsistencias']) . "</td>
            <td>
                <button class='btn-agregar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Agregar Asistencias</button>
                <button class='btn-editar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "' data-cantidad-asistencias='" . htmlspecialchars($row['cantidadAsistencias']) . "'>Editar</button>
                <button class='btn-borrar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Borrar</button>
            </td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='5'>No hay datos disponibles.</td></tr>";
}

$stmt->close();
$conn->close();
?>