const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ProductRoutes = require('./src/routes/products');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/products", ProductRoutes);
const port = process.env.PORT || 3001;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        app.listen(process.env.PORT);
    } catch (error) {
        console.log("Failed to connect to Mongo", error);

    }
};

const server = app.listen(port, () => {
    console.log(`Server is running in ${port}`);
    connectDB();

});

module.exports = { app, server };





