// Cuando la página carga, verificamos si hay un usuario en sessionStorage
// Si no hay usuario, lo redirigimos al login

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

    // BLOQUEAR COMPLETAMENTE EL BOTÓN ATRÁS
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.pushState(null, null, location.href);
    };
});

// Función para cerrar sesión
function cerrarSesion() {
    sessionStorage.clear(); // Borra los datos del usuario
    window.location.href = "index.html"; // Redirige al login
}