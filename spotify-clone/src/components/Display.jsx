import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/playerContext";
    function Display(){ //  the colon (:) marks :id as a *dynamic URL parameter* and for it we use useParams hook 
        const {albumsData} = useContext(PlayerContext);
        const displayRef =  useRef();
        const location = useLocation();
        const isAlbum = location.pathname.includes("album");
        const albumId = isAlbum ? location.pathname.split("/").pop():"";
        const bgColor = isAlbum? albumsData.find((x)=> (x._id == albumId)).bgColor : "#121212";
        
        
        useEffect(()=>{
            if(isAlbum){
                displayRef.current.style.background = `linear-gradient(${bgColor},#121212)` 
            }else{
                displayRef.current.style.background = `#121212`
            }
        })
        return (
            <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"> 
            <Routes>
                    <Route path="/" element = {<DisplayHome/>}></Route>
                    <Route path= "/album/:id" element = {<DisplayAlbum album = {albumsData.find((x) => (x._id == albumId))} />}></Route>  
            </Routes>
            </div>
        )
    }
    export default Display