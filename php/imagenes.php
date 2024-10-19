<?php

session_start();
include("conexion.php"); 

$sql = "SELECT ruta, nombre FROM Imagenes";
$result = $conn->query($sql);

$imagenes = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imagenes[] = array(
            'ruta' => $row['ruta'],
            'nombre' => $row['nombre'],
        );
    }
} else {
    $imagenes = [];
}

header('Content-Type: application/json');
echo json_encode($imagenes);

// Cierra la conexión
$conn->close();
?>
