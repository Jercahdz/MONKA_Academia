function loadFormation(formation) {
    $.ajax({
        url: 'php/jugadores/plantilla.php', // Ruta corregida
        type: 'GET',
        data: { formation: formation }, // Parámetro enviado al PHP
        success: function (response) {
            if (response) {
                $('#formationImage').attr('src', response); // Cambia la imagen
            } else {
                alert('No se pudo cargar la formación. Verifica que las imágenes estén disponibles.');
            }
        },
        error: function () {
            alert('Ocurrió un error al intentar cargar la formación.');
        }
    });
}