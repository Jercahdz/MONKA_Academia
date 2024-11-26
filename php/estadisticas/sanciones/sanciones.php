<?php
session_start();
include("../../conexion.php");

// Parámetros de búsqueda y paginación
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$searchParam = '%' . $search . '%';

$recordsPerPage = 15;
$offset = ($page - 1) * $recordsPerPage;

// Contar el total de registros
$sqlCount = "
    SELECT COUNT(*) as total
    FROM Jugadores j
    LEFT JOIN Sanciones s ON j.jugadorId = s.jugadorId
    WHERE CONCAT(j.nombreJugador, ' ', j.apellidos) LIKE ?
";
$stmtCount = $conn->prepare($sqlCount);
$stmtCount->bind_param("s", $searchParam);
$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$totalRecords = $resultCount->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $recordsPerPage);

// Obtener registros para la página actual
$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, 
        IFNULL(s.rojas, 0) AS rojas,
        IFNULL(s.amarillas, 0) AS amarillas
    FROM Jugadores j
    LEFT JOIN Sanciones s ON j.jugadorId = s.jugadorId
    WHERE CONCAT(j.nombreJugador, ' ', j.apellidos) LIKE ?
    LIMIT ? OFFSET ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $searchParam, $recordsPerPage, $offset);
$stmt->execute();
$result = $stmt->get_result();

// Generar filas de la tabla
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

// Generar paginación
echo '<tr><td colspan="6"><nav><ul class="pagination justify-content-center">';
if ($page > 1) {
    echo "<li class='page-item'><a class='page-link' href='#' data-page='" . ($page - 1) . "'>Anterior</a></li>";
}
for ($i = 1; $i <= $totalPages; $i++) {
    $active = $i == $page ? 'active' : '';
    echo "<li class='page-item $active'><a class='page-link' href='#' data-page='$i'>$i</a></li>";
}
if ($page < $totalPages) {
    echo "<li class='page-item'><a class='page-link' href='#' data-page='" . ($page + 1) . "'>Siguiente</a></li>";
}
echo '</ul></nav></td></tr>';

$stmt->close();
$stmtCount->close();
$conn->close();
?>