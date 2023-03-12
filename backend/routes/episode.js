import express from 'express'
import episode from '../modules/episode.js'
import multer from 'multer';

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

    const { name, SeriesId, ep_num } = req.body
    const episodeData = { SeriesId, name, createdDate, url, ep_num: Number(ep_num) }
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
export default router   