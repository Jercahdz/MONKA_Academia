<?php
include("../conexion.php");

// Parámetros para la paginación
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$recordsPerPage = 15;
$offset = ($page - 1) * $recordsPerPage;

// Filtro de categoría
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'todos';

// Contar el total de registros
$sqlCount = "
    SELECT COUNT(*) as total
    FROM Jugadores j
    LEFT JOIN Categoria c ON j.categoriaId = c.categoriaId
";

if ($categoria !== 'todos') {
    $sqlCount .= " WHERE c.nombreCategoria = ?";
}

$stmtCount = $conn->prepare($sqlCount);

if ($categoria !== 'todos') {
    $stmtCount->bind_param("s", $categoria);
}

$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$totalRecords = $resultCount->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $recordsPerPage);

// Obtener registros de la página actual
$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, j.dorsal,
        j.pieHabil AS pieHabil
    FROM Jugadores j
    LEFT JOIN Categoria c ON j.categoriaId = c.categoriaId
";

if ($categoria !== 'todos') {
    $sql .= " WHERE c.nombreCategoria = ?";
}

$sql .= " LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);

if ($categoria !== 'todos') {
    $stmt->bind_param("sii", $categoria, $recordsPerPage, $offset);
} else {
    $stmt->bind_param("ii", $recordsPerPage, $offset);
}

$stmt->execute();
$result = $stmt->get_result();

// Generar las filas de la tabla
while ($row = $result->fetch_assoc()) {
    echo "<tr>
            <td>" . htmlspecialchars($row['nombreJugador']) . "</td>
            <td>" . htmlspecialchars($row['apellidos']) . "</td>
            <td>" . htmlspecialchars($row['edad']) . "</td>
            <td>" . htmlspecialchars($row['dorsal']) . "</td>
            <td>" . htmlspecialchars($row['pieHabil'] ?: 'Desconocido') . "</td>
            <td>
                <button class='btn-ver-detalles btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Ver Detalles</button>
                <button class='btn-editar btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Editar</button>
            </td>
          </tr>";
}

// Generar los controles de paginación
echo '<tr><td colspan="6"><nav><ul class="pagination justify-content-center">';

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
