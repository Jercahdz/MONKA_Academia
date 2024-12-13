const categoriaSelect = document.getElementById("categoria");
const aplicarFiltroBtn = document.getElementById("aplicarFiltro");
const checkboxes = {
    anotaciones: document.getElementById("mostrarAnotaciones"),
    asistencias: document.getElementById("mostrarAsistencias"),
    sanciones: document.getElementById("mostrarSanciones"),
    evaluaciones: document.getElementById("mostrarEvaluaciones"),
};
let chart;

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
                legend: {
                    display: true,
                },
                tooltip: {
                    enabled: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Jugadores",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Estadísticas",
                    },
                    beginAtZero: true,
                },
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
    chart.update();
}

// Obtener datos con AJAX
function obtenerDatos(categoria, fechaInicio, fechaFin) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/estadisticas/graficos.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            actualizarGrafico(response);
        } else {
            console.error("Error al obtener datos.");
        }
    };

    // Crear los parámetros para el envío
    const params = `categoria=${categoria}&fechaInicio=${fechaInicio || ''}&fechaFin=${fechaFin || ''}`;
    xhr.send(params);
}

// Evento al seleccionar una categoría
categoriaSelect.addEventListener("change", function () {
    const categoria = categoriaSelect.value;
    obtenerDatos(categoria);
});

// Evento para aplicar filtro de fechas
aplicarFiltroBtn.addEventListener("click", function () {
    const categoria = categoriaSelect.value;
    const fechaInicio = document.getElementById("fechaInicio").value || null;
    const fechaFin = document.getElementById("fechaFin").value || null;

    if (categoria) {
        obtenerDatos(categoria, fechaInicio, fechaFin);
    } else {
        alert("Por favor, selecciona una categoría.");
    }
});

// Actualizar gráfico al cambiar los checkboxes
Object.values(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const categoria = categoriaSelect.value;
        if (categoria) {
            obtenerDatos(categoria);
        }
    });
});

// Inicializar gráfico vacío al cargar la página
window.onload = inicializarGrafico;