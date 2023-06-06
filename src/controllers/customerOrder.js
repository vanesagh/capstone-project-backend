const CustomerOrderService = require('../services/customerOrder')
exports.createCustomerOrder = async (req, res) => {
    try {
        let customerOrderSaved = await CustomerOrderService.createCustomerOrder(req.body);
        res.status(201).json({
            message: "Customer order saved",
            customerOrderSaved: customerOrderSaved,
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            message: "Couldn't create customer order"
        })
    }
};