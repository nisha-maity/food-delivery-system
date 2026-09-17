// Food Delivery System - JavaScript

let cart = [];

const menus = {

    "Pizza Palace": [
        ["Margherita Pizza", 249],
        ["Farmhouse Pizza", 299],
        ["Garlic Bread", 149]
    ],

    "Spice Kitchen": [
        ["Veg Biryani", 229],
        ["Paneer Butter Masala", 249],
        ["Veg Hakka Noodles", 179]
    ],

    "Burger House": [
        ["Classic Burger", 199],
        ["Cheese Burger", 229],
        ["French Fries", 129]
    ]

};


// Search
function searchRestaurant() {

    let text =
        document.getElementById("searchBox").value
        .toLowerCase()
        .trim();

    let message =
        document.getElementById("message");

    if (!text) {
        message.textContent =
            "Please enter something to search.";
        return;
    }

    let results =
        Object.keys(menus).filter(restaurant =>
            restaurant.toLowerCase().includes(text) ||
            menus[restaurant].some(food =>
                food[0].toLowerCase().includes(text)
            )
        );

    message.innerHTML = results.length
        ? "🔎 Found: <strong>" +
          results.join(", ") +
          "</strong>"
        : "No restaurants found.";

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// View restaurant menu
function viewMenu(restaurant) {

    let message =
        document.getElementById("message");

    let html =
        `<div class="cart-box">
            <h2>🍴 ${restaurant} Menu</h2>`;

    menus[restaurant].forEach(food => {

        html += `
            <div class="menu-item">

                <span>
                    <strong>${food[0]}</strong>
                    <br>
                    ₹${food[1]}
                </span>

                <button
                    onclick="addToCart('${food[0]}', ${food[1]})">
                    + Add
                </button>

            </div>
        `;
    });

    message.innerHTML =
        html + "</div>";

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// View all restaurants
function viewAllRestaurants() {

    let message =
        document.getElementById("message");

    message.innerHTML = `
        <div class="cart-box">

            <h2>🍴 All Restaurants</h2>

            <div class="menu-item">
                <span>🍕 Pizza Palace</span>
                <strong>★ 4.8</strong>
            </div>

            <div class="menu-item">
                <span>🍛 Spice Kitchen</span>
                <strong>★ 4.7</strong>
            </div>

            <div class="menu-item">
                <span>🍔 Burger House</span>
                <strong>★ 4.6</strong>
            </div>

        </div>
    `;

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// Add item to cart
function addToCart(name, price) {

    let item =
        cart.find(i => i.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}


// Update cart count
function updateCart() {

    let count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).textContent = count;
}


// Open cart
function openCart() {

    let message =
        document.getElementById("message");

    if (!cart.length) {

        message.innerHTML = `
            <div class="cart-box">

                <h2>🛒 Your Cart</h2>

                <p>Your cart is empty.</p>

            </div>
        `;

        return;
    }

    let subtotal = 0;

    let html = `
        <div class="cart-box">

            <h2>🛒 Your Cart</h2>
    `;

    cart.forEach((item, index) => {

        let total =
            item.price * item.quantity;

        subtotal += total;

        html += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <p>
                        ₹${item.price} ×
                        ${item.quantity}
                    </p>
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQty(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQty(${index}, 1)">
                        +
                    </button>

                </div>

                <strong>
                    ₹${total}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    let delivery =
        subtotal >= 499 ? 0 : 40;

    html += `
        <div class="cart-summary">

            <div>
                <span>Subtotal</span>
                <strong>₹${subtotal}</strong>
            </div>

            <div>
                <span>Delivery Fee</span>
                <strong>
                    ${delivery === 0
                        ? "FREE"
                        : "₹40"}
                </strong>
            </div>

            <hr>

            <div class="grand-total">

                <span>Total</span>

                <strong>
                    ₹${subtotal + delivery}
                </strong>

            </div>

        </div>


        <div class="cart-actions">

            <button onclick="closeCart()">
                Continue Shopping
            </button>

            <button
                class="checkout-btn"
                onclick="checkout()">
                Proceed to Checkout →
            </button>

        </div>

        </div>
    `;

    message.innerHTML = html;

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// Change quantity
function changeQty(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
    openCart();
}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
    openCart();
}


// Checkout
function checkout() {

    let message =
        document.getElementById("message");

    message.innerHTML = `
        <div class="checkout-box">

            <h2>💳 Checkout</h2>

            <label>
                Delivery Address
            </label>

            <input
                id="address"
                type="text"
                placeholder="Enter your delivery address"
            >

            <button
                class="checkout-btn"
                onclick="placeOrder()">
                Place Order
            </button>

        </div>
    `;

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// Place order
function placeOrder() {

    let address =
        document.getElementById(
            "address"
        ).value.trim();

    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        return;
    }

    let orderId =
        "FD" +
        Math.floor(
            10000 +
            Math.random() * 90000
        );

    cart = [];

    updateCart();

    document.getElementById(
        "message"
    ).innerHTML = `

        <div class="order-success">

            <h2>
                🎉 Order Placed Successfully!
            </h2>

            <p>
                Order ID:
                <strong>${orderId}</strong>
            </p>

            <p>
                📍 ${address}
            </p>

            <p>
                🚴 Your food is being prepared.
            </p>

        </div>
    `;
}


// Close message
function closeCart() {

    document.getElementById(
        "message"
    ).innerHTML = "";
}


// Cart button
document
    .querySelector(".cart-btn")
    .onclick = openCart;