<?php
$formations = [
    "3-5-2" => "images/3-5-2.webp",
    "4-1-2-1-2" => "images/4-1-2-1-2.webp",
    "4-1-3-2" => "images/4-1-3-2.webp",
    "4-2-1-3" => "images/4-2-1-3.webp",
    "4-3-2-1" => "images/4-3-2-1.webp",
    "4-4-2" => "images/4-4-2.webp",
    "4-5-1" => "images/4-5-1.webp",
    "5-3-2" => "images/5-3-2.webp",
    "5-4-1" => "images/5-4-1.webp",
];

$formation = $_GET['formation'] ?? '';

if (array_key_exists($formation, $formations)) {
    echo $formations[$formation];
} else {
    echo '';
}
?>