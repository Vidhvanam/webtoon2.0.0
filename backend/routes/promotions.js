import express from 'express'
import promotions from '../modules/promotions.js'
import multer from 'multer';
import mongoose from 'mongoose';
import fs from "fs"
import path from 'path';

const router = express.Router()

router.get("/filter/all", (req, res) => {
    promotions.find({}, (err, promotions) => {
        if (err) return console.log(err)
        // console.log(promotions)
        res.send({ promotions: [...promotions] })
    })
})

router.delete("/remove/:id", (req, res) => {
    const id = req.params.id
    promotions.deleteOne({ s_id: id }, function (err, docs) {
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

    let { SeriesId } = req.body
    SeriesId = new mongoose.mongo.ObjectId(SeriesId)
    const episodeData = { SeriesId, img }
    const newpromotion = new episode(episodeData)
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
