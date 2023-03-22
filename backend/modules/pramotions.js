import mongoose from 'mongoose'

const pramotionSchema = new mongoose.Schema({
    SeriesId: mongoose.Schema.Types.ObjectId,
    img: String,
}, { strict: false })

const pramotionModel = mongoose.model("episodes", pramotionSchema)
export default pramotionModel