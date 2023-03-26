import mongoose from 'mongoose'

const promotionSchema = new mongoose.Schema({
    SeriesId: String,
    img: String,
}, { strict: false })

const promotionModel = mongoose.model("promotions", promotionSchema)
export default promotionModel