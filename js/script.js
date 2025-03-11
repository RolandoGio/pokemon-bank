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
            alert("Error: El PIN debe contener exactamente 4 números.");
            return;
        }

        if (usuarios[pin]) {
            let usuario = usuarios[pin];

            // Guardar datos del usuario en sessionStorage
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            // Mostrar información en el modal
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
            alert("Error: PIN incorrecto. Intente de nuevo.");
        }
    });
});
