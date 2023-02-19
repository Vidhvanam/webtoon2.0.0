import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref:'users'},
    seriesId: mongoose.Schema.Types.ObjectId,
    star: Number,
    date : Date,
    review: String
})
const reviewModel = mongoose.model("review", reviewSchema)
export default reviewModel