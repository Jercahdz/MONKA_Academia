<?php
include("conexion.php");

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'todos';

$sql = "
    SELECT 
        j.nombreJugador, j.apellidos, j.edad, j.dorsal
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

$jugadores = [];
while ($row = $result->fetch_assoc()) {
    $jugadores[] = $row;
}

$stmt->close();
$conn->close();

foreach ($jugadores as $jugador) {
    echo "<tr>
            <td>{$jugador['nombreJugador']}</td>
            <td>{$jugador['apellidos']}</td>
            <td>{$jugador['edad']}</td>
            <td>{$jugador['dorsal']}</td>
            <td>
                <button class='btn-table btn-sm'>Ver Detalles</button>
                <button class='btn-table btn-sm'>Editar</button>
            </td>
          </tr>";
}
?>