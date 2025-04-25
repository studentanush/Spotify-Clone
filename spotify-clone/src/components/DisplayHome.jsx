import React from "react";
import Navbar from "./Navbar";
import Albumitem from "./AlbumItem";
import { albumsData, songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../context/playerContext";

function DisplayHome(){ 
    const {songsData,albumsData} = useContext(PlayerContext);                       // key={index} → React requires a unique key to optimize rendering.
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl ">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item,index)=>(<Albumitem key={index} name={item.name} desc = {item.desc} id= {item._id} image = {item.image}/>))}
                </div>     
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl ">Today's Hits</h1>
                <div className="flex overflow-auto">
                    {songsData.map((item,index)=>(<SongItem key= {index} name = {item.name} image = {item.image} desc = {item.desc} id={item._id}/>))}
                </div>     
            </div>
        </>
    )
}
// overflow-auto is used  so that we can scroll automatically
export default DisplayHome