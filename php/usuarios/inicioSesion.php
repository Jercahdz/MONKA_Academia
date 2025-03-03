<?php
session_start();
include("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $correo = $_POST['correo'];
    $contrasenna = $_POST['password'];

    // Consulta para verificar el correo
    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $usuario = $result->fetch_assoc();

        // Verificar contraseña
        if (password_verify($contrasenna, $usuario['contrasena'])) {
            $_SESSION['usuarioId'] = $usuario['usuarioId'];
            $_SESSION['nombreUsuario'] = $usuario['nombreUsuario'];
            $_SESSION['rolId'] = $usuario['rolId'];

            // Redirigir al inicio
            header("Location: ../../index.html");
            exit();
        } else {
            // Contraseña incorrecta
            header("Location: ../../login.html?error=Contraseña incorrecta.");
            exit();
        }
    } else {
        // Correo no encontrado
        header("Location: ../../login.html?error=El usuario no existe.");
        exit();
    }

    $stmt->close();
}
?>
