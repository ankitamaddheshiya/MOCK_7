const mongoose = require("mongoose")
const restorentSchema = mongoose.Schema({

    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{

        name: String,
        description: String,
        price: Number,
        image: String
    }]



})

const restorentModel = new mongoose.model("restorent", restorentSchema)

module.export = {
    restorentModel
}