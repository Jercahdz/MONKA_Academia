<?php
// Obtener la URL de conexión desde la variable de entorno
$url = parse_url(getenv("JAWSDB_URL"));

// Validar que la URL esté disponible
if (!$url) {
    die("Error: La configuración de la base de datos no está disponible.");
}

// Separar los valores de la URL
$host = $url["host"];
$user = $url["user"];
$password = $url["pass"];
$dbname = substr($url["path"], 1); // Elimina el '/' inicial

// Conectar a MySQL usando $conn
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar errores de conexión
if ($conn->connect_error) {
    // Solo mostrar mensajes detallados en modo desarrollo
    if (getenv("APP_ENV") === "development") {
        die("Error de conexión: " . $conn->connect_error);
    } else {
        die("Error de conexión a la base de datos. Por favor, inténtelo más tarde.");
    }
}

// Establecer el conjunto de caracteres (opcional, pero recomendado)
$conn->set_charset("utf8");
?>