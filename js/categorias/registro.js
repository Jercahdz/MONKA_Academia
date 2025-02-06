document.getElementById("registroForm").addEventListener("submit", function (event) {
    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const edad = parseInt(document.getElementById("edad").value, 10);
    const posicion = document.getElementById("posicion").value;
    const dorsal = parseInt(document.getElementById("dorsal").value, 10);
    const pieHabil = document.getElementById("pieHabil").value;
    const categoria = document.getElementById("categoria").value;

    // Validar campos obligatorios
    if (!nombre || !apellidos || !posicion || !pieHabil || !categoria) {
        alert("Por favor, complete todos los campos obligatorios.");
        event.preventDefault();
        return;
    }

    // Validar dorsal
    if (isNaN(dorsal) || dorsal < 1 || dorsal > 99) {
        alert("El número dorsal debe estar entre 1 y 99.");
        event.preventDefault();
        return;
    }

    // Validar longitud del nombre y apellidos
    if (nombre.length > 50 || apellidos.length > 50) {
        alert("El nombre y los apellidos no pueden exceder los 50 caracteres.");
        event.preventDefault();
        return;
    }
});