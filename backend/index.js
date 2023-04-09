 const express=require("express")
 const {connection}=require("./config/db")
 const cors = require("cors")
 require('dotenv').config()

const PORT=process.env.PORT ||8080;
 const app=express()
 app.use(express.json())

  app.get("/",(req,res)=>{
        res.send("Homepage")
    })
    app.use(cors())
    

    app.listen(PORT,async()=>{
        try{
            await connection;
            console.log("Connected to db")
        }
        catch(err){
            console.log("Error connnecting to DB")
            console.log(err)
        }
        console.log(`listning on ${PORT}`)
    })