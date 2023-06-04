const Product = require("../models/product");

exports.getProducts = async () => {
    let products = await Product.find().lean().exec();
    return products;
};

exports.getProductById = async (id) => {
    let product = await Product.findById(id).lean().exec();
    return product;
};

exports.createProduct = async (requestBody) => {
    const product = new Product({
        name: requestBody.name,
        description: requestBody.description,
        imageUrl: requestBody.imageUrl,
        price: requestBody.price
    });
    return await product.save();

}