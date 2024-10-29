<?php
session_start();
include("conexion.php");

// Consulta SQL para obtener los datos de los jugadores y sus goles
$sql = "
    SELECT 
        j.jugadorId, j.nombreJugador, j.apellidos, j.edad, 
        IFNULL(a.cantidadAnotaciones, 0) AS cantidadAnotaciones
    FROM Jugadores j
    LEFT JOIN Anotaciones a ON j.jugadorId = a.jugadorId
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
            <td>" . htmlspecialchars($row['cantidadAnotaciones']) . "</td>
            <td>
                <button class='btn-agregar-goles btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Agregar Goles</button>
                <button class='btn-editar btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "' data-cantidad-anotaciones='" . htmlspecialchars($row['cantidadAnotaciones']) . "'>Editar</button>
                <button class='btn-borrar btn-table btn-sm' data-jugador-id='" . htmlspecialchars($row['jugadorId']) . "'>Borrar</button>
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