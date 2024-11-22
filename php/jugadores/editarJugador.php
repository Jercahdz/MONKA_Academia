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

// Nota: La cadena es "sssiii" porque hay 3 strings y 3 enteros
$stmt->bind_param("sssiss", $nombreJugador, $apellidos, $edad, $dorsal, $pieHabil, $jugadorId);

if ($stmt->execute()) {
    echo "Jugador actualizado con éxito";  // Mensaje simple de éxito
} else {
    echo "Error al actualizar el jugador: " . $stmt->error;  // Mensaje de error detallado
}

$stmt->close();
$conn->close();
?>
