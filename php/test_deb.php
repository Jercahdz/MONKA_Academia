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

// Verificar conexión
if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
} else {
    echo "Conexión exitosa a la base de datos: $dbname";
}

// (Opcional) Probar una consulta simple
$query = "SHOW TABLES";
$result = $mysqli->query($query);

if ($result) {
    echo "<br>Tablas en la base de datos:";
    while ($row = $result->fetch_array()) {
        echo "<br>" . $row[0];
    }
} else {
    echo "<br>Error al ejecutar la consulta: " . $mysqli->error;
}

$mysqli->close();
?>
