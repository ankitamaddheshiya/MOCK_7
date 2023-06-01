const express = require("express")

const {restorentModel} = require("../models/restorent.model")
const restaurantRouter = express.Router()


//get all the restorent here =============================
restaurantRouter.get("/restorent",async(req,res)=>{
    try{

        let data = await restorentModel.find()
        res.status(200).send(data)


    }catch(err){
        res.status(400).send({err:err.message})

    }

})

// get restorent with the help of id===============================


restaurantRouter.get("/restorent/:id",async(req,res)=>{
    let id = req.params.id
    try{
       let data = await restorentModel.findById(id)
       res.status(200).send(data)
    }catch(err){
       res.status(400).send({err:err.message})
    }
})



// add the restorent from here==================================

restaurantRouter.post("/restorent/address",async(req,res)=>{
    try{
        let data = new restorentModel(req.body)
        await data.save()
        res.status(200).send(data)
    }catch(err){
        res.status(400).send({err:err.message})
    }
    
})


// adding new item in menu=======================================

restaurantRouter.post("/restorent/:id/menu",async(req,res)=>{
    let id = req.params.id
    console.log(id)
    try{

        let data = await restorentModel.findById(id)
        data.menu.push(req.body)
        await data.save()
        res.status(201).send("item added in the restorent" + data.name)

    }catch(err){
        res.status(400).send({err:err.message})
    }
})


/// delete the data======================


restaurantRouter.delete("/restorent/:id/menu/:did",async(req,res)=>{
    let restorentId = req.params.id;
    let dishesId = req.params.did
    try{
        let data= await restorentModel.findById(restorentId)
        let menu = data.menu;
        let newMenu = menu.filter((ele)=>
            ele._id !== `new ObjectId("${dishesId})`)
            console.log(newMenu)
            data.menu = newMenu
            await  data.save()
            res.status(201).send("Item deleted in retorent"+ data.name)
    }catch(err){
        res.status(400).send({err:err.message})
    }

    console.log(restorentId,dishesId)
})


module.exports ={
    restaurantRouter
}