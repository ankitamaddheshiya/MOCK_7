const jwt = require("jsonwebtoken")


const auth  = (req,res,next)=>{
    try{
        const token = req.headers.authorization || "";
        if(token){
            let decoded = jwt.verify(token,"masai")
            if(decoded){
                req.body.userId = decoded.userId
                next()
            }else{
                res.send("Login Again")
            }

            }else{
                res.send("token not found")
            }
         }catch(err){
            res.send(err.message)
        console.log(err)
    }
}

module.exports ={
    auth
}