document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const datoRegistro = new FormData(this); 

    fetch('php/registro.php', {
        method: 'POST',
        body: datoRegistro
    })
    .then(response => response.json())
    .then(data => {
        const mensajeRegistro = document.getElementById('mensaje-registro');
        if (data.status === 'success') {
            mensajeRegistro.innerHTML = `<p style="color: green;">${data.message}</p>`;
            this.reset(); 
        } else {
            mensajeRegistro.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    })
    .catch(error => {
        document.getElementById('mensaje-registro').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});
