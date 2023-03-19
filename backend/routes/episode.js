import express from 'express'
import episode from '../modules/episode.js'
import multer from 'multer';
import mongoose from 'mongoose';
import fs from "fs"
import path from 'path';

const router = express.Router()
router.get('/:id', (req, res) => {
    episode.find({ SeriesId: req.params.id }).sort({ 'ep_num': 1 })
        .then(episodeInfo => {
            // console.log('episodeInfo', episodeInfo)
            res.send({ episodeInfo })
        })
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    // 
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pdfs');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});



const upload = multer({ storage: storage });
router.post('/admin/add', upload.single('pdf'), (req, res) => {
    const createdDate = new Date()
    const url = req.file.filename

    const { name, ep_num } = req.body
    let { SeriesId } = req.body
    SeriesId = new mongoose.mongo.ObjectId(SeriesId)
    const episodeData = { SeriesId, name, createdDate, url, ep_num: Number(ep_num), status: "published" }
    const newEpisode = new episode(episodeData)
    console.log('new', newEpisode)

    newEpisode.save(err => {
        if (err) {
            res.send({ err, message: "Sorry error occured", type: "error" })
        } else {
            res.send({ message: "Episode added sucessfully", type: "success", newEpisode })
        }
    })

});


router.post('/deleteEpisode/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, url, status } = await req.body
        const oldEpData = await episode.findOneAndUpdate({ _id: id }, { name, url, status }, { returnDocument: "before" })
        console.log(oldEpData);
        const newEpData = await episode.find({ _id: id })
        // console.log("new ", newEpData);
        if (oldEpData.url !== "") {

            fs.exists(`./public/pdfs/${oldEpData.url}`, function (exists) {
                if (exists) {
                    console.log('File exists. Deleting now ...');
                    fs.unlinkSync(`./public/pdfs/${oldEpData.url}`);
                } else {
                    console.log('File not found, so not deleting.');
                }
            });
        }

        res.send({ message: "Episode deleted Successfully", type: "success", newEpData })
    } catch (err) {
        console.log(err);
        res.send({ message: 'Sorry error occured not updated', type: "error", err })
    }

})


router.post('/updateEpisode/:id', upload.single('pdf'), async (req, res) => {

    try {
        const id = req.params.id
        const url = req.file.filename

        const { name, status } = await req.body
        console.log("edit data", id, url, name, status);
        const oldEpData = await episode.findOneAndUpdate({ _id: id }, { name, url, status }, { returnDocument: "before" })
        // console.log(oldEpData);
        const newEpData = await episode.find({ _id: id })
        // console.log("new ", newEpData);
        if (oldEpData.url !== "") {

            fs.exists(`./public/pdfs/${oldEpData.url}`, function (exists) {
                if (exists) {
                    // console.log('File exists. Deleting now ...');
                    fs.unlinkSync(`./public/pdfs/${oldEpData.url}`);
                } else {
                    console.log('File not found, so not deleting.');
                }
            });
        }

        res.send({ message: "Episode updated Successfully", type: "success", newEpData })
    } catch (err) {
        res.send({ message: 'Sorry error occured not updated', type: "error", err })
    }

})

router.get("/getFile/:url", (req, res) => {
    const url = req.params.url
    console.log(req.params.url);
    if (url !== "") {
        // const filepath1 = path.resolve(__dirname, `./public/pdfs/${url}`)
        const filepath2 = `./public/pdfs/${url}`
        console.log('path', filepath2)
        fs.readFile(filepath2, function (err, content) {
            if (err) {
                res.writeHead(404, { "Content-type": "text/html" });
                res.end("<h1>No such image</h1>");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, { "Content-type": "application/pdf" });
                res.end(content);
            }
        });
    }
})




export default router   