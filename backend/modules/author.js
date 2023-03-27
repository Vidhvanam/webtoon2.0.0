import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,

}, { strict: false })

const authorModel = mongoose.model("author", authorSchema)
export default authorModel