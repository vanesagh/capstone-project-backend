const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ProductRoutes = require('./src/routes/products');
const CustomerOrderRoutes = require('./src/routes/customerOrders');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/products", ProductRoutes);
app.use("/customerOrders", CustomerOrderRoutes);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

    } catch (error) {
        console.log("Failed to connect to Mongo", error);

    }
};

const server = app.listen(port, () => {
    console.log(`Server is running in ${port}`);
    connectDB();

});

module.exports = { app, server };





