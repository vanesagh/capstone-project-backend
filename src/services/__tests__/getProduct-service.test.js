const Chance = require('chance');

// Dependencies
const ProductService = require("../products");
const Product = require("../../models/product");

const chance = new Chance();

// Adding mock
jest.mock("../../models/product");

describe("when calling getProducts service method", () => {

    beforeEach(() => {
        Product.find = jest.fn().mockReturnThis();
        Product.lean = jest.fn().mockReturnThis();
        Product.exec = jest.fn().mockReturnThis();

    });

    it("should call Product.find", async () => {
        await ProductService.getProducts();

        expect(Product.find).toBeCalled();
    });

    it("should call Product.lean", async () => {
        await ProductService.getProducts();
        expect(Product.lean).toBeCalled();

    });

    it("should call Product.exec", async () => {
        await ProductService.getProducts();
        expect(Product.exec).toBeCalled();

    });

});


describe("When calling getProductById", () => {
    let id;
    beforeEach(() => {
        id = chance.guid();

        Product.findById = jest.fn().mockReturnThis();
        Product.lean = jest.fn().mockReturnThis();
        Product.exec = jest.fn().mockReturnThis();

    });

    it("should call Product.findById with id", async () => {
        await ProductService.getProductById(id);

        expect(Product.findById).toBeCalledWith(id);
    });

    it("should call Product.lean", async () => {
        await ProductService.getProductById(id);
        expect(Product.lean).toBeCalled();

    });

    it("should call Product.exec", async () => {
        await ProductService.getProductById(id);
        expect(Product.exec).toBeCalled();

    });


});