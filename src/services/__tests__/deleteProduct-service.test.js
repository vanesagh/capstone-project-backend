const Chance = require('chance');

// Dependencies
const ProductService = require("../products");
const Product = require("../../models/product");

const chance = new Chance();

// Adding mock
jest.mock("../../models/product");

describe("when calling the product service method", () => {
    let id;

    beforeEach(() => {

        id = chance.guid();

        Product.findByIdAndDelete = jest.fn().mockReturnThis();
        Product.exec = jest.fn().mockReturnThis();

    });

    it("should call Product.findByIdAndDelete with id", async () => {
        await ProductService.deleteProduct(id);

        expect(Product.findByIdAndDelete).toBeCalledWith(id);
    });



    it("should call Product.exec", async () => {
        await ProductService.deleteProduct(id);
        expect(Product.exec).toBeCalled();

    });




});