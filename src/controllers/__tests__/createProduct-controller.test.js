const Chance = require('chance');

// What is going to be tested
const ProductController = require("../product");

// Dependencies
const ProductService = require("../../services/products");

const chance = new Chance();


// Mock dependencies
jest.mock("../../services/products");


describe("when calling create product controller", () => {
    let id, productData, req, res;

    beforeEach(() => {
        id = chance.guid();
        productData = {
            name: chance.string(),
            description: chance.string(),
            imageUrl: chance.string(),
            price: chance.integer(),
        };


        req = {
            body: productData,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        global.console = { log: jest.fn(), error: jest.fn() };

        ProductService.createProduct = jest.fn().mockReturnThis();
    });
    it("should call ProductService.createProduct with req.body", async () => {
        // Act
        await ProductController.createProduct(req, res);

        // Assert
        expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
    });

    it("should call res.status with a 201 status", async () => {
        // Act
        await ProductController.createProduct(req, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should call res.json", async () => {
        // Act
        await ProductController.createProduct(req, res);

        // Assert
        expect(res.json).toHaveBeenCalled();

    });

    it("should call res.status with 400 when ProductService.createProduct fails", async () => {
        // Arrange
        const error = new Error();
        ProductService.createProduct = jest.fn().mockRejectedValue(error);

        // Act
        await ProductController.createProduct(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);

    });

});