<?php
session_start();
include($_SERVER['DOCUMENT_ROOT'] . "/php/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $correo = $_POST['correo'];
    $contrasenna = $_POST['password'];

    // Consulta para verificar las credenciales
    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    
    // Preparar la consulta
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Credenciales válidas
        $usuario = $result->fetch_assoc();
        
        // Verificar la contraseña
        if (password_verify($contrasenna, $usuario['contrasena'])) {
            // Guardar información del usuario en la sesión
            $_SESSION['usuarioId'] = $usuario['usuarioId'];
            $_SESSION['nombreUsuario'] = $usuario['nombreUsuario'];
            $_SESSION['rolId'] = $usuario['rolId'];

           // Redirigir al inicio
            echo "<script>window.location.href = '../../index.html';</script>";
            exit();
        } else {
            // Contraseña incorrecta
            echo "<script>console.log('Error: Contraseña incorrecta.');</script>";
            echo "<script>window.location.href = '../../login.html';</script>";
            exit();
        }
    } else {
        // Correo no encontrado
        echo "<script>console.log('Error: Usuario no encontrado.');</script>";
        echo "<script>window.location.href = '../../login.html';</script>";
        exit();
    }

    $stmt->close();
}
?>