import songModel from "../models/songModel.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";
const addSong = async (req,res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0]; // for more than 1 file to add do this
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`
        console.log(name,desc,album,audioUpload,imageUpload);

        await songModel.create({
            name,
            desc,
            album,
            image:imageUpload.secure_url,
            file:audioUpload.secure_url,
            duration:duration
        })
        res.json({
            msg:"succesfully added in the database"
        })
        
    } catch (error) {
        console.log("Errored occured..!",error)
    }

}
const listSong = async (req,res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({
            allSongs,
        }) 
    } catch (error) {
        res.json({
           msg: "Error Occured...!"
        })
    }
    
}
const removeSong = async (req,res) =>{
    try {  
        const deleted = await songModel.findByIdAndDelete(req.body.id)
        
        
        if (!deleted) {
            return res.status(404).json({ msg: "No song found with this ID" });
        }
        res.json({
            id:req.body.id,
            msg:"succesfully removed the song  nonsense bullsh** works pls"
        })
        
    } catch (error) {
        res.json({
            msg:"Something went wrong",
            error:error.message,
        })
    }
}
export{
    addSong,
    listSong,
    removeSong
}