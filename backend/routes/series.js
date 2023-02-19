import express from 'express'
import series from '../modules/series.js'

const router = express.Router()
router.get('/:id' , (req ,res) =>{
    series.findOne({ _id : req.params.id})
    .then(seriesInfo => {
        // console.log('seriesInfo', seriesInfo)
        res.send({seriesInfo})
        
    })
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
})
router.get("/filter/newSeries",(req,res)=>{
    series.find({  date: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) , 
        $lt: new Date()
    }},(err,series)=>{
        if(err) return console.log(err)
        // console.log(series)
        res.send({series : [...series]})
    })
})
router.get("/filter/trending",(req,res)=>{
    series.find( {date: {
        $gte: new Date(new Date() - 300 * 60 * 60 * 24 * 1000) , 
        $lt: new Date()
    },ratting:{$gte:4}},(err,series)=>{
        if(err) return console.log(err)
        // console.log(series)
        res.send({series : [...series]})
    })
})
export default router