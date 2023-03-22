import express from 'express'
import pramotions from '../modules/pramotions'
import multer from 'multer';
import mongoose from 'mongoose';
import fs from "fs"
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/sliderImg');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});


const upload = multer({ storage: storage });
router.post('/addPramotion', upload.single('img'), (req, res) => {
    const img = req.file.filename

    let { SeriesId } = req.body
    SeriesId = new mongoose.mongo.ObjectId(SeriesId)
    const episodeData = { SeriesId, img }
    const newPramotion = new episode(episodeData)
    console.log('new', newPramotion)

    newPramotion.save(err => {
        if (err) {
            res.send({ err, message: "Sorry error occured", type: "error" })
        } else {
            res.send({ message: "Added in pramotion list", type: "success", newPramotion })
        }
    })

});

export default router   
