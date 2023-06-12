const request = require('supertest');
const app = require('../../../app').app;
const Product = require('../../models/product');

const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
});


afterAll(async () => {
    await mongoose.disconnect();
});


const productOne = {
    name: "Product one",
    description: "Desc one",
    imageUrl: "yada",
    price: 500

};
const productTwo = {
    name: "Product two",
    description: "Desc two",
    imageUrl: "ogeis",
    price: 200

};



describe("GET /products", () => {
    it("should return all products in database", async () => {
        await Product.deleteMany();
        await Product.create(productOne);
        await Product.create(productTwo);

        const response = await request(app).get('/products');
        expect(response.status).toBe(200);

        const products = response.body.products;

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toEqual(2);
        expect(products).toEqual(
            expect.arrayContaining([expect.objectContaining(productOne)]),
            expect.arrayContaining([expect.objectContaining(productTwo)])
        )
    });
});

describe("POST /products", () => {
    it("should create a new product and return a created status code", async () => {
        const response = await request(app).post('/products').send(productOne);

        expect(response.statusCode).toBe(201);
        expect(response.body.productSaved).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                name: productOne.name,
                description: productOne.description,
                imageUrl: productOne.imageUrl,
                price: productOne.price
            })
        );
        await Product.findByIdAndDelete(response.body.productSaved._id);
    });

    it("should return a 400 code and an error message when required fields are missing", async () => {
        const { description, ...incompleteProduct } = productOne;
        const response = await request(app).post("/products").send(incompleteProduct);

        expect(response.statusCode).toBe(400);
        expect(response.error.text).toContain("Couldn't create product");

    });
});