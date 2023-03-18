import mongoose from 'mongoose'
import fs from "fs"
// const episodeSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     SeriesId:{ type : mongoose.Schema.Types.ObjectId, ref : 'series' },
//     name: String,
//     createdData : Date,
//     url: String
// })
const episodeSchema = new mongoose.Schema({
    SeriesId: mongoose.Schema.Types.ObjectId,
    name: String,
    createdData: Date,
    url: String
}, { strict: false })

// episodeSchema.pre('deleteMany', async function (next) {
//     let deletedData = await episodesModel.find(this._conditions).exec()
//     console.log("pre deleteMany");
//     deletedData.forEach(episode => fs.unlinkSync(`./public/pdfs/${episode.url}`))

//     return next()
// })
const episodesModel = mongoose.model("episodes", episodeSchema)
export default episodesModel