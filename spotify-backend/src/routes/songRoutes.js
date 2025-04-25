import upload from "../middlewares/multer.js";
import {addSong,listSong, removeSong} from "../controllers/songController.js";
import express from "express";
const songRouter = express.Router();

songRouter.post("/add",upload.fields([{name:"image" ,maxCount:1},{name:"audio",maxCount:1}]),addSong);
songRouter.get("/get",listSong);
songRouter.post("/delete",removeSong);
export default songRouter;