<?php
$servername = "localhost";
$username = "root";
$password = "JersonHDZc18060510@";
$database = "academiamonka";

try {
    // Crear la conexion
    $conn = new mysqli($servername, $username, $password, $database);

    // Verificar la conexion
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
