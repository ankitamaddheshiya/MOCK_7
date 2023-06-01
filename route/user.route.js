const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")


const UserRouter = express.Router()

UserRouter.post("/register", async (req, res) => {
    let { name, email, password, address } = req.body;

    try {
        //check user is already exist or not
        let user = await UserModel.find({ email });
        if (user.length > 0) {
            res.status(400).send("User is Already exists")
        } else {
            bcrypt.hash(password, 5, async (err, hashpassword) => {
                if (err) {
                    res.send(" Error while register password")
                } else {
                    let newUser = new UserModel({ name, email, password: hashpassword, address });
                    await newUser.save();
                    res.status(201).send("User Register SuccessFully ")
                }
            })
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})
UserRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        //check user already Exists
        let user = await UserModel.find({ email })
        if (user.length == 0) {
            res.status(400).send("User is not exists")
        } else {
            let hashpassword = user[0].password;
            bcrypt.compare(password, hashpassword, async (err, answer) => {
                if (answer) {
                    let token = jwt.sign({ userId:user[0]._id }, "masai", { expiresIn: "7d" })
                    console.log(token)

                    res.status(201).json({ message: "user logged in successfull", token })
                } else {
                    res.send(400).send({ message: "error got while login ", err })
                }
            })
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})




module.exports = {
    UserRouter
}