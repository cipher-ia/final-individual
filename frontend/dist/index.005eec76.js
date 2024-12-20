$(function() {
    const baseUrl = "http://localhost:8080/productos";
    let carrito = [];
    function cargarProductos() {
        $.get(baseUrl, function(productos) {
            productos.forEach((p)=>{
                $("#productoSeleccionado").append(`<option value="${p.id}" data-nombre="${p.nombre}">${p.nombre} - \u{20AC}${p.precio} (Stock: ${p.cantidad})</option>`);
            });
        }).fail(()=>{
            mostrarMensaje("Error al cargar productos.", "danger");
        });
    }
    function mostrarMensaje(mensaje, tipo) {
        $("#mensaje").removeClass("d-none alert-success alert-danger alert-warning").addClass(`alert alert-${tipo}`).html(mensaje);
    }
    // Añadir al carrito
    $("#agregarCarrito").on("click", function() {
        const idProducto = $("#productoSeleccionado").val();
        const nombreProducto = $("#productoSeleccionado option:selected").data("nombre");
        const cantidad = parseInt($("#cantidadProducto").val());
        if (!idProducto || cantidad <= 0) {
            mostrarMensaje("Seleccione un producto y cantidad v\xe1lida.", "warning");
            return;
        }
        // Verificar si ya existe en el carrito
        const existente = carrito.find((p)=>p.id == idProducto);
        if (existente) existente.cantidad += cantidad;
        else carrito.push({
            id: idProducto,
            nombre: nombreProducto,
            cantidad
        });
        actualizarCarrito();
        mostrarMensaje("Producto a\xf1adido al carrito.", "success");
    });
    // Actualizar vista del carrito
    function actualizarCarrito() {
        const contenedor = $("#carritoProductos").empty();
        carrito.forEach((producto)=>{
            contenedor.append(`
                <div class="col-md-4" data-id="${producto.id}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                            <button class="btn btn-danger btn-sm quitarProducto">Quitar</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }
    // Quitar producto del carrito
    $(document).on("click", ".quitarProducto", function() {
        const idProducto = $(this).closest(".col-md-4").data("id");
        carrito = carrito.filter((p)=>p.id != idProducto);
        actualizarCarrito();
        mostrarMensaje("Producto eliminado del carrito.", "warning");
    });
    // Realizar compra
    $("#realizarCompra").on("click", function() {
        if (carrito.length === 0) {
            mostrarMensaje("El carrito est\xe1 vac\xedo.", "warning");
            return;
        }
        let exitos = [];
        let fallos = [];
        carrito.forEach((producto)=>{
            $.post(`${baseUrl}/${producto.id}/compra`, function() {
                exitos.push(producto.nombre);
            }).fail(()=>{
                fallos.push(producto.nombre);
            }).always(()=>{
                if (exitos.length || fallos.length) mostrarMensaje(`
                        <strong>Compra realizada:</strong><br>
                        Exitosos: ${exitos.join(", ") || "Ninguno"}<br>
                        Fallidos: ${fallos.join(", ") || "Ninguno"}
                    `, "info");
            });
        });
        carrito = [];
        actualizarCarrito();
    });
    // Cargar productos al inicio
    cargarProductos();
});

//# sourceMappingURL=index.005eec76.js.map
