function cargarImagenes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/imagenes.php", true);
    xhr.onload = function() {
        if (this.status === 200) {
            var imagenes = JSON.parse(this.responseText); 

            mostrarImagenes('sponsor', imagenes);
            crearSelectPlantillas(imagenes);
            mostrarImagenes('escudo', imagenes);
        }
    };
    xhr.send(); 
}

function mostrarImagenes(categoria, imagenes) {
    var contenedor = document.getElementById(categoria + '-imagenes');
    contenedor.innerHTML = ''; 

    var imagenesFiltradas = imagenes.filter(function(imagen) {
        return imagen.nombre.toLowerCase().includes(categoria); 
    });

    imagenesFiltradas.forEach(function(imagen) {
        var imgElement = document.createElement('img');
        imgElement.src = imagen.ruta;
        imgElement.alt = imagen.nombre;
        imgElement.style.width = '200px'; 
        imgElement.style.margin = '10px';
        contenedor.appendChild(imgElement);
    });
}

function crearSelectPlantillas(imagenes) {
    var select = document.getElementById('plantilla-select');
    select.innerHTML = ''; 

    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    imagenes.forEach(function(imagen) {
        if (imagen.nombre.match(/^\d[-]\d[-]\d\.png$/) || 
            imagen.nombre.match(/^\d[-]\d[-]\d[-]\d\.png$/)) { 
            var option = document.createElement('option');
            option.value = imagen.ruta;
            option.textContent = imagen.nombre.replace('.png', ''); 
            select.appendChild(option);
        }
    });

    select.onchange = function() {
        var imgMostrar = document.getElementById('plantilla-imagen');
        imgMostrar.src = select.value;
        imgMostrar.style.display = 'block'; 
    };
}

window.onload = cargarImagenes;
