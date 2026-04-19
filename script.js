
// API 
const API_URL = "http://localhost:3000/pay";

// DOM ELEMENTS

const itemsContainer = document.getElementById("items-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const addItemForm = document.querySelectorAll("form")[0];
const bookingForm = document.getElementById("bookingForm");

// STATE
let items = [];
let selectedItem = null;

// ADD ITEM
addItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
 const name = document.getElementById("itemName").value.trim();
const category = document.getElementById("itemcategory").value;
const price = Number(document.getElementById("itemPrice").value);
const exchange = document.getElementById("itemExchange").value;
const description = document.getElementById("itemDescription").value;

    if (!name || !price || price <= 0) {
        alert("Please enter valid item name and price");
        return;
    }
    items.push({ name, category, price, exchange, description });
    displayItems(items);
    addItemForm.reset();
});
// DISPLAY ITEMS
function displayItems(data) {
    itemsContainer.innerHTML = "";

    if (!data.length) {
        itemsContainer.innerHTML = "<p>No items found</p>";
        return;
    }

data.forEach((item, index) => {
itemsContainer.innerHTML += `
<div style="border:1px solid gray; margin:10px; padding:10px;">
     <h3>${item.name}</h3>
    <p>Category: ${item.category}</p>
     <p>Price: ${item.price}</p>
     <p>${item.description}</p>

        <button onclick="bookItem(${index})">Book</button>
        </div>
        `;
    });
}
displayItems(items);
// SEARCH + FILTER
searchInput.addEventListener("input", filterItems);
categorySelect.addEventListener("change", filterItems);

function filterItems() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categorySelect.value;

    const filtered = items.filter(item => {
    const matchName = item.name.toLowerCase().includes(searchValue);
    const matchCategory =
         categoryValue === "All" || item.category === categoryValue;
    })};
function bookItem(index) {
    selectedItem = items[index];
    if (!selectedItem) return;
    alert(
    "Selected Item:\n" +
    selectedItem.name +
    "\nPrice: " + selectedItem.price
 );
}

// BOOKING FORM

bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const quantity = Number(document.getElementById("quantity").value);

    if (!name || !phone) {
        alert("Please fill in all customer details");
        return;
    }
    if (!selectedItem) {
     alert("Please select an item first");
        return;
    }
    if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }
    const totalAmount = quantity * selectedItem.price;

    alert(
        "Booking Confirmed!\n" +
        "Name: " + name +
        "\nItem: " + selectedItem.name +
        "\nTotal: " + totalAmount
    );

    payWithMpesa(phone, totalAmount);
});

// PAYMENT FUNCTION (M-PESA API)
async function payWithMpesa(phone, amount) {
    try {
        alert("Processing payment...");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
     },
        body: JSON.stringify({ phone, amount })
    });
    const data = await response.json();

     if (!response.ok) {
        throw new Error(data.message || "Payment failed");
     }
        alert(data.message || "Payment request sent successfully");

    } catch (error) {
        alert("Error: " + error.message);
    }
}

// CONTACT FORM (ALERT VERSION)
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
        alert("Please fill all fields");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
         body: JSON.stringify({ name, email, phone, message })
    });
        const data = await response.json();

        alert(data.message);
        document.getElementById("contactForm").reset();
    } catch (error) {
        alert("Error sending message");
    }
});

// CONTACT FORM (MESSAGE )
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const messageBox = document.getElementById("formMessage");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    messageBox.innerHTML = "";

    if (!name || !email || !phone || !message) {
        messageBox.innerHTML = "❌ Please fill all fields";
        messageBox.style.color = "red";
        return;
    }

    try {
     const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone, message })
    });

     const data = await response.json();

    if (response.ok) {
    messageBox.innerHTML = "✅ " + data.message;
    messageBox.style.color = "green";

     document.getElementById("contactForm").reset();
    } else {
         messageBox.innerHTML = "❌ " + data.message;
         messageBox.style.color = "red";
    }

    } catch (error) {
        messageBox.innerHTML = "❌ Server error. Try again.";
        messageBox.style.color = "red";
    }
});