const express=require('express');
const {connection} = require("./db");
const {userRouter} =require("./routes/user.router")
const {PostRouter} =require("./routes/post.router")
const cors=require("cors")
const app=express();
app.use(cors());
require("dotenv").config();
app.use(express.json());

app.use("/users",userRouter)
app.use("/posts",PostRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection

        console.log(`Running at PORT ${process.env.PORT}`)
        console.log("Connected to db")
    }catch(e){
        console.log(e)
        console.log("Something went wrong")
    }
    
})