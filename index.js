const express = require("express")
const { connection } = require("./config/db")
const {UserRouter} = require("./route/user.route")
const {restaurantRouter} = require("./route/restorent.route")
const {orderRouter} = require("./route/order.route")
const {auth} = require("./middleware/auth.middleware")


const port = process.env.port || 4000
const app = express()
app.use(express.json())



app.get("/", (req, res) => {
    res.send("Food Delivery App Backend")
})

app.use("/user",UserRouter)
app.use(auth)
app.use("/",restaurantRouter)
app.use("/order",orderRouter)
app.listen(port, () => {
    try{
        connection
        console.log("Server in running at " + port)
    }catch(err){
        console.log(err)

    }
    console.log("Server in running at " + port)
})