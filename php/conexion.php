<?php
$db_host = getenv('DB_HOST'); // Nombre del servidor MySQL
$db_user = getenv('DB_USER'); // Usuario JJJJ
$db_password = getenv('DB_PASSWORD'); // Contraseña del usuario
$db_name = getenv('DB_NAME'); // Nombre de la base de datos

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
