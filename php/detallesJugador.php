<?php
include("conexion.php");

$jugadorId = isset($_GET['jugadorId']) ? intval($_GET['jugadorId']) : 0;

if ($jugadorId > 0) {
    $sql = "
    SELECT j.nombreJugador, j.apellidos, j.edad, j.dorsal, 
           CASE j.pieHabil
               WHEN 0 THEN 'Izquierdo'
               WHEN 1 THEN 'Derecho'
               ELSE 'Desconocido'
           END AS pieHabil,
           c.nombreCategoria, IFNULL(a.cantidadAnotaciones, 0) AS cantidadAnotaciones
    FROM Jugadores j
    LEFT JOIN Categoria c ON j.categoriaId = c.categoriaId
    LEFT JOIN Anotaciones a ON j.jugadorId = a.jugadorId
    WHERE j.jugadorId = ?
";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $jugador = $result->fetch_assoc();

        
        echo json_encode($jugador);
    } else {
        echo json_encode(["error" => "Jugador no encontrado."]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "ID de jugador inválido."]);
}

$conn->close();
?>
