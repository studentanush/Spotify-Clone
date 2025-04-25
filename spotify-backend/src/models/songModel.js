import mongoose from "mongoose";
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name:{type:String,required:true},  // requiered true ---> means that if nothing is passed at name property it will not save it
    desc:{type:String,required:true},
    album:{type:String,required:true},
    image:{type:String,required:true},
    file:{type:String,required:true},
    duration:{type:String,required:true}
})
const songModel = mongoose.models.song || mongoose.model("song",songSchema); // create a model called 'song' based on this schema (songSchema).

export default songModel