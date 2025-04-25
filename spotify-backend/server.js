//install these dependencies -- cloudinary,nodemon,express,mongoose,multer,dotenv and cors
//firstly we have added *type:module* in package.json so that we can use *import statement* in backend 
//then we have added *server: nodemon server.js* in the script part of the package.json
//then create src folder and all other folders
import express from "express";
import cors from "cors";
import "dotenv/config.js"
import songRouter from "./src/routes/songRoutes.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloundinary.js";
import albumRouter from "./src/routes/albumRoutes.js";

//app config
const app = express();
const port = process.env.PORT || 4000;  // accessing port from .env file or it is not there it will run on port 4000
connectDB();  // connected DB
connectCloudinary();  // connected cloudinary
//middlewares
app.use(express.json());
app.use(cors());  // like if our frontend and backend are running on two different server it help it to connect both servers

app.use("/api/song",songRouter);// whenever this route is called it will use songRouter Router 
app.use("/api/album",albumRouter);// whenever this route is called it will use albumRouter Router 
//initialing routes
app.get("/",(req,res)=> {
    res.send("API working") // this will return in html format
    // res.json ({
    //     msg: "API working"   and this is used to return or get data in JSON format   
    // })
})

app.listen(port,()=>console.log(`server started on ${port}`));

