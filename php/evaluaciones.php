<?php
session_start();
include("conexion.php");

// Consulta SQL para obtener los datos de los jugadores y sus evaluaciones
$sql = "
    SELECT 
        j.nombreJugador, j.apellidos, j.edad, 
        IFNULL(e.evaluaciones, 'Sin evaluaciones') AS evaluaciones
    FROM Jugadores j
    LEFT JOIN Evaluaciones e ON j.jugadorId = e.jugadorId
";

// Ejecutar la consulta
$result = $conn->query($sql);

// Comprobar si hay resultados
if ($result->num_rows > 0) {
    // Recorrer cada fila de los resultados y generar las filas de la tabla
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row['nombreJugador']) . "</td>
                <td>" . htmlspecialchars($row['apellidos']) . "</td>
                <td>" . htmlspecialchars($row['edad']) . "</td>
                <td>" . htmlspecialchars($row['evaluaciones']) . "</td>
                <td>
                    <button class='btn-table btn-sm'>Ver Detalles</button>
                    <button class='btn-table btn-sm'>Editar</button>
                    <button class='btn-table btn-sm'>Borrar</button>
                    <button class='btn-table btn-sm'>Agregar Nota</button>
                </td>
              </tr>";
    }
} else {
    // Si no hay resultados, mostrar mensaje en la tabla
    echo "<tr><td colspan='5'>No hay datos disponibles.</td></tr>";
}

// Cerrar la conexión
$conn->close();
?>
