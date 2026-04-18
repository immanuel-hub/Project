const { createElement } = require("react");

let container = document.getElementById("items-container");
fetch ("https://dummyjson.com/products")
.then(response => response.json())
.then(data => {
    displayItems(data.products);
});
