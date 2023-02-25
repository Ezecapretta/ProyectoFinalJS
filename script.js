const contenedorProductos = document.getElementById("contenedorProductos")

const contenedorCarrito = document.getElementById("contenedorCarrito")

const vaciarCarrito = document.getElementById("vaciarCarrito")

const contadorCarrito = document.getElementById("contadorCarrito")

const precioTotal = document.getElementById("precioTotal")

let carrito = []

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML += `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.modelo}</p>
    <p class="precioProducto">Precio: $${producto.precio}</p>
    <p id="btnAgregar">
    <button id="agregar${producto.id}" class"boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    </p>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarItemsCarrito(producto.id)
    })
})

const agregarItemsCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
        console.log(carrito)
    }
    actualizarCarrito()
    Toastify({
        text: "Producto agregado al carrito",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#EF6024",
            color: "black",
        }
        }).showToast();
}

const eliminarItemsCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML= ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarItemsCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify('carrito'))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}