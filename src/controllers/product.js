const ProductService = require('../services/products');

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductService.getProducts();
        res.json({
            products: products,
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({
            message: "Products were not retrieved",
        });

    }
};

exports.getProductById = async (req, res) => {
    try {
        let product = await ProductService.getProductById(req.params.id);
        res.json({
            product: product,
        });
    } catch (error) {
        console.error("error", error);
        res.status(404).json({
            message: "Product not found",
        });
    }
};

exports.createProduct = async (req, res) => {
    try {
        let productSaved = await ProductService.createProduct(req.body);
        res.status(201).json({
            message: "Product saved",
            productSaved: productSaved,
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            message: "Couldn't create product"
        })
    }
};