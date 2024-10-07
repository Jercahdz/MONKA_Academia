<?php
$servername = "localhost";
$username = "root";
$password = "Ryzen@Nitro5";
$database = "academiamonka";

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
