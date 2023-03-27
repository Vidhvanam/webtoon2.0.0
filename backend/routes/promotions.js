import express from 'express'
import promotions from '../modules/promotions.js'
import multer from 'multer';
import fs from "fs"

const router = express.Router()

router.get("/filter/all", (req, res) => {
    promotions.find({}, (err, promotions) => {
        if (err) return console.log(err)
        // console.log(promotions)
        res.send({ promotions: [...promotions] })
    })
})

router.post("/remove", (req, res) => {

    const { _id, img } = req.body
    const filePath = `./public/img/sliderImg/${img}`
    console.log(req.body);
    if (fs.existsSync(filePath)) {
        console.log(img, 'File exists. Deleting now ...');
        fs.unlinkSync(filePath);
    } else {
        console.log(img, 'File not found, so not deleting.');
    }
    promotions.deleteOne({ _id: _id }, function (err, docs) {
        if (!err) {
            res.send({ message: 'Series Removed From Promotion List', type: "success", docs })
        }
        else {
            res.send({ message: 'Sorry error occured not removed', type: "error", err })
        }
    });
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/sliderImg');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});


const upload = multer({ storage: storage });
router.post('/addpromotion', upload.single('img'), (req, res) => {
    const img = req.file.filename

    const { SeriesId } = req.body
    const episodeData = { s_id: SeriesId, img }
    const newpromotion = new promotions(episodeData)
    console.log('new', newpromotion)

    newpromotion.save(err => {
        if (err) {
            res.send({ err, message: "Sorry error occured", type: "error" })
        } else {
            res.send({ message: "Added in promotion list", type: "success", newpromotion })
        }
    })

});

export default router   
