import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref:'users'},
    seriesId: {type: mongoose.Schema.Types.ObjectId, ref:'series'},
    star: Number,
    date : Date,
    review: String
})
const reviewModel = mongoose.model("review", reviewSchema)
export default reviewModel