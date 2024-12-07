<?php
include("../../conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $sancionId = intval($_POST['sancionId']);
    $tarjetasAmarillas = intval($_POST['tarjetasAmarillas']);
    $tarjetasRojas = intval($_POST['tarjetasRojas']);

    // Validar que sancionId sea válido
    if ($sancionId > 0) {
        // Actualizar la sanción seleccionada
        $sql = "UPDATE Sanciones SET amarillas = ?, rojas = ? WHERE sancionId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $tarjetasAmarillas, $tarjetasRojas, $sancionId);

        if (!$stmt->execute()) {
            error_log("Error al actualizar la sanción: " . $stmt->error);
        }

        $stmt->close();
    } else {
        error_log("ID de sanción inválido.");
    }

    $conn->close();
}
?>