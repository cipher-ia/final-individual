let baseUrl = "http://localhost:8080/productos";
let carrito = [];


function mostrarMensaje(mensaje, tipo) {
    $("#mensaje")
        .removeClass("d-none alert-success alert-danger alert-warning")
        .addClass(`alert alert-${tipo}`)
        .html(mensaje);
}


function cargarProductos() {
    $.ajax({
        url: baseUrl,
        method: "GET",
        success: function (productos) {
            $("#productoSeleccionado").empty(); 
            productos.forEach(p => {
                $("#productoSeleccionado").append(
                    `<option value="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-stock="${p.cantidad}">
                        ${p.nombre} - €${p.precio} (Stock: ${p.cantidad})
                    </option>`
                );
            });
        },
        error: function () {
            mostrarMensaje("Error al cargar productos.", "danger");
        }
    });
}


$(document).on("click", "#agregarCarrito", function () {
    let idProducto = $("#productoSeleccionado").val();
    let nombreProducto = $("#productoSeleccionado option:selected").data("nombre");
    let cantidad = parseInt($("#cantidadProducto").val());

    if (!idProducto || cantidad <= 0) {
        mostrarMensaje("Seleccione un producto y cantidad válida.", "warning");
        return;
    }

    
    let existente = carrito.find(p => p.id == idProducto);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ id: idProducto, nombre: nombreProducto, cantidad });
    }

    actualizarCarrito();
    mostrarMensaje("Producto añadido al carrito.", "success");
});


function actualizarCarrito() {
    let contenedor = $("#carritoProductos").empty();
    carrito.forEach(producto => {
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


$(document).on("click", ".quitarProducto", function () {
    let idProducto = $(this).closest(".col-md-4").data("id");
    carrito = carrito.filter(p => p.id != idProducto);
    actualizarCarrito();
    mostrarMensaje("Producto eliminado del carrito.", "warning");
});


$(document).on("click", "#realizarCompra", function () {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío.", "warning");
        return;
    }

    let exitos = [];
    let fallos = [];

    (async function procesarCompras() {
        for (let producto of carrito) {
            try {
                await $.ajax({
                    url: `${baseUrl}/${producto.id}/compra`,
                    method: "POST",
                });
                exitos.push(producto.nombre);
            } catch (error) {
                fallos.push(producto.nombre);
            }
        }

        mostrarMensaje(`
            <strong>Compra realizada:</strong><br>
            Exitosos: ${exitos.join(", ") || "Ninguno"}<br>
            Fallidos: ${fallos.join(", ") || "Ninguno"}
        `, "info");

        carrito = [];
        actualizarCarrito();
    })();
});


$("#recargar").on("click", function () {
    $("#recargar ul").empty(); 
    $("#productoSeleccionado option").each(function () {
        if ($(this).val()) { 
            $("#recargar ul").append(`<li>${$(this).text()}</li>`);
        }
    });
});
cargarProductos();