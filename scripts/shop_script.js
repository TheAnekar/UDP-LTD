// Sample data for categories and products
const categories = [
    { id: 1, name: 'Electronics', image: 'img/electronics.jpg' },
    { id: 2, name: 'Fashion', image: 'img/fashion.jpg' },
    { id: 3, name: 'Home Appliances', image: 'img/homea.jpg' }
];

const products = [
    { id: 1, name: 'Smart Watch', price: 89.99*83, image: 'img/product2.jpeg', category_id: 1 },
    { id: 2, name: 'Bluetooth Speaker', price: 29.99*83, image: 'img/product3.jpeg', category_id: 1 },
    { id: 3, name: 'Laptop Stand', price: 19.99*83, image: 'img/product4.jpeg', category_id: 1 },
    { id: 4, name: 'USB-C Hub', price: 39.99*83, image: 'img/product5.jpeg', category_id: 1 },
    { id: 5, name: 'Portable Charger', price: 24.99*83, image: 'img/product6.jpeg', category_id: 1 },
    { id: 6, name: 'Wireless Mouse', price: 14.99*83, image: 'img/product7.jpeg', category_id: 1 },
    { id: 7, name: 'Gaming Keyboard', price: 59.99*83, image: 'img/product8.jpeg', category_id: 1 },
    { id: 8, name: 'HDMI Cable', price: 9.99*83, image: 'img/product9.jpeg', category_id: 1 },
    { id: 9, name: 'Webcam', price: 49.99*83, image: 'img/product10.jpeg', category_id: 1 },
    { id: 10, name: 'Wireless Headphones', price: 49.99*83, image: 'img/product1.jpeg', category_id: 1 },

     
     { id: 11, name: "Men's T-Shirt", price: 19.99*83, image: 'img/fashion1.jpeg', category_id: 2 },
     { id: 12, name: "Women's Summer Dress", price: 29.99*83, image: 'img/fashion2.jpeg', category_id: 2 },
     { id: 13, name: "Men's Jeans", price: 39.99*83, image: 'img/fashion3.jpeg', category_id: 2 },
     { id: 14, name: "Women's Handbag", price: 49.99*83, image: 'img/fashion4.jpeg', category_id: 2 },
     { id: 15, name: "Men's Sneakers", price: 59.99*83, image: 'img/fashion5.jpeg', category_id: 2 },
     { id: 16, name: "Women's Sandals", price: 24.99*83, image: 'img/fashion6.jpeg', category_id: 2 },
     { id: 17, name: "Unisex Sunglasses", price: 14.99*83, image: 'img/fashion7.jpeg', category_id: 2 },
     { id: 18, name: "Men's Jacket", price: 79.99*83, image: 'img/fashion8.jpeg', category_id: 2 },
     { id: 19, name: "Women's Scarf", price: 12.99*83, image: 'img/fashion9.jpeg', category_id: 2 },
     { id: 20, name: "Fashion Watch", price: 34.99*83, image: 'img/fashion10.jpeg', category_id: 2 },
 
     { id: 21, name: 'Air Conditioner', price: 399.99*83, image: 'img/home1.jpeg', category_id: 3 },
     { id: 22, name: 'Washing Machine', price: 499.99*83, image: 'img/home2.jpeg', category_id: 3 },
     { id: 23, name: 'Refrigerator', price: 599.99*83, image: 'img/home3.jpeg', category_id: 3 },
     { id: 24, name: 'Microwave Oven', price: 149.99*83, image: 'img/home4.jpeg', category_id: 3 },
     { id: 25, name: 'Vacuum Cleaner', price: 129.99*83, image: 'img/home5.jpeg', category_id: 3 },
     { id: 26, name: 'Electric Kettle', price: 29.99*83, image: 'img/home6.jpeg', category_id: 3 },
     { id: 27, name: 'Blender', price: 49.99*83, image: 'img/home7.jpeg', category_id: 3 },
     { id: 28, name: 'Toaster', price: 24.99*83, image: 'img/home8.jpeg', category_id: 3 },
     { id: 29, name: 'Ceiling Fan', price: 89.99*83, image: 'img/home9.jpeg', category_id: 3 },
     { id: 30, name: 'Coffee Maker', price: 79.99*83, image: 'img/home10.jpeg', category_id: 3 }
 
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
