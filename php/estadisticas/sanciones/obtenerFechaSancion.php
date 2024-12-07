<?php
include("../../conexion.php");

if (isset($_GET['jugadorId'])) {
    $jugadorId = intval($_GET['jugadorId']);

    $sql = "SELECT sancionId, fecha, amarillas, rojas FROM Sanciones WHERE jugadorId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugadorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $sanciones = [];
    while ($row = $result->fetch_assoc()) {
        $sanciones[] = $row;
    }

    echo json_encode($sanciones);

    $stmt->close();
    $conn->close();
}
?>