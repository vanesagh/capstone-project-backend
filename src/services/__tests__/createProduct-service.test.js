const Chance = require('chance');

// Dependencies
const ProductService = require("../products");
const Product = require("../../models/product");

const chance = new Chance();

// Adding mock
jest.mock("../../models/product");

describe("when calling createProduct service method", () => {
    let productData, newProduct;

    beforeEach(() => {

        productData = {
            name: chance.string(),
            description: chance.string(),
            imageUrl: chance.string(),
            price: chance.integer()
        };

        Product.schema = jest.fn();
        new Product.schema(productData);






    });

    it("should create new Product and save it", async () => {
        await ProductService.createProduct(productData);

        expect(Product.schema).toBeCalledWith(productData);




    });


});


