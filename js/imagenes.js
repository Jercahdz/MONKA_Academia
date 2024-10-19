function cargarImagenes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/imagenes.php", true); 
    xhr.onload = function() {
        if (this.status === 200) {
            var imagenes = JSON.parse(this.responseText); 
            var selectImagen = document.getElementById('selectImagen');
            var selectCategoria = document.getElementById('selectCategoria');
            var todasLasImagenes = imagenes; 

            selectCategoria.addEventListener('change', function() {
                var categoriaSeleccionada = selectCategoria.value;
                var imagenesFiltradas = filtrarImagenesPorCategoria(todasLasImagenes, categoriaSeleccionada);

                llenarSelectImagenes(imagenesFiltradas);
            });

            llenarSelectImagenes(filtrarImagenesPorCategoria(todasLasImagenes, 'plantillas'));
        }
    };
    xhr.send(); 
}

// Aqui de ven las imagenes segun su categoria
function filtrarImagenesPorCategoria(imagenes, categoria) {
    return imagenes.filter(function(imagen) {
        if (categoria === 'plantillas') {
            return imagen.nombre.includes('3-5-2') || imagen.nombre.includes('4-2-3-1') || imagen.nombre.includes('4-3-3') || imagen.nombre.includes('4-4-2');
        } else if (categoria === 'escudo') {
            return imagen.nombre.includes('escudo');
        } else if (categoria === 'sponsor') {
            return imagen.nombre.includes('sponsor');
        } else {
            return true; 
        }
    });
}

function llenarSelectImagenes(imagenes) {
    var selectImagen = document.getElementById('selectImagen');
    selectImagen.innerHTML = ''; 

    imagenes.forEach(function(imagen, index) {
        var option = document.createElement('option');
        option.value = index;
        option.text = imagen.nombre;
        selectImagen.add(option);
    });

    if (imagenes.length > 0) {
        mostrarImagen(imagenes[0].ruta, imagenes[0].nombre);
    }

    selectImagen.addEventListener('change', function() {
        var imagenSeleccionada = imagenes[selectImagen.value];
        mostrarImagen(imagenSeleccionada.ruta, imagenSeleccionada.nombre);
    });
}

function mostrarImagen(ruta, nombre) {
    var output = '<img src="' + ruta + '" alt="' + nombre + '" style="width: 300px; height: auto;">';
    document.getElementById('imagenSeleccionada').innerHTML = output;
}

window.onload = cargarImagenes;
