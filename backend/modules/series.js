import mongoose, { isObjectIdOrHexString } from "mongoose";
import fs from "fs"
import episode from "./episode.js"
// create an schema

var seriesSchema = new mongoose.Schema({
  // SeriesId: mongoose.Schema.Types.ObjectId,
  name: String,
  date: Date,
  subscribers: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author' }
}, { strict: false });

// seriesSchema.pre("deleteOne", { document: false, query: true }, function (next) {
//   const docId = this.getFilter()['_id'];
//   // console.log("Data deleted", docId);

//   // episode.find({ seriesId: docId })
//   episode.deleteMany({ SeriesId: docId }).then(function () {
//     console.log("Data deleted");

//     // Success
//   }).catch(function (error) {
//     console.log(error); // Failure
//   });
//   next()
// });
const seriesModel = new mongoose.model('series', seriesSchema);


export default seriesModel 
