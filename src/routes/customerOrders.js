const express = require('express');
const CustomerOrderController = require('../controllers/customerOrder');

const router = express.Router();

router.post("/checkout", CustomerOrderController.createCustomerOrder);

module.exports = router;
