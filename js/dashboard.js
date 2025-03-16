document.addEventListener("DOMContentLoaded", function () {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "index.html";
        return;
    }

    if (!usuario.saldoUSD) usuario.saldoUSD = 100;
    if (!usuario.saldoPKD) usuario.saldoPKD = usuario.saldoUSD * 130;
    sessionStorage.setItem("usuario", JSON.stringify(usuario));

    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    document.getElementById("cuentaUsuario").textContent = usuario.cuentaBancaria;
    actualizarSaldo();
});

function actualizarSaldo() {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (!usuario) return;

    if (document.getElementById("saldoUsuario") && document.getElementById("saldoPokemon")) {
        document.getElementById("saldoUsuario").textContent = usuario.saldoUSD.toFixed(2);
        document.getElementById("saldoPokemon").textContent = usuario.saldoPKD.toFixed(2);
    }
}

function consultarSaldo() {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    Swal.fire(`Saldo Disponible: $${usuario.saldoUSD.toFixed(2)} / ₱${usuario.saldoPKD.toFixed(2)}`);
}

function depositar() {
    Swal.fire({
        title: "Selecciona la moneda a depositar",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "💵 Dólares",
        denyButtonText: "🪙 PokéDollars",
        cancelButtonText: "❌ Cancelar",
    }).then((result) => {
        if (result.isConfirmed) ingresarMontoDeposito("usd");
        else if (result.isDenied) ingresarMontoDeposito("pkd");
    });
}

function ingresarMontoDeposito(moneda) {
    Swal.fire({
        title: "Ingresa el monto a depositar",
        input: "number",
        inputAttributes: { min: "1", step: "1" },
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            let monto = parseFloat(result.value);
            if (isNaN(monto) || monto <= 0) {
                Swal.fire("Error", "Monto inválido.", "error");
                return;
            }

            let usuario = JSON.parse(sessionStorage.getItem("usuario"));
            let montoUSD = moneda === "usd" ? monto : monto / 130;
            let montoPKD = moneda === "usd" ? monto * 130 : monto;

            usuario.saldoUSD += montoUSD;
            usuario.saldoPKD = usuario.saldoUSD * 130;
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            registrarTransaccion("Depósito", monto, moneda, "Depósito en cuenta");
            actualizarSaldo();
            Swal.fire("Depósito realizado", `Se depositó correctamente.`, "success");
        }
    });
}

function retirar() {
    Swal.fire({
        title: "Selecciona la moneda a retirar",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "💵 Dólares",
        denyButtonText: "🪙 PokéDollars",
        cancelButtonText: "❌ Cancelar",
    }).then((result) => {
        if (result.isConfirmed) ingresarMontoRetiro("usd");
        else if (result.isDenied) ingresarMontoRetiro("pkd");
    });
}

function ingresarMontoRetiro(moneda) {
    Swal.fire({
        title: "Ingresa el monto a retirar (Denominaciones de 5 en 5)",
        input: "number",
        inputAttributes: { min: "5", step: "5" },
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            let monto = parseFloat(result.value);
            if (isNaN(monto) || monto <= 0 || monto % 5 !== 0) {
                Swal.fire("Error", "Solo se pueden retirar montos en múltiplos de 5.", "error");
                return;
            }

            let usuario = JSON.parse(sessionStorage.getItem("usuario"));
            let montoUSD = moneda === "usd" ? monto : monto / 130;
            let montoPKD = moneda === "usd" ? monto * 130 : monto;

            if ((moneda === "usd" && usuario.saldoUSD < montoUSD) || (moneda === "pkd" && usuario.saldoPKD < montoPKD)) {
                Swal.fire("Error", "Fondos insuficientes.", "error");
                return;
            }

            usuario.saldoUSD -= montoUSD;
            usuario.saldoPKD = usuario.saldoUSD * 130;
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            registrarTransaccion("Retiro", monto, moneda, "Retiro de cuenta");
            actualizarSaldo();
            Swal.fire("Retiro realizado", `Se retiró correctamente.`, "success");
        }
    });
}

function pagarServicios() {
    Swal.fire({
        title: "Selecciona el servicio a pagar",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "💧 Agua Potable",
        denyButtonText: "⚡ Energía Eléctrica",
        cancelButtonText: "❌ Cancelar",
        footer: `
            <button class="swal2-confirm swal2-styled" onclick="ingresarMontoPago('internet')">🌐 Internet</button>
            <button class="swal2-confirm swal2-styled" onclick="ingresarMontoPago('telefono')">📞 Telefonía</button>
        `,
    }).then((result) => {
        if (result.isConfirmed) ingresarMontoPago("agua");
        else if (result.isDenied) ingresarMontoPago("luz");
    });
}

function ingresarMontoPago(servicio) {
    Swal.fire({
        title: "Selecciona la moneda de pago",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "💵 Dólares",
        denyButtonText: "🪙 PokéDollars",
        cancelButtonText: "❌ Cancelar",
    }).then((result) => {
        if (result.isConfirmed) confirmarPago(servicio, "usd");
        else if (result.isDenied) confirmarPago(servicio, "pkd");
    });
}

function confirmarPago(servicio, moneda) {
    Swal.fire({
        title: "Ingresa el monto a pagar",
        input: "number",
        inputAttributes: { min: "1", step: "1" },
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            let monto = parseFloat(result.value);
            if (isNaN(monto) || monto <= 0) {
                Swal.fire("Error", "Monto inválido.", "error");
                return;
            }

            let usuario = JSON.parse(sessionStorage.getItem("usuario"));
            usuario.saldoUSD -= monto;
            usuario.saldoPKD = usuario.saldoUSD * 130;
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            registrarTransaccion("Pago de Servicio", monto, moneda, `Pago de ${servicio}`);
            actualizarSaldo();
            Swal.fire("Pago realizado", `Se pagó correctamente.`, "success");
        }
    });
}

function registrarTransaccion(tipo, monto, moneda, descripcion) {
    let historial = JSON.parse(sessionStorage.getItem("historial")) || [];
    let fecha = new Date().toLocaleString();

    let transaccion = {
        fecha: fecha,
        tipo: tipo,
        monto: monto.toFixed(2),
        moneda: moneda,
        descripcion: descripcion
    };

    historial.push(transaccion);
    sessionStorage.setItem("historial", JSON.stringify(historial));
}

function verHistorial() {
    window.location.href = "historial.html";
}

function mostrarModalCerrarSesion() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres cerrar sesión y salir del Pokémon Bank?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            cerrarSesion();
        }
    });
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
function verGraficos() {
    window.location.href = "graficos.html";
}