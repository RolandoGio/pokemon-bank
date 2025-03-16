document.addEventListener("DOMContentLoaded", function () {
    let historial = JSON.parse(sessionStorage.getItem("historial")) || [];

    let depositos = historial.filter(t => t.tipo === "Depósito").length;
    let retiros = historial.filter(t => t.tipo === "Retiro").length;
    let pagos = historial.filter(t => t.tipo === "Pago de Servicio").length;

    let ctx = document.getElementById("graficoTransacciones").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Depósitos", "Retiros", "Pagos de Servicio"],
            datasets: [{
                label: "Cantidad",
                data: [depositos, retiros, pagos],
                backgroundColor: ["#4CAF50", "#FFC107", "#007BFF"]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "white" // Color del texto del eje Y
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.2)" // Color de las líneas del eje Y (más oscuras y semitransparentes)
                    }
                },
                x: {
                    ticks: {
                        color: "white" // Color del texto del eje X
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.2)" // Color de las líneas del eje X (más oscuras y semitransparentes)
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white" // Color del texto de la leyenda
                    }
                }
            }
        }
        
    });
});
