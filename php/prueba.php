<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Variable para almacenar las categorías
$categorias = [];

// Preparar la consulta para traer las categorías
$sql = "SELECT * FROM Categoria";

// Ejecutar la consulta
if ($result = $conn->query($sql)) {
    // Verificar si hay resultados
    if ($result->num_rows > 0) {
        // Guardar las categorías en un arreglo
        while ($row = $result->fetch_assoc()) {
            $categorias[] = $row;
        }
    } else {
        echo "No se encontraron categorías.";
    }
} else {
    echo "Error al ejecutar la consulta: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>

<!-- Tabla HTML para mostrar las categorías -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Categorías</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>

<h2>Categorías en la Base de Datos</h2>

<table>
    <thead>
        <tr>
            <th>ID Categoría</th>
            <th>Nombre Categoría</th>
            <th>ID Usuario</th>
        </tr>
    </thead>
    <tbody>
        <?php if (!empty($categorias)) : ?>
            <?php foreach ($categorias as $categoria) : ?>
                <tr>
                    <td><?php echo $categoria['categoriaId']; ?></td>
                    <td><?php echo $categoria['nombreCategoria']; ?></td>
                    <td><?php echo $categoria['usuarioId']; ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else : ?>
            <tr>
                <td colspan="3">No hay categorías disponibles.</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>

</body>
</html>
