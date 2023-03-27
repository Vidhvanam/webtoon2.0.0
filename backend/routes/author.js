import express from 'express'
import author from '../modules/author.js'

const router = express.Router()

router.get("/filter/all", (req, res) => {
    author.find({}, (err, author) => {
        if (err) return console.log(err)
        // console.log(author)
        res.send({ authors: [...author] })
    })
})

router.post("/remove", (req, res) => {


    author.deleteOne({ _id: _id }, function (err, docs) {
        if (!err) {
            res.send({ message: 'Series Removed From Promotion List', type: "success", docs })
        }
        else {
            res.send({ message: 'Sorry error occured not removed', type: "error", err })
        }
    });
})




router.post('/addAuthor', (req, res) => {

    const newAuthor = new author(req.body)
    newAuthor.save(err => {
        if (err) {
            res.send({ err, message: "Sorry error occured", type: "error" })
        } else {
            res.send({ message: "Author added succesfully", type: "success", newAuthor })
        }
    })

});

export default router   
