<?php
include("../../conexion.php");

if (isset($_GET['jugadorId'])) {
    $jugadorId = intval($_GET['jugadorId']);

    $sql = "SELECT evaluacionId, fecha, evaluaciones FROM Evaluaciones WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $evaluaciones = [];
    while ($row = $result->fetch_assoc()) {
        $evaluaciones[] = $row;
    }

    echo json_encode($evaluaciones);

    $stmt->close();
    $conn->close();
}
?>