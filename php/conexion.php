<?php
// Obtener la URL de conexión desde la variable de entorno
$url = parse_url(getenv("JAWSDB_URL"));

// Separar los valores de la URL
$host = $url["host"];
$user = $url["user"];
$password = $url["pass"];
$dbname = substr($url["path"], 1); // Elimina el '/' inicial

// Conectar a MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Manejar errores de conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Establecer conjunto de caracteres
$conn->set_charset("utf8");
?>