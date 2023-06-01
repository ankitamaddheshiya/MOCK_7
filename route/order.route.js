const express = require("express")

//const bcrypt = require("bcrypt")

const { orderModel } = require("../models/order.model")

const orderRouter = express.Router()

orderRouter.post("/", async (req, res) => {
    try {
        let data = new orderModel(req.body)
        await data.save()
        res.status(200).send("successfulll ordered")

    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

orderRouter.get("/:id", async (req, res) => {
    try {
        let data = await orderModel.findById(req.params.id)
        res.status(200).send(data)

    } catch (err) {
        res.status(400).send({ err: err.message })
    }

})


orderRouter.patch("/:id", async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.params.id, req.body)
        req.status(200).send("order Updated")
    } catch (err) {
        res.status(400).send(err.message)
    }
})





module.exports = {
    orderRouter
}