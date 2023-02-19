import mongoose, { isObjectIdOrHexString } from "mongoose";
 
// create an schema
// var seriesSchema = new mongoose.Schema({
//           _id:mongoose.Schema.Types.ObjectId,
//           episodes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'episodes' }],
//           name:String,
//           date:Date

//         });

    var seriesSchema = new mongoose.Schema({
      _id:mongoose.Schema.Types.ObjectId,
      name:String,
      date:Date

    });

const seriesModel = new mongoose.model('series',seriesSchema);
export default  seriesModel 
