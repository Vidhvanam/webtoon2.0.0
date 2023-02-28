import express from 'express'
import { ObjectId } from 'mongoose';
import reviewMd from '../modules/reviews.js'

const router = express.Router()
router.get('/useReview' , (req ,res) =>{
    reviewMd.find({seriesId :req.query.s_id , userId :req.query.u_id}).select({review:1 ,star :1}).populate('userId')
    .then(userReview => {
        // console.log('reviewsData', userReview)
        res.send({userReview})
    })
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    
})
router.get('/:id' , (req ,res) =>{
    reviewMd.find({seriesId :req.params.id}).populate('userId')
    .then(reviewsData => {
        // console.log('reviewsData', req.params.id)
        res.send({reviewsData})})
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    
})
router.post('/addReview' , (req ,res) =>{

    const date = new Date()
    const {star , review ,userId , seriesId} = req.body
    // console.log('dd',req.body)
    const newReview = new reviewMd({userId,seriesId,star,review,date})
    newReview.save(err=>{
                if(err){
                    res.send({err , message:"Sorry error occured",type:"error"})
                }else{
                    res.send({message:"Review added sucessfully" ,type:"success" ,newReview})
                }
            })
    
})

router.post('/updateReview/:id' ,async (req ,res) =>{
    const id = req.params.id
    // const date = new Date()
    const {star , review } = req.body
    // console.log('dd',req.body)
    try{

        const Ures = await reviewMd.updateOne({ _id: id }, { star ,review})
        // console.log(Ures);
        res.send({message:'Review Updated successfully' , type:"success"})
    }catch(err){
        res.send({message:'Sorry error occured not updated' , type:"error"})
    }
            
})
router.post('/deleteReview/:id' ,async (req ,res) =>{
    const id = req.params.id
    reviewMd.findByIdAndDelete(id, function (err, docs) {
        if (!err){
            res.send({message:'Review Deleted successfully' , type:"error"})
        }
        else{
            res.send({message:'Sorry error occured not deleted' , type:"error" , err})
        }
     });
})

router.get('/AllUserReviews/:id' , (req ,res) =>{
    reviewMd.find({userId :req.params.id}).populate('userId seriesId')
    .then(reviewsData => {
        // console.log('reviewsData', req.params.id)
        res.send({reviewsData ,type:"success"}) })
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    
})

router.delete('/reviewsDelete' , (req ,res) =>{
    const r_ids =req.query.r_ids.split(",")
    // console.log(req.query.userSubscribes.split(","));
    console.log({r_ids})
    reviewMd.deleteMany({ _id :{$in : r_ids}})
    
    .then(info => {
        console.log({info})
        res.send({message:"Delete Succesfully" ,type : "success"})
        
    })
    .catch(err => res.send({ noSeries: 'No series found',type: "error" ,err}));
})



export default router   