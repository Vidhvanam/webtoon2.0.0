import express from 'express'
import users from '../modules/user.js'
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

router.post("/login",(req,res)=>{
    const {email,password} =req.body;
    // console.log('email' , password)
    users.findOne({email:email},(err,user)=>{
        if(user){
            var bytes  = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
           if(password === originalText){
               const {password , ...info} = user
               res.send({message:"Login Sucessfully",user:info , type:"success"})
           }else{
               res.send({message:"Wrong email or password" ,type:'error'})
           }
        // console.log('user does not exists')
        }else{
            res.send({message:"Not registered" ,type:"success"})
        }
    })
});

router.post("/register",(req,res)=>{
    // console.log(req.body) 
    const {userName,phone,email,password} =req.body;
    var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    users.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new users({userName,email,phone,password : ciphertext})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    console.log(user)
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


}) 
export default router