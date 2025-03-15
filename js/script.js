document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    const usuarios = {
        "1234": { nombre: "Brendan (ユウキ)", cuenta: "Pokémon Zafiro", cuentaBancaria: "0001-1234-5678" },
        "2222": { nombre: "May (ハルカ)", cuenta: "Pokémon Rubí", cuentaBancaria: "0002-2222-5678" },
        "3333": { nombre: "Brock (タケシ)", cuenta: "Líder de Gimnasio Pewter", cuentaBancaria: "0003-3333-5678" }
    };

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let pin = document.getElementById("pin").value;

        if (!/^\d{4}$/.test(pin)) {
            mostrarModalError("¡Código incorrecto! Los entrenadores Pokémon solo usan códigos de 4 dígitos.");
            return;
        }

        if (usuarios[pin]) {
            let usuario = usuarios[pin];
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            document.getElementById("modalBody").innerHTML = `
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Cuenta:</strong> ${usuario.cuenta}</p>
                <p><strong>Número de Cuenta:</strong> ${usuario.cuentaBancaria}</p>
            `;

            $("#userModal").modal("show");

            document.getElementById("continueBtn").addEventListener("click", function () {
                window.location.href = "dashboard.html";
            });
        } else {
            mostrarModalError("¡Entrenador no encontrado! Parece que no tienes una Pokédex registrada en nuestro banco.");
        }
    });
});

// Función para mostrar el modal de error
function mostrarModalError(mensaje) {
    document.getElementById("errorModalBody").innerHTML = `<p>${mensaje}</p>`;
    $("#errorModal").modal("show");
}