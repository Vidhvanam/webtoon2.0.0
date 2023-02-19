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
        // console.log('reviewsData', reviewsData)
        res.send({reviewsData})})
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    
})
router.post('/addReview' , (req ,res) =>{

    const date = new Date()
    // const userId = new ObjectId(req.body.userId)
    // console.log("asdfasf",userId)

    const {star , review ,userId , seriesId} = req.body
    console.log('dd',req.body)
    const newReview = new reviewMd({userId,seriesId,star,review,date})
    newReview.save(err=>{
        console.log(newReview)

                if(err){
                    console.log("asdfasf",newReview)
                    res.send({err , message:"error",type:"error"})
                }else{
                    console.log(newReview)
                    res.send({message:"sucessfull" ,type:"success"})
                }
            })
    
})


export default router   