import mongoose, { isObjectIdOrHexString } from "mongoose";
import fs from "fs"

// create an schema

var seriesSchema = new mongoose.Schema({
  name: String,
  date: Date,
  subscribers: Number
}, { strict: false });

const seriesModel = new mongoose.model('series', seriesSchema);

seriesSchema.pre("findOneAndDelete", function (next) {
  const id = this._id
  console.log("called!!!", id);
  fs.unlinkSync(`./public/img/${this.img}`)
  // episode.find({})
  // episode.deleteMany({ SeriesId: _id }).then(function () {
  //   console.log("Data deleted");
  //   fs // Success
  // }).catch(function (error) {
  //   console.log(error); // Failure
  // });
  next()
});

export default seriesModel 
