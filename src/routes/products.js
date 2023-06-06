const express = require('express');
const ProductController = require("../controllers/product");
const CustomerOrderController = require('../controllers/customerOrder');

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

router.post("/checkout", CustomerOrderController.createCustomerOrder);

module.exports = router;


