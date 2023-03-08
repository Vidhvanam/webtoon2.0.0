import express from 'express'
import series from '../modules/series.js'
import multer from 'multer';
import path  from 'path';

const router = express.Router()
router.get('/:id' , (req ,res) =>{
    series.findOne({ _id : req.params.id})
    .then(seriesInfo => {
        // console.log('seriesInfo', seriesInfo)
        res.send({seriesInfo})
        
    })
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
})

router.get('/userSubscribes/:id' , (req ,res) =>{
    series.find({ subscribers : req.params.id})
    .then(seriesInfo => {
        // console.log('seriesInfo', seriesInfo)
        res.send({seriesInfo})
        
    })
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
})
router.get('/allSubscribes/get' , (req ,res) =>{
    const userSubscribes =req.query.userSubscribes.split(",")
    // console.log(req.query.userSubscribes.split(","));
    series.find({ _id :{$in : userSubscribes}})
    
    .then(seriesInfo => {
        // console.log('seriesInfo', seriesInfo)
        res.send({seriesInfo ,type : "success"})
        
    })
    .catch(err => res.send({ noSeries: 'No series found',type: "error" ,err}));
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
    series.find({
        // date: {
    //     $gte: new Date(new Date() - 300 * 60 * 60 * 24 * 1000) , 
    //     $lt: new Date()
    // },
    ratting:{$gte:4}},(err,series)=>{
        if(err) return console.log(err)
        // console.log(series)
        res.send({series : [...series]})
    })
})

router.get("/filter/all",(req,res)=>{
    series.find({},(err,series)=>{
        if(err) return console.log(err)
        // console.log(series)
        res.send({series : [...series]})
    })
})
router.get("/filter/popularByGenre/:genre",async (req,res)=>{
    try{
        // console.log(req.params.genre);
        let seriesIngo = await series.find({ratting:{$gte : 4 } , genres :  { $regex: new RegExp("^" + req.params.genre.toLowerCase() +"$", "i") } }).limit(10).exec()
        res.send({series : [...seriesIngo]})
    }catch(error){
       res.send({error})
    }
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/img');
    },
    filename: function(req, file, cb) {   
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage });
router.post('/admin/add',upload.single('img'), (req, res) => {
    const {name} = req.body
    console.log(req.file ,name);
    res.json({ message: 'Image uploaded successfully' });
 
});


    export default router