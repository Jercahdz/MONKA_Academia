<?php
session_start();
include("../../conexion.php");

// Parámetros para la paginación
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$searchParam = '%' . $search . '%';

$recordsPerPage = 15;
$offset = ($page - 1) * $recordsPerPage;

// Contar el total de registros (sin duplicados por fecha)
$sqlCount = "
    SELECT COUNT(DISTINCT j.jugadorId) as total
    FROM Jugadores j
    LEFT JOIN Asistencias a ON j.jugadorId = a.jugadorId
    WHERE CONCAT(j.nombreJugador, ' ', j.apellidos) LIKE ?
";
$stmtCount = $conn->prepare($sqlCount);
$stmtCount->bind_param("s", $searchParam);
$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$totalRecords = $resultCount->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $recordsPerPage);

// Obtener registros agrupados por jugador
$sql = "
    SELECT 
        j.jugadorId, 
        j.nombreJugador, 
        j.apellidos, 
        TIMESTAMPDIFF(YEAR, j.edad, CURDATE()) as edad, 
        IFNULL(SUM(a.cantidadAsistencias), 0) AS cantidadAsistencias
    FROM Jugadores j
    LEFT JOIN Asistencias a ON j.jugadorId = a.jugadorId
    WHERE CONCAT(j.nombreJugador, ' ', j.apellidos) LIKE ?
    GROUP BY j.jugadorId, j.nombreJugador, j.apellidos, j.edad
    LIMIT ? OFFSET ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $searchParam, $recordsPerPage, $offset);
$stmt->execute();
$result = $stmt->get_result();

// Generar el encabezado de la tabla
echo '<thead class="thead-dark">';
echo '<tr>
    <th>Nombre</th>
    <th>Apellidos</th>
    <th>Edad</th>
    <th>Asistencias</th>';
if (isset($_SESSION['rolId']) && $_SESSION['rolId'] == 1) {
    echo '<th>Acciones</th>';
}
echo '</tr>';
echo '</thead>';

// Generar las filas de la tabla
echo '<tbody>';
while ($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>" . htmlspecialchars($row['nombreJugador']) . "</td>
        <td>" . htmlspecialchars($row['apellidos']) . "</td>
        <td>" . htmlspecialchars($row['edad']) . "</td>
        <td>" . htmlspecialchars($row['cantidadAsistencias']) . "</td>";
    if (isset($_SESSION['rolId']) && $_SESSION['rolId'] == 1) {
        echo "
        <td>
            <button class='btn-agregar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Agregar Asistencias</button>
            <button class='btn-editar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "' data-cantidad-asistencias='" . htmlspecialchars($row['cantidadAsistencias']) . "'>Editar</button>
            <button class='btn-borrar-asistencias btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Borrar</button>
        </td>";
    }
    echo "</tr>";
}
echo '</tbody>';

// Generar los controles de paginación
echo '<tr><td colspan="5"><nav><ul class="pagination justify-content-center">';

// Botón "Anterior"
if ($page > 1) {
    echo "<li class='page-item'><a class='page-link' href='#' data-page='" . ($page - 1) . "'>Anterior</a></li>";
}

// Números de página
for ($i = 1; $i <= $totalPages; $i++) {
    $active = $i == $page ? 'active' : '';
    echo "<li class='page-item $active'><a class='page-link' href='#' data-page='$i'>$i</a></li>";
}

// Botón "Siguiente"
if ($page < $totalPages) {
    echo "<li class='page-item'><a class='page-link' href='#' data-page='" . ($page + 1) . "'>Siguiente</a></li>";
}

echo '</ul></nav></td></tr>';

// Cerrar conexión
$stmt->close();
$stmtCount->close();
$conn->close();
?>