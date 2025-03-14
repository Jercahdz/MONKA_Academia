<?php
session_start();
include("../conexion.php");

// Verificar permisos de usuario
if (!isset($_SESSION['usuarioId']) || !isset($_SESSION['rolId']) || $_SESSION['rolId'] != 1) {
    echo "<script>
        window.location.href = '../../login.html';
    </script>";
    exit();
}

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos del formulario
    $nombreJugador = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $edad = $_POST['edad'];
    $posicion = $_POST['posicion'];
    $dorsal = $_POST['dorsal'];
    $pieHabil = $_POST['pieHabil'];
    $categoriaId = $_POST['categoria'];

    // Insertar el jugador en la base de datos
    $sql = "INSERT INTO Jugadores (nombreJugador, apellidos, edad, posicion, dorsal, pieHabil, categoriaId) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssisi", $nombreJugador, $apellidos, $edad, $posicion, $dorsal, $pieHabil, $categoriaId);

    // Ejecutar la consulta
    if ($stmt->execute() === TRUE) {
        header("Location: ../../registro.html");
    } else {
        echo "Error al registrar el jugador. Por favor, intenta nuevamente.";
    }

    $stmt->close();
    $conn->close();
    exit();
}