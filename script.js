const Productos= [
    {nombre: "Yogurt Vainilla Serenisima", precio:1140 },
    {nombre: "Dulce de leche Ilolay", precio:1986},
    {nombre: "Don Satur Salados", precio:693},
    {nombre: "Amster Lager x 473cc", precio:1069},
    {nombre: "Fideos mostachol arcor x500g", precio:1210},
    {nombre: "Arroz Gallo Oro 1kg", precio: 3706},
    {nombre: "Krachitos Papas Fritas x480g", precio:6340}

]

const resultado = Productos.filter((el) => el.precio < 1100)


console.log(resultado)

var contactBtn = document.getElementById("contactBtn");
      contactBtn.addEventListener("click", function() {
        Swal.fire("En este momento no contamos con esta funcion, pronto la agregaremos");
      });
      
      document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelectorAll(".card");
  
        cards.forEach(card => {
          card.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.10)";
          });
  
          card.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
          });
        });
      });

      //carrito de compras
      document.addEventListener("DOMContentLoaded", function() {
        const listaCarrito = document.querySelector("#lista-carrito");
        const total = document.querySelector("#total");
        const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
      
        // Función para cargar los productos desde el archivo JSON
        function cargarProductos() {
          fetch("productos.json")
            .then(response => response.json())
            .then(data => mostrarProductos(data))
            .catch(error => console.error("Error al cargar los productos:", error));
        }
      
        // Función para mostrar los productos en la página
        function mostrarProductos(productos) {
          productos.forEach(producto => {
            const { id, nombre, precio } = producto;
            const item = document.createElement("li");
            item.innerHTML = `
              <span>${nombre} - $${precio}</span>
              <button class="btn btn-remove" data-id="${id}">Eliminar</button>
            `;
            listaCarrito.appendChild(item);
          });
        }
      
        // Función para manejar eventos de agregar y eliminar productos
        function manejarEventos() {
          listaCarrito.addEventListener("click", e => {
            if (e.target.classList.contains("btn-remove")) {
              const id = e.target.dataset.id;
              eliminarProducto(id);
            }
          });
      
          vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
        }
      
        // Función para eliminar un producto del carrito
        function eliminarProducto(id) {
          const item = document.querySelector(`[data-id="${id}"]`).parentElement;
          item.remove();
          calcularTotal();
        }
      
        // Función para vaciar el carrito
        function vaciarCarrito() {
          while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
          }
          calcularTotal();
        }
      
        // Función para calcular el total del carrito
        function calcularTotal() {
          let totalPrecio = 0;
          const items = listaCarrito.querySelectorAll("li");
          items.forEach(item => {
            const precio = parseFloat(item.querySelector("span").textContent.split("$")[1]);
            totalPrecio += precio;
          });
          total.textContent = totalPrecio.toFixed(2);
        }
      
        // Cargar productos, mostrarlos y manejar eventos al cargar la página
        cargarProductos();
        manejarEventos();
      });
      
        