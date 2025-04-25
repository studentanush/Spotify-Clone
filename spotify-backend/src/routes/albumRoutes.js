import express from"express";
import { addAlbum,removeAlbum,listAlbum } from "../controllers/albumController.js";
import upload from "../middlewares/multer.js";

const albumRouter = express.Router();
albumRouter.post("/add",upload.single("image"),addAlbum);
albumRouter.get("/get",listAlbum);
albumRouter.post("/delete",removeAlbum);

export default albumRouter;