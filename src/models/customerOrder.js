const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerOrderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    colonia: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    orderList: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
});

module.exports = mongoose.model("CustomerOrder", customerOrderSchema);