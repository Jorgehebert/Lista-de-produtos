class Product {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
    increaseQuantity(amount) {
        this.quantity += amount;
    }
    decreaseQuantity(amount) {
        if (this.quantity - amount >= 0) {
            this.quantity -= amount;
        }
    }
}
let products = [];
let productId = 1;

function addProduct(name, quantity) {
    const newProduct = new Product(productId++, name, quantity);
    products.push(newProduct);
    renderProducts();
}

function removeProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
}

function increaseQuantity(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        product.increaseQuantity(1);
        renderProducts();
    }
}
function decreaseQuantity(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        product.decreaseQuantity(1);
        renderProducts();
    }
}

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 

    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="product-name">${product.name}</span> - 
            <span class="product-quantity">${product.quantity}</span>
            <button onclick="increaseQuantity(${product.id})">Aumentar</button>
            <button onclick="decreaseQuantity(${product.id})">Diminuir</button>
            <button onclick="removeProduct(${product.id})">Remover</button>
        `;
        productList.appendChild(li);
    });
}

document.getElementById("add-product-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("product-name");
    const quantityInput = document.getElementById("product-quantity");

    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value, 10);

    if (name && quantity > 0) {
        addProduct(name, quantity);
        nameInput.value = ""; 
        quantityInput.value = "";
    } else {
        alert("Por favor, insira um nome válido e quantidade positiva.");
    }
});