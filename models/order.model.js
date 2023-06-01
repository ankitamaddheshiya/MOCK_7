const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({

    user: String,
    restaurant:String,
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const orderModel = new mongoose.model("order", orderSchema)

module.exports = {
    orderModel
}