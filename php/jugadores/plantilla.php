<?php
// Array con las rutas de las imágenes
$formations = [
    "3-5-2" => "images/3-5-2.png",
    "4-1-2-1-2" => "images/4-1-2-1-2.png",
    "4-1-3-2" => "images/4-1-3-2.png",
    "4-2-1-3" => "images/4-2-1-3.png",
    "4-3-2-1" => "images/4-3-2-1.png",
    "4-4-2" => "images/4-4-2.png",
    "4-5-1" => "images/4-5-1.png",
    "5-3-2" => "images/5-3-2.png",
    "5-4-1" => "images/5-4-1.png",
];

// Obtener el parámetro 'formation' de la URL
$formation = $_GET['formation'] ?? '';

// Validar y devolver la imagen correspondiente
if (array_key_exists($formation, $formations)) {
    echo $formations[$formation];
} else {
    echo '';
}
?>
