import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
function ListSong(){
    const [data,setData] = useState([]);
    const fetchSongs = async ()=>{
        try {
            const response = await axios.get(`${url}/api/song/get`);
            console.log(response.data);
            if(response){
                setData(response.data.allSongs)
            }
        } catch (error) {
            toast.error("Error Occured...☹")
        }
        
    }
    const removeSongs = async(id)=>{
        try {
            const response = await axios.post(`${url}/api/song/delete`,{id});
            if(response){
                toast.success("Succesfully deleted");
                await fetchSongs();
            }
            console.log(response.data.deleted);
        } catch (error) {
            toast.error("Error Occuredddd");
            
        }
    }
    
    useEffect(()=>{
        fetchSongs();
        //removeSongs();
       
    },[])
    return(
        <div>
            <p>All Songs</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] item-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return(
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                            <img className="w-12" src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p className="cursor-pointer" onClick={()=>removeSongs(item._id)} >x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ListSong