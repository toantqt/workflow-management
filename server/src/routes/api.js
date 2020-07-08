const express = require('express');

let router = express.Router();
let initRouter = (app)=>{
    router.get("/",(req,res)=>{
        res.send("say hello");
    });
    return app.use("/",router);
}

module.exports= initRouter;