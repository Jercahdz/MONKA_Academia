<?php
	// Conexion a la base de datos
	include 'conexion.php';

	// Datos del formulario
	if(isset($_POST["submit"])){
	    $nombre = $_POST["nombre"];
		$apellidos = $_POST["apellidos"];
		$edad = $_POST["edad"];
		$posicion = $_POST["posicion"];
		$dorsal = $_POST["dorsal"];
		$pie_habil = $_POST["pie-habil"];
		$categoria = $_POST["categoria"];

		// Insertar los datos a la base
		$sql = "INSERT INTO Jugadores(nombreJugador, apellidos, edad, posicion, dorsal, pieHabil, categoriaId) 
        VALUES (?, ?, ?, ?, ?, ?, (SELECT categoriaId FROM Categoria WHERE nombreCategoria = ?))";

		$stmt = $conn->prepare($sql);
		$stmt->bind_param("ssisisi", $nombre, $apellidos, $edad, $posicion, $dorsal, $pie_habil, $categoria);

		if ($stmt->execute()) {
            echo json_encode(["status" => "suceess", "message" => "Registro Exitoso!"]);
		} else {
			echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
		}
		
		$stmt->close();
	}
$conn->close();
?>