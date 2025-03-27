function loadFormation(formation) {
    $.ajax({
        url: 'php/jugadores/plantilla.php',
        type: 'GET',
        data: { formation: formation },
        success: function (response) {
            if (response) {
                $('#formationImage').attr('src', response);
            } else {
                console.error('No se pudo cargar la formación. Verifica que las imágenes estén disponibles.');
            }
        },
        error: function () {
            console.error('Ocurrió un error al intentar cargar la formación.');
        }
    });
}