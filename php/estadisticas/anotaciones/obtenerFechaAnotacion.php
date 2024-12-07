<?php
include("../../conexion.php");

if (isset($_GET['jugadorId'])) {
    $jugadorId = intval($_GET['jugadorId']);

    $sql = "SELECT anotacionId, fecha, cantidadAnotaciones FROM Anotaciones WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $anotaciones = [];
    while ($row = $result->fetch_assoc()) {
        $anotaciones[] = $row;
    }

    echo json_encode($anotaciones);

    $stmt->close();
    $conn->close();
}
?>