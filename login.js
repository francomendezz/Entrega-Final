// LOGIN

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const error = document.getElementById("error");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = document.getElementById("user").value.trim();
            const pass = document.getElementById("pass").value.trim();

            error.style.color = "red";

            if (!user || !pass) {
                error.textContent = "Por favor, completa todos los campos.";
                return;
            }

            if (user === "admin" && pass === "123") {
                error.style.color = "green";
                error.textContent = "¡Ingreso exitoso! Redirigiendo...";
                setTimeout(() => window.location.href = "index.html", 1000);
            } else {
                error.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }
});


//CARRITO 

function agregarCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
    alert("Producto añadido al carrito!");
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("carrito");
    let total = 0;

    if (!contenedor) return; 

    contenedor.innerHTML = "";

    carrito.forEach((item, index) => {
        contenedor.innerHTML += `
            <div class="item-carrito">
                <p>${item.nombre} - $${item.precio}</p>
                <button onclick="eliminarItem(${index})">Quitar</button>
            </div>
        `;

        total += item.precio;
    });

    document.getElementById("total").innerText = total;
}

function eliminarItem(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let cartCount = document.getElementById("cartCount");

    if (cartCount) cartCount.textContent = carrito.length;
}

actualizarContador();

window.addEventListener("storage", actualizarContador);

if (document.getElementById("carrito")) {
    mostrarCarrito();
}
