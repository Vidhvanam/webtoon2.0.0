import express from 'express'
import series from '../modules/series.js'
import multer from 'multer';
import fs from "fs"
import episode from '../modules/episode.js';
const router = express.Router()
router.get('/:id', (req, res) => {
    series.findOne({ _id: req.params.id })
        .then(seriesInfo => {
            // console.log('seriesInfo', seriesInfo)
            res.send({ seriesInfo })

        })
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
})

router.get('/userSubscribes/:id', (req, res) => {
    series.find({ subscribers: req.params.id })
        .then(seriesInfo => {
            // console.log('seriesInfo', seriesInfo)
            res.send({ seriesInfo })

        })
        .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
})
router.get('/allSubscribes/get', (req, res) => {
    const userSubscribes = req.query.userSubscribes.split(",")
    // console.log(req.query.userSubscribes.split(","));
    series.find({ _id: { $in: userSubscribes } })

        .then(seriesInfo => {
            // console.log('seriesInfo', seriesInfo)
            res.send({ seriesInfo, type: "success" })

        })
        .catch(err => res.send({ noSeries: 'No series found', type: "error", err }));
})

router.get("/filter/newSeries", (req, res) => {
    series.find({
        date: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
            $lt: new Date()
        }
    }, (err, series) => {
        if (err) return console.log(err)
        // console.log(series)
        res.send({ series: [...series] })
    })
})
router.get("/filter/trending", (req, res) => {
    series.find({
        // date: {
        //     $gte: new Date(new Date() - 300 * 60 * 60 * 24 * 1000) , 
        //     $lt: new Date()
        // },
        ratting: { $gte: 4 }
    }, (err, series) => {
        if (err) return console.log(err)
        // console.log(series)
        res.send({ series: [...series] })
    })
})

router.get("/filter/all", (req, res) => {
    series.find({}, (err, series) => {
        if (err) return console.log(err)
        // console.log(series)
        res.send({ series: [...series] })
    })
})
router.get("/filter/popularByGenre/:genre", async (req, res) => {
    try {
        // console.log(req.params.genre);
        let seriesIngo = await series.find({ ratting: { $gte: 4 }, genres: { $regex: new RegExp("^" + req.params.genre.toLowerCase() + "$", "i") } }).limit(10).exec()
        res.send({ series: [...seriesIngo] })
    } catch (error) {
        res.send({ error })
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});



const upload = multer({ storage: storage });
router.post('/admin/add', upload.single('img'), (req, res) => {
    const date = new Date()
    const img = req.file.filename

    const { genres, ratting } = req.body
    const rattingNum = Number(ratting)
    let genarray = [genres]
    const seriesData = { ...req.body, completed: false, genres: genarray, ratting: rattingNum, img }
    const newSeries = new series(seriesData)
    console.log('new', newSeries)

    newSeries.save(err => {
        if (err) {
            res.send({ err, message: "Sorry error occured", type: "error" })
        } else {
            res.send({ message: "Series added sucessfully", type: "success", newSeries })
        }
    })


});

router.post('/admin/deleteSeries/one', (req, res) => {
    const { _id, img } = req.body
    try {

        const filePath = `./public/img/${img}`
        // fs.unlinkSync(`./public/img/${img}`)

        if (fs.existsSync(filePath)) {
            console.log(img, 'File exists. Deleting now ...');
            fs.unlinkSync(filePath);
        } else {
            console.log(img, 'File not found, so not deleting.');
        }

        episode.find({ SeriesId: _id }).sort({ 'ep_num': 1 }).then(epAll => {
            // if (err) console.log(err);
            console.log(epAll);
            epAll.forEach(element => {
                const path = `./public/pdfs/${element.url}`
                fs.exists(path, function (exists) {
                    if (exists) {
                        console.log('File exists. Deleting now ...');
                        fs.unlinkSync(path);
                    } else {
                        console.log('File not found, so not deleting.');
                    }
                });
            });

        }).catch(err => console.log(err))

        episode.deleteMany({ SeriesId: _id }, (err, result) => {
            if (err) {
                console.log("episode " + err);
                res.send({ message: "Series not deleted", type: "error" })
            } else {
                console.log(result);
            }

        })

        series.deleteOne({ _id: _id }, (err, result) => {
            if (err) {
                res.send({ message: "Series not deleted", type: "error", err })
            } else {
                res.send({ message: "Series deleted", type: "success", result })
            }
        })

        //file removed
    } catch (err) {
        console.error(err)
    }
    ;
})

export default router