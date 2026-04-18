
const container = document.getElementById("items-container");

function loadItems(){
    fetch("https://dummyjson.com/products")
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        displayItems(data.products);
    });
}
