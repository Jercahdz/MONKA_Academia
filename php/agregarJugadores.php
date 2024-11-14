<?php
include("conexion.php");

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'todos';

$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, j.dorsal
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
            <td>{$row['nombreJugador']}</td>
            <td>{$row['apellidos']}</td>
            <td>{$row['edad']}</td>
            <td>{$row['dorsal']}</td>
            <td>
                <button class='btn-ver-detalles btn-table btn-sm' data-jugador-id='{$row['jugadorId']}'>Ver Detalles</button>
                <button class='btn-table btn-sm'>Editar</button>
            </td>
          </tr>";
}

$stmt->close();
$conn->close();
?>
