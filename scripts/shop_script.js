// Sample data for categories and products
const categories = [
    { id: 1, name: 'Electronics', image: 'img/electronics.jpg' },
    { id: 2, name: 'Fashion', image: 'img/fashion.jpg' },
    { id: 3, name: 'Home Appliances', image: 'img/home.jpg' }
];

const products = [
    { id: 101, name: 'Wireless Headphones', price: 49.99, image: 'img/product1.jpg', category_id: 1 },
    { id: 102, name: 'Smart Watch', price: 89.99, image: 'img/product2.jpg', category_id: 1 },
    { id: 103, name: 'Bluetooth Speaker', price: 29.99, image: 'img/product3.jpg', category_id: 1 },
    { id: 201, name: 'Men\'s T-Shirt', price: 19.99, image: 'img/product4.jpg', category_id: 2 },
    { id: 202, name: 'Women\'s Dress', price: 39.99, image: 'img/product5.jpg', category_id: 2 },
    { id: 301, name: 'Air Conditioner', price: 299.99, image: 'img/product6.jpg', category_id: 3 },
    { id: 302, name: 'Microwave Oven', price: 99.99, image: 'img/product7.jpg', category_id: 3 }
];

// Render categories on page load
window.onload = function() {
    const grid = document.getElementById('category-grid');
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => showProducts(cat.id, cat.name);
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}">
            <span>${cat.name}</span>
        `;
        grid.appendChild(card);
    });
};

function showProducts(categoryId, categoryName) {
    document.getElementById('categories-section').style.display = 'none';
    document.getElementById('products-section').style.display = 'block';
    document.getElementById('products-title').textContent = categoryName;

    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    const filtered = products.filter(prod => prod.category_id === categoryId);
    if (filtered.length === 0) {
        grid.innerHTML = '<p>No products found in this category.</p>';
        return;
    }
    filtered.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}">
            <div class="product-title">${prod.name}</div>
            <div class="product-price">$${prod.price.toFixed(2)}</div>
            <button onclick="addToCart(${prod.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function backToCategories() {
    document.getElementById('categories-section').style.display = 'block';
    document.getElementById('products-section').style.display = 'none';
}

// Placeholder for cart functionality
function addToCart(productId) {
    alert('Added product ' + productId + ' to cart!');
}
