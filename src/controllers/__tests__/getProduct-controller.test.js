const Chance = require('chance');

// What is going to be tested
const ProductController = require("../product");
const ProductService = require("../../services/products");

const chance = new Chance();


// Mock dependencies
jest.mock("../../services/products");


describe("when calling get product controller", () => {
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

        ProductService.getProductById = jest.fn().mockReturnThis();
    });
    it("should call ProductService.getProductById with id", async () => {
        // Act
        await ProductController.getProductById(req, res);

        // Assert
        expect(ProductService.getProductById).toHaveBeenCalledWith(id);
    });

    it("should call res.json with the product requested by ID", async () => {
        // Act
        await ProductController.getProductById(req, res);


        // Assert
        expect(res.json).toHaveBeenCalled();

    });

    it("should call res.status with 404 when ProductService.getProductById not found", async () => {
        // Arrange
        const error = new Error();
        ProductService.getProductById = jest.fn().mockRejectedValue(error);

        // Act
        await ProductController.getProductById(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);

    });

});

describe("When calling get products", () => {
    let res, req;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    it("should call res.json", async () => {
        // Act
        await ProductController.getProducts(req, res);
        // Assert
        expect(res.json).toHaveBeenCalled();

    });

    it("should call res.status with 500 when ProductService.getProducs fails", async () => {
        // Arrange
        const error = new Error();
        ProductService.getProducts = jest.fn().mockRejectedValue(error);

        // Act
        await ProductController.getProducts(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);

    });



});