// API
const API_URL = "http://localhost:3000/pay";

// DOM
const itemsContainer = document.getElementById("items-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const addItemForm = document.querySelectorAll("form")[0];
const bookingForm = document.getElementById("bookingForm");

// STATE
let items = [];
let selectedItem = null;

// LOAD ITEMS FROM API
async function loadItems() {
    try {
        const response = await fetch("http://localhost:3000/items");
        const data = await response.json();

        items = data;
        displayItems(items);

    } catch (error) {
        console.error("Error loading items:", error);
    }
}

loadItems();

// ADD ITEM
addItemForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemcategory").value;
    const price = Number(document.getElementById("itemPrice").value);
    const exchange = document.getElementById("itemExchange").value;
    const description = document.getElementById("itemDescription").value;

    if (!name || !price || price <= 0) {
        alert("Enter valid name and price");
        return;
    }

    items.push({ name, category, price, exchange, description });
    displayItems(items);
    addItemForm.reset();
});

// DISPLAY ITEMS (WITH IMAGES)
function displayItems(data) {
    itemsContainer.innerHTML = "";

    if (!data.length) {
        itemsContainer.innerHTML = "<p>No items found</p>";
        return;
    }

    data.forEach((item, index) => {
        itemsContainer.innerHTML += `
            <div style="border:1px solid gray; margin:10px; padding:10px;">
                <img src="${item.image}" width="150"><br><br>
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
                <p>Price: ${item.price}</p>
                <p>${item.description}</p>
                <button onclick="bookItem(${index})">Book</button>
            </div>
        `;
    });
}

// BOOK ITEM
function bookItem(index) {
    selectedItem = items[index];

    alert("Selected: " + selectedItem.name);
}

// BOOKING
bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const quantity = Number(document.getElementById("quantity").value);

    if (!selectedItem) {
        alert("Select item first");
        return;
    }

    const total = quantity * selectedItem.price;

    alert("Total: " + total);

    payWithMpesa(phone, total);
});

// PAYMENT
async function payWithMpesa(phone, amount) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount })
    });

    const data = await response.json();
    alert(data.message);
}