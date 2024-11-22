<?php
include("../../conexion.php");

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'todos';

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

$stmt = $conn->prepare($sql);

if ($categoria !== 'todos') {
    $stmt->bind_param("s", $categoria);
}

$stmt->execute();
$result = $stmt->get_result();

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

$stmt->close();
$conn->close();
?>
