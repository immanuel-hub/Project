const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
    res.send("Server working");
});
// ITEMS API (IMAGES)
app.get("/items", (req, res) => {
    res.json([
        {
            name: "Sofa",
            category: "Furniture",
            price: 15000,
            description: "Nice sofa",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
        },
        {
            name: "TV",
            category: "Electronics",
            price: 30000,
            description: "Smart TV",
            image: "https://images.unsplash.com/photo-1593784991095-a205069470b6"
        }
    ]);
});

// PAYMENT
app.post("/pay", (req, res) => {
    res.json({ message: "Payment simulated" });
});
app.listen(3000, () => console.log("Running on 3000"));