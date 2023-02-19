import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    phone : String,
    password: String
})
const user = mongoose.model("users", userSchema)
export default user