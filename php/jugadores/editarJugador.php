<?php
include("../conexion.php");

$jugadorId = intval($_POST['jugadorId']);
$nombreJugador = $_POST['nombreJugador'];
$apellidos = $_POST['apellidos'];
$edad = intval($_POST['edad']);
$dorsal = intval($_POST['dorsal']);
$pieHabil = $_POST['pieHabil'];

$sql = "UPDATE Jugadores 
        SET nombreJugador = ?, apellidos = ?, edad = ?, dorsal = ?, pieHabil = ?
        WHERE jugadorId = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("sssiss", $nombreJugador, $apellidos, $edad, $dorsal, $pieHabil, $jugadorId);

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