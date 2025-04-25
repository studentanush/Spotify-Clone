import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";
import albumModel from "../models/albumModel.js"
import upload from "../middlewares/multer.js";
const addAlbum = async (req,res)=>{
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;// for single  file do this
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resourse_type:"image"});

        await albumModel.create({
            name,
            desc,
            bgColor,
            image:imageUpload.secure_url

        })
        res.json({
            msg:"album succesfully created and stored in the database"
        })

    } catch (error) {
        res.json({
            msg:"Something went wrong",
            error:error.message
        })
    }
}
const listAlbum = async (req,res)=>{
    try {
        const listData = await albumModel.find({});
        res.json({
            //msg:"These are the data",
            listData,
        })
    } catch (error) {
        res.json({
            msg:"Error Occured"
        })
    }

}
const removeAlbum = async (req,res)=>{
    try {
        const {id}  = req.body;
        await albumModel.findByIdAndDelete(id);
        res.json({
            msg:"The mention album is succesfully removed.."
        })
       
    } catch (error) {
        res.json({
            msg:"error occured",
            "error":error.message,
        })
        
    }

}

export {
    addAlbum,
    listAlbum,
    removeAlbum
}