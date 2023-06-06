const CustomerOrder = require('../models/customerOrder');

exports.createCustomerOrder = async (requestBody) => {
    const customerOrder = new CustomerOrder({
        name: requestBody.name,
        street: requestBody.street,
        number: requestBody.number,
        colonia: requestBody.colonia,
        zipCode: requestBody.zipCode,
        orderList: requestBody.orderList,
    });
    return await customerOrder.save();

}