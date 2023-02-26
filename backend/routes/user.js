import express from 'express'
import users from '../modules/user.js'
import series from '../modules/series.js'

const router = express.Router()

router.put("/unSubscribe/:id",async (req,res)=>{
    
   
    try{
        const id = req.params.id
        const {data,action ,s_id} =req.body
        let message =""
        // console.log(newSubscribes , id);
        const upUser = await users.findOneAndUpdate({ _id: id }, {subscribes : data} ,{returnDocument: 'after' ,returnNewDocument: true,
        new: true,
        strict: false
     })
       if(action === "sub"){
        message="Added to subscribes list"
       const newS = await series.findOneAndUpdate({_id:s_id} ,{ $inc: { subscribers : 1 }})
       }else{
        message = 'Removed form subscribes list'
        await series.findOneAndUpdate({_id:s_id} ,{ $inc: { subscribers : -1 }})
       }
        res.send({message , type:"success" ,upUser})
    }catch(err){

        res.send({message:'Sorry error occured not Unsubscibed' , type:"error",err})
    }
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