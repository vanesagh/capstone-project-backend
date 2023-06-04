const Chance = require('chance');

// What is going to be tested
const ProductController = require("../product");

// Dependencies
const ProductService = require("../../services/products");

const chance = new Chance();


// Mock dependencies
jest.mock("../../services/products");


describe("when calling update product controller", () => {
    let id, productData, updatedProduct, req, res;

    beforeEach(() => {
        id = chance.guid();
        productData = {
            name: chance.string(),
            description: chance.string(),
            imageUrl: chance.string(),
            price: chance.integer(),
        };

        updatedProduct = productData;
        req = {
            params: { id },
            body: productData,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        global.console = { log: jest.fn(), error: jest.fn() };

        ProductService.updateProduct = jest.fn().mockResolvedValue(updatedProduct);
    });
    it("should call ProductService.updateProduct with id and productData", async () => {
        // Act
        await ProductController.updateProduct(req, res);

        // Assert
        expect(ProductService.updateProduct).toHaveBeenCalledWith(id, productData);
    });

    it("should call res.status with a 200 status", async () => {
        // Act
        await ProductController.updateProduct(req, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call res.json with the updated productData", async () => {
        // Act
        await ProductController.updateProduct(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(updatedProduct);

    });

    it("should call res.status with 500 when ProductService.updateProduct fails", async () => {
        // Arrange
        const error = new Error();
        ProductService.updateProduct = jest.fn().mockRejectedValue(error);

        // Act
        await ProductController.updateProduct(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);

    });

});