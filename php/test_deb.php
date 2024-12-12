<?php
include("../conexion.php");

// Probar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos.<br>";
}

// Ejecutar una consulta simple para verificar si hay datos
$result = $conn->query("SHOW TABLES");

if ($result) {
    echo "Tablas disponibles:<br>";
    while ($row = $result->fetch_array()) {
        echo $row[0] . "<br>";
    }
} else {
    echo "Error al consultar las tablas: " . $conn->error;
}

$conn->close();
?>