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

router.post("/remove/:id", (req, res) => {

    const id = req.params.id
    author.findOneAndUpdate({ _id: id }, { status: "removed" }, function (err, docs) {
        if (!err) {
            res.send({ message: 'Author removed', type: "success", docs })
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
router.post('/update', async (req, res) => {
    const { _id } = req.body
    try {
        console.log(_id);
        const Ures = await author.updateOne({ _id: _id }, { _id, ...req.body })
        console.log(Ures);
        res.send({ message: 'Author Updated successfully', type: "success" })
    } catch (err) {
        res.send({ message: 'Sorry error occured not updated', type: "error" })
    }

})


export default router   
