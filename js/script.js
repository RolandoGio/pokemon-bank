document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let pin = document.getElementById("pin").value;

        // Validar que el PIN tenga exactamente 4 dígitos y solo números
        if (/^\d{4}$/.test(pin)) {
            alert("Acceso permitido. Redirigiendo...");
            window.location.href = "dashboard.html"; // Redirige al panel principal
        } else {
            alert("Error: El PIN debe contener exactamente 4 números.");
        }
    });
});
