<?php
session_start();
include("../../conexion.php");

// Validacion 
if (!isset($_SESSION['usuarioId']) ||!isset($_SESSION['rolId']) || $_SESSION['rolId']!= 1) {
    echo "<script>alert('Solo los administradores pueden registrar jugadores.'); window.location.href = '../login.html';</script>";
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombreJugador = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $edad = $_POST['edad'];
    $posicion = $_POST['posicion'];
    $dorsal = $_POST['dorsal'];
    $pieHabil = $_POST['pieHabil'];
    $categoriaId = $_POST['categoria']; // El valor ya será 1, 2 o 3 según el dropdown

    // Validaciones básicas
    if (empty($nombreJugador) || strlen($nombreJugador) > 50) {
        echo "<script>alert('El nombre del jugador no es válido.');</script>";
        exit();
    }

    if (empty($apellidos) || strlen($apellidos) > 50) {
        echo "<script>alert('Los apellidos no son válidos.');</script>";
        exit();
    }

    if ($edad <= 0 || $edad > 100) {
        echo "<script>alert('La edad no es válida.');</script>";
        exit();
    }

    if (empty($posicion)|| ($posicion != 'Portero' && $posicion != 'Defensa' && $posicion != 'Mediocampo' && $posicion != 'Delantero')) {
        echo "<script>alert('La posición no es válida.');</script>";
        exit();
    }

    if ($dorsal <= 0 || $dorsal > 99) {
        echo "<script>alert('El número dorsal no es válido.');</script>";
        exit();
    }

    if (empty($pieHabil) || ($pieHabil != 'Derecho' && $pieHabil != 'Izquierdo')) {
        echo "<script>alert('El pie hábil no es válido.');</script>";
        exit();
    }

    // Preparar la consulta para insertar el nuevo jugador
    $sql = "INSERT INTO Jugadores (nombreJugador, apellidos, edad, posicion, dorsal, pieHabil, categoriaId) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisisi", $nombreJugador, $apellidos, $edad, $posicion, $dorsal, $pieHabil, $categoriaId);

    if ($stmt->execute() === TRUE) {
        echo "<script>alert('Jugador registrado con éxito'); window.location.href = '../registro.html';</script>";
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
