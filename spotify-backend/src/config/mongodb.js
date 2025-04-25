import mongoose from "mongoose";

import Schema from "mongoose";
//connecting the mongoDB server 
 const connectDB  = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}spotify`) // connecting the server with help of .env
    console.log("Database connected");
 }
 export default connectDB;


 
