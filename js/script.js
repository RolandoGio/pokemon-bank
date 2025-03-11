$(document).ready(function(){
    // Mensaje cuando se haga clic en una categoría
    $(".list-group-item").click(function(){
        alert("Feature coming soon!");
    });

    // Simulación de búsqueda
    $(".btn-dark").click(function(){
        let searchQuery = $(".search-bar").val();
        if (searchQuery === "") {
            alert("Por favor, ingrese un término de búsqueda.");
        } else {
            alert("Buscando: " + searchQuery);
            // Aquí podrías hacer una petición AJAX o redirigir a otra página
        }
    });
});
