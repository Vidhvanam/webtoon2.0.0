import mongoose from 'mongoose'

// const episodeSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     SeriesId:{ type : mongoose.Schema.Types.ObjectId, ref : 'series' },
//     name: String,
//     createdData : Date,
//     url: String
// })
const episodeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    SeriesId: mongoose.Schema.Types.ObjectId,
    name: String,
    createdData : Date,
    url: String
})
const episodesModel = mongoose.model("episodes", episodeSchema)
export default episodesModel