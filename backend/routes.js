import express from "express";
// const express = require("express");
import cors from "cors";
import mongoose from "mongoose";
import seriesModel from "./modules/series.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


mongoose.connect("mongodb+srv://webtoon:mongo123@cluster0.u1576eb.mongodb.net/webtoonDb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(
    ()=>{
        console.log("connected to DB")
    }
).catch((err)=> console.log("not connected to DB"))

   


// user schema 
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    phone : String,
    password: String
})

const users = new mongoose.model("users", userSchema)

//routes routes
app.get("/",(req,res)=>{
    // console.log('dd')
    seriesModel.find({},(err,series)=>{
        if(err) return console.log(err)
        // console.log(series)
        res.send({series : [...series]})
    })
})
app.post("/auth/login",(req,res)=>{
    const {email,password} =req.body;
    console.log('email' , password)
    users.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        console.log('user found')
        }else{
            res.send({message:"not register"})
        }
    })
});
app.post("auth/register",(req,res)=>{
    console.log(req.body) 
    const {userName,phone,email,password} =req.body;
    users.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new users({userName,email,phone,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


}) 

app.listen(6969,()=>{
    console.log("started")
})