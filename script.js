let carrito = new Array();
let cantidadItems = 0;
let precioTotal = 0;
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const carritoHover = document.querySelector('#carrito');
const producto = document.querySelectorAll('#store-card');
console.log(producto)


carritoHover.addEventListener('click', quitarProducto);

document.addEventListener('DOMContentLoaded', () => {
	carrito = JSON.parse(localStorage.getItem('carrito')) || [];


	mostrarCarrito();
});

  for (let i = 0; i < producto.length; i++){

      producto[i].addEventListener('click', agregarProducto)
      console.log('CICLO FOR')
  }

function agregarProducto(e) {
    console.log('AGREGANDO CLICKS')
    e.preventDefault();
    // obtenerDatos(e.target.parentElement);
	if (e.target.classList.contains('botonTienda')){

		const productoElegido = e.target.parentElement.parentElement;
		obtenerDatos(productoElegido);
	}
}

function obtenerDatos(producto){
    console.log(producto)
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('#tituloProducto').textContent,
        precio: producto.querySelector('#precioProducto').textContent,
        id: producto.getAttribute('data-id'),
		cantidad: 1
    }
    
    console.log(productoAgregado)

    const existe = carrito.some(producto => producto.id == productoAgregado.id)
    
    if (existe) {
		
		const productos = carrito.map(producto => {
			if (producto.id === productoAgregado.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});
		carrito = [...productos];
	} else {
		
		carrito.push(productoAgregado);
	}

	mostrarCarrito();
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {

	
	limpiarCarrito();

	
	carrito.forEach(producto => {

		const { imagen, nombre, precio, cantidad, id } = producto;

		const row = document.createElement('tr');
		row.classList.add('fila-carrito')
		row.innerHTML = `
			<td style="color: black;">
				<img src="${imagen}" class="carrito-img">
			</td>
			<td style="color: black;">
				${nombre}
			</td>
			<td style="color: black;">
				${precio}
			</td> 
			<td style="color: black;">
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto" data-id="${id}"> X </a>
			</td>
      	`
		contenedorCarrito.appendChild(row);
	});
}

function limpiarCarrito() {
	

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

function quitarProducto(e) {
	if (e.target.classList.contains('borrar-producto')) {
		const productoId = e.target.getAttribute('data-id');

		/* Filtro los productos del carrito */
		carrito = carrito.filter(producto => producto.id != productoId);

		/* Renderizo el nuevo carrito */
		mostrarCarrito();

		/* Actualizamos el storage */
		localStorage.setItem('carrito', JSON.stringify(carrito));
	}
}
////--------OBJETOS PARA USAR PROXIMAMENTE-------------
function Compra(productos, importe, metodoDePago,cantCuotas){
    this.productos      = productos;
    this.importe        = importe;
    this.metodoDePago   = metodoDePago;
    this.cantCuotas     = cantCuotas;
    financiar = function(){
        if (this.metodoDePago = 'C' && this.cantCuotas > 1){
            importe = importe/cantCuotas
        }
    }
    recibo = function(){
        

        return `Productos ${Array.from(productos.nombre)}\n Importe final = ${importe} en ${cantCuotas}` 
    }
}

function Noticia(titulo, subtitulo, cuerpo, imagenes, autor){
    this.titulo     = titulo;
    this.subtitulo  = subtitulo;
    this.cuerpo     = cuerpo;
    this.imagenes   = imagenes;
    this.autor      = autor;
}




////--------------------------------------------------------
