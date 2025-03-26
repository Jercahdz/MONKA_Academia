const categoriaSelect = document.getElementById("categoria");
const fechaInicioInput = document.getElementById("fechaInicio");
const fechaFinInput = document.getElementById("fechaFin");
const checkboxes = {
    anotaciones: document.getElementById("mostrarAnotaciones"),
    asistencias: document.getElementById("mostrarAsistencias"),
    sanciones: document.getElementById("mostrarSanciones"),
    evaluaciones: document.getElementById("mostrarEvaluaciones"),
};
let chart;

// Establecer límites en los inputs de fecha
const hoy = new Date().toISOString().split("T")[0];
fechaInicioInput.setAttribute("max", hoy);
fechaFinInput.setAttribute("max", hoy);

fechaInicioInput.addEventListener("change", validarFechas);
fechaFinInput.addEventListener("change", validarFechas);

function validarFechas() {
    let fechaInicio = fechaInicioInput.value;
    let fechaFin = fechaFinInput.value;

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
        alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
        fechaInicioInput.value = "";
        fechaFinInput.value = "";
    }
}

// Inicializar gráfico vacío
function inicializarGrafico() {
    const ctx = document.getElementById("grafico").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["No hay datos disponibles"],
            datasets: [{
                label: "Sin datos",
                data: [0],
                borderColor: "gray",
                borderDash: [5, 5],
                fill: false,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
            },
            scales: {
                x: { title: { display: true, text: "Jugadores" } },
                y: { title: { display: true, text: "Estadísticas" }, beginAtZero: true },
            },
        },
    });
}

// Actualizar gráfico con datos
function actualizarGrafico(data) {
    if (!data || data.labels.length === 0) {
        console.error("No se recibieron datos válidos del servidor.");
        return;
    }

    chart.data.labels = data.labels;

    const datasets = [];
    if (checkboxes.anotaciones.checked) datasets.push(data.datasets.anotaciones);
    if (checkboxes.asistencias.checked) datasets.push(data.datasets.asistencias);
    if (checkboxes.sanciones.checked) datasets.push(data.datasets.sanciones);
    if (checkboxes.evaluaciones.checked) datasets.push(data.datasets.evaluaciones);

    chart.data.datasets = datasets;

    // Actualizar el título del gráfico con las fechas
    if (data.fechaInicio && data.fechaFin) {
        chart.options.plugins.title = {
            display: true,
            text: `Estadísticas desde ${data.fechaInicio} hasta ${data.fechaFin}`
        };
    } else {
        chart.options.plugins.title = {
            display: false
        };
    }

    chart.update();
}

// Obtener datos con AJAX
function obtenerDatos() {
    const categoria = categoriaSelect.value;
    if (!categoria) return;

    const fechaInicio = fechaInicioInput.value.trim();
    const fechaFin = fechaFinInput.value.trim();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/estadisticas/graficos.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                actualizarGrafico(response);
            } catch (error) {
                console.error("Error procesando los datos del servidor:", error);
            }
        } else {
            console.error("Error al obtener datos.");
        }
    };

    const params = `categoria=${categoria}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    xhr.send(params);
}

// Evento al seleccionar una categoría
categoriaSelect.addEventListener("change", obtenerDatos);

// Evento para actualizar el gráfico al cambiar fechas
fechaInicioInput.addEventListener("change", obtenerDatos);
fechaFinInput.addEventListener("change", obtenerDatos);

// Evento para actualizar el gráfico al cambiar checkboxes
Object.values(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", obtenerDatos);
});

// Inicializar gráfico vacío al cargar la página
window.onload = inicializarGrafico;