document.addEventListener("DOMContentLoaded", function () {
    let usuario = sessionStorage.getItem("usuario");

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "index.html";
        return;
    }

    usuario = JSON.parse(usuario);
    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    document.getElementById("cuentaUsuario").textContent = usuario.cuentaBancaria;

    // Cargar saldo desde sessionStorage o inicializar en 1000 si no existe
    let saldo = sessionStorage.getItem("saldo") ? parseFloat(sessionStorage.getItem("saldo")) : 1000;
    sessionStorage.setItem("saldo", saldo);

    // Evitar regresar con el botón atrás
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.pushState(null, null, location.href);
    };

    // Función para consultar saldo
    window.consultarSaldo = function () {
        Swal.fire({
            title: "Saldo Disponible",
            text: `Tu saldo actual es: $${saldo.toFixed(2)}`,
            icon: "info",
            confirmButtonText: "Aceptar"
        });
    };

    // Función para depositar dinero
    window.depositar = function () {
        Swal.fire({
            title: "Depósito",
            input: "number",
            inputAttributes: {
                min: "1",
                step: "0.01"
            },
            showCancelButton: true,
            confirmButtonText: "Depositar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed && result.value > 0) {
                saldo += parseFloat(result.value);
                sessionStorage.setItem("saldo", saldo);
                Swal.fire("Depósito exitoso", `Has depositado $${result.value}`, "success");
            } else if (result.value <= 0) {
                Swal.fire("Error", "El monto debe ser mayor a 0", "error");
            }
        });
    };

    // Función para retirar dinero
    window.retirar = function () {
        Swal.fire({
            title: "Retiro",
            input: "number",
            inputAttributes: {
                min: "1",
                step: "0.01"
            },
            showCancelButton: true,
            confirmButtonText: "Retirar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let monto = parseFloat(result.value);
                if (monto > 0 && monto <= saldo) {
                    saldo -= monto;
                    sessionStorage.setItem("saldo", saldo);
                    Swal.fire("Retiro exitoso", `Has retirado $${monto}`, "success");
                } else {
                    Swal.fire("Error", "Monto inválido o saldo insuficiente", "error");
                }
            }
        });
    };

    // Función para pagar servicios
    window.pagarServicios = function () {
        Swal.fire({
            title: "Pago de Servicios",
            input: "select",
            inputOptions: {
                "Luz": 50,
                "Agua": 30,
                "Internet": 60,
                "Teléfono": 40
            },
            inputPlaceholder: "Selecciona un servicio",
            showCancelButton: true,
            confirmButtonText: "Pagar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let costo = parseFloat(result.value);
                if (saldo >= costo) {
                    saldo -= costo;
                    sessionStorage.setItem("saldo", saldo);
                    Swal.fire("Pago exitoso", `Has pagado el servicio por $${costo}`, "success");
                } else {
                    Swal.fire("Error", "Saldo insuficiente para este pago", "error");
                }
            }
        });
    };
});

// Función para cerrar sesión
function mostrarModalCerrarSesion() {
    $("#logoutModal").modal("show");
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
