const Chance = require('chance');

// What is going to be tested
const ProductController = require("../product");

// Dependencies
const ProductService = require("../../services/products");

const chance = new Chance();


// Mock dependencies
jest.mock("../../services/products");


describe("when calling delete product controller", () => {
    let id, req, res;

    beforeEach(() => {
        id = chance.guid();

        req = {
            params: { id },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        global.console = { log: jest.fn(), error: jest.fn() };

        ProductService.deleteProduct = jest.fn().mockReturnThis();
    });
    it("should call ProductService.deleteProduct with id ", async () => {
        // Act
        await ProductController.deleteProduct(req, res);

        // Assert
        expect(ProductService.deleteProduct).toHaveBeenCalledWith(id);
    });

    it("should call res.status with a 204 status", async () => {
        // Act
        await ProductController.deleteProduct(req, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
    });



    it("should call res.status with 500 when ProductService deleteProduct fails", async () => {
        // Arrange
        const error = new Error();
        ProductService.deleteProduct = jest.fn().mockRejectedValue(error);

        // Act
        await ProductController.deleteProduct(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);

    });

});