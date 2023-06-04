const Chance = require('chance');

// Dependencies
const ProductService = require("../products");
const Product = require("../../models/product");

const chance = new Chance();

// Adding mock
jest.mock("../../models/product");

describe("when calling the product service method", () => {
    let id, productData, updatedProduct;

    beforeEach(() => {
        id = chance.guid();
        productData = {
            name: chance.string(),
            descricption: chance.string(),
            imageUrl: chance.string(),
            price: chance.integer()
        };

        updatedProduct = productData;

        Product.findByIdAndUpdate = jest.fn().mockReturnThis();
        Product.lean = jest.fn().mockReturnThis();
        Product.exec = jest.fn().mockResolvedValue(updatedProduct);

    });

    it("should call Product.findByIdAndUpdate with id, product data and return document new property", async () => {
        await ProductService.updateProduct(id, productData);

        expect(Product.findByIdAndUpdate).toBeCalledWith(id, productData, { new: true });
    });

    it("should call Product.lean", async () => {
        await ProductService.updateProduct(id, productData);
        expect(Product.lean).toBeCalled();

    });

    it("should call Product.exec", async () => {
        await ProductService.updateProduct(id, productData);
        expect(Product.exec).toBeCalled();

    });

    it("should return the updated product", async () => {
        const result = await ProductService.updateProduct(id, productData);
        expect(result).toEqual(updatedProduct);

    });


});