 const express=require("express")

 const app=express()

  app.get("/",(req,res)=>{
        res.send("Homepage")
    })


app.listen("7000",()=>{
    console.log("running on 7000")
})


