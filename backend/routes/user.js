import express from 'express'
import users from '../modules/user.js'
import series from '../modules/series.js'

const router = express.Router()

router.put("/unSubscribe/:id",async (req,res)=>{
    
   
    try{
        const id = req.params.id
        const {data,action ,s_id} =req.body
        let message =""
        console.log(s_id);
        const upUser = await users.findOneAndUpdate({ _id: id }, {subscribes : data} ,{returnDocument: 'after' ,returnNewDocument: true,
        new: true,
        strict: false
     })
     console.log(upUser);
       if(action === "sub"){
        message="Added to subscribes list"
       const newS = await series.updateMany({_id:{$in: s_id}} ,{ $inc: { subscribers : 1 }})
       }else{
        message = 'Removed form subscribes list'
        const newS= await series.updateMany({_id:{$in :s_id}} ,{ $inc: { subscribers : -1 }})
        console.log({newS});
       }
        res.send({message , type:"success" ,upUser})
    }catch(err){

        res.send({message:'Sorry error occured not Unsubscibed' , type:"error",err})
    }
});


export default router