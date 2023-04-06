import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seriesModel from "./modules/series.js"
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import seriesRoute from './routes/series.js'
import episodeRoute from "./routes/episode.js";
import reviewsRoute from "./routes/reviews.js";
import userRoute from "./routes/user.js"
import authorRoute from "./routes/author.js"
import mailRoute from "./routes/mail.js"
import promotionsRoute from "./routes/promotions.js"
dotenv.config()

const app = express();
app.use(express.json());
app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(express.urlencoded());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        () => {
            console.log("connected to DB")
        }
    ).catch((err) => console.log("not connected to DB", err))

app.use("/api/auth", authRoute)
app.use("/api/series", seriesRoute)
app.use("/api/episodes", episodeRoute)
app.use("/api/reviews", reviewsRoute)
app.use("/api/user", userRoute)
app.use("/api/promotions", promotionsRoute)
app.use("/api/author", authorRoute)
app.use("/api/mail", mailRoute)
// console.log(authRoute)
//routes routes



app.listen(6969, () => {
    console.log("started")
})