<?php
include("conexion.php");
 
if (isset($_POST['text'])) {
    // Obteniendo el mensaje del usuario a través de AJAX y limpiándolo
    $getMesg = trim($_POST['text']);
 
    // Preparar consulta para evitar inyección SQL
    $check_data = "SELECT replies FROM chatbot WHERE queries LIKE CONCAT('%', ?, '%')";
    $stmt = $conn->prepare($check_data);
 
    if ($stmt) {
        // Bind de parámetros
        $stmt->bind_param("s", $getMesg);
 
        // Ejecutar consulta
        $stmt->execute();
 
        // Obtener resultados
        $result = $stmt->get_result();
 
        if ($result->num_rows > 0) {
            // Recuperando la respuesta de la base de datos
            $fetch_data = $result->fetch_assoc();
            $replay = $fetch_data['replies'];
            echo $replay;
        } else {
            echo "¡Lo siento, no puedo ayudarte con este inconveniente!";
        }
 
        // Liberar recursos
        $result->free();
        $stmt->close();
    } else {
        echo "Error en la preparación de la consulta.";
    }
 
    // Cerrar conexión
    $conn->close();
} else {
    echo "No se recibió un mensaje válido.";
}