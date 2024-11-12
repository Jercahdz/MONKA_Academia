<?php
session_start();
include("conexion.php");

// Obtener el parámetro de búsqueda
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$searchParam = '%' . $search . '%';

// Consulta SQL para obtener los datos
$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, 
        IFNULL(s.rojas, 0) AS rojas,
        IFNULL(s.amarillas, 0) AS amarillas
    FROM Jugadores j
    LEFT JOIN Sanciones s ON j.jugadorId = s.jugadorId
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
            <td>" . htmlspecialchars($row['rojas']) . "</td>
            <td>" . htmlspecialchars($row['amarillas']) . "</td>
            <td>
                <button class='btn-agregar-sancion btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Agregar Sanciones</button>
                <button class='btn-editar-sancion btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "' data-rojas='" . htmlspecialchars($row['rojas']) . "' data-amarillas='" . htmlspecialchars($row['amarillas']) . "'>Editar</button>
                <button class='btn-borrar-sancion btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Borrar</button>
            </td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='6'>No hay datos disponibles.</td></tr>";
}

$stmt->close();
$conn->close();
?>