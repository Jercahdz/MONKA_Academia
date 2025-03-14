<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['rolId'])) {
    echo json_encode(["rolId" => $_SESSION['rolId']]);
} else {
    echo json_encode(["rolId" => null]);
}
?>