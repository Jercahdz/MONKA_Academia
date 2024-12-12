<?php
// Obtener la URL de conexión desde la variable de entorno
$url = parse_url(getenv("JAWSDB_URL"));

// Separar los valores de la URL
$host = $url["host"];
$user = $url["user"];
$password = $url["pass"];
$dbname = substr($url["path"], 1); // Elimina el '/' inicial

// Conectar a MySQL
$mysqli = new mysqli($host, $user, $password, $dbname);

// Manejar errores de conexión
if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

?>
