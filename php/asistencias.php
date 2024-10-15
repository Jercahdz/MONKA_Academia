<?php
session_start();
include("conexion.php");

// Consulta SQL para obtener los datos de los jugadores y sus asistencias
$sql = "
    SELECT 
        j.nombreJugador, j.apellidos, j.edad, 
        IFNULL(a.cantidadAsistencias, 0) AS cantidadAsistencias
    FROM Jugadores j
    LEFT JOIN Asistencias a ON j.jugadorId = a.jugadorId
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
                <td>" . htmlspecialchars($row['cantidadAsistencias']) . "</td>
                <td>
                    <button class='btn-table btn-sm'>Ver Detalles</button>
                    <button class='btn-table btn-sm'>Editar</button>
                    <button class='btn-table btn-sm'>Borrar</button>
                    <button class='btn-table btn-sm'>Agregar Asistencia</button>
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