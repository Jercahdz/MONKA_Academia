<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['usuarioId'])) {
        session_unset(); 
        session_destroy();
    }

    header("Location: ../../index.html");
    exit();
} else {
    header("Location: ../../index.html");
    exit();
}
?>