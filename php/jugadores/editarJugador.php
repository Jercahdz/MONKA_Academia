<?php
include("../conexion.php");

$jugadorId = intval($_POST['jugadorId']);
$dorsal = intval($_POST['dorsal']);
$pieHabil = $_POST['pieHabil'];
$categoriaId = intval($_POST['categoriaId']);

$sql = "UPDATE Jugadores 
        SET dorsal = ?, pieHabil = ?, categoriaId = ? 
        WHERE jugadorId = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("isii", $dorsal, $pieHabil, $categoriaId, $jugadorId);

if ($stmt->execute()) {
    http_response_code(200);
} else {
    http_response_code(500);
    error_log("Error al actualizar el jugador: " . $stmt->error);
    echo json_encode(["error" => "Error al actualizar el jugador"]);
}

$stmt->close();
$conn->close();
?>