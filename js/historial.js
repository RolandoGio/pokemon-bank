document.addEventListener("DOMContentLoaded", function () {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "index.html";
        return;
    }

    // Verificar si los elementos existen antes de modificarlos
    let nombreUsuario = document.getElementById("nombreUsuario");
    let cuentaUsuario = document.getElementById("cuentaUsuario");

    if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;
    if (cuentaUsuario) cuentaUsuario.textContent = usuario.cuentaBancaria;

    mostrarHistorial();
});

function mostrarHistorial() {
    let historial = JSON.parse(sessionStorage.getItem("historial")) || [];
    let historialTabla = document.getElementById("historialTabla");

    if (!historialTabla) {
        console.error("Elemento 'historialTabla' no encontrado en el HTML.");
        return;
    }

    // Limpiar contenido previo
    historialTabla.innerHTML = "";

    if (historial.length === 0) {
        historialTabla.innerHTML = `<tr><td colspan="4" class="text-center">No hay transacciones registradas.</td></tr>`;
        return;
    }

    historial.forEach(transaccion => {
        let fila = `
            <tr>
                <td>${transaccion.fecha}</td>
                <td>${transaccion.tipo}</td>
                <td>${transaccion.monto} ${transaccion.moneda === "usd" ? "$" : "₱"}</td>
                <td>${transaccion.descripcion}</td>
            </tr>
        `;
        historialTabla.innerHTML += fila;
    });
}
