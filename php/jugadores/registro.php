<?php
session_start();
include("../conexion.php");

// Verificar si el usuario tiene permisos
if (!isset($_SESSION['usuarioId']) || !isset($_SESSION['rolId']) || $_SESSION['rolId'] != 1) {
    http_response_code(403);
    echo json_encode(["error" => "Acceso no autorizado. Será redirigido al inicio de sesión."]);
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

    // Validaciones
    if (empty($nombreJugador) || strlen($nombreJugador) > 50) {
        http_response_code(400);
        echo json_encode(["error" => "El nombre del jugador no es válido."]);
        exit();
    }

    if (empty($apellidos) || strlen($apellidos) > 50) {
        http_response_code(400);
        echo json_encode(["error" => "Los apellidos no son válidos."]);
        exit();
    }

    if ($edad <= 0 || $edad > 100) {
        http_response_code(400);
        echo json_encode(["error" => "La edad no es válida."]);
        exit();
    }

    if (empty($posicion) || !in_array($posicion, ['Portero', 'Defensa', 'Mediocampo', 'Delantero'])) {
        http_response_code(400);
        echo json_encode(["error" => "La posición no es válida."]);
        exit();
    }

    if ($dorsal <= 0 || $dorsal > 99) {
        http_response_code(400);
        echo json_encode(["error" => "El número dorsal no es válido."]);
        exit();
    }

    if (empty($pieHabil) || !in_array($pieHabil, ['Derecho', 'Izquierdo'])) {
        http_response_code(400);
        echo json_encode(["error" => "El pie hábil no es válido."]);
        exit();
    }

    // Insertar el jugador en la base de datos
    $sql = "INSERT INTO Jugadores (nombreJugador, apellidos, edad, posicion, dorsal, pieHabil, categoriaId) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisisi", $nombreJugador, $apellidos, $edad, $posicion, $dorsal, $pieHabil, $categoriaId);

    if ($stmt->execute() === TRUE) {
        http_response_code(200);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al registrar el jugador: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}