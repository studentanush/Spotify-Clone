import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

function AddSong(){
    const[image,setImage] = useState(false);
    const[song,setSong] = useState(false);
    const[name,setName] = useState("");
    const[desc,setDesc] = useState("");
    const[album,setAlbum] = useState("none");
    const[loading,setLoading] = useState(false);
    const[albumData,setAlbumData] = useState([]);
    // by doing this below thing it will not reload the webpage when the form is submitted
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name",name);  // the second name  is state which we have written in the value
            formData.append("desc",desc);
            formData.append("image",image);
            formData.append("audio",song);
            formData.append("album",album);
            //here formdata is going in the body of the req in the backend
            const response = await axios.post(`${url}/api/song/add`,formData);
            if(response){
                toast.success("Song Added 🥳");
                setName("");
                setAlbum("none");
                setDesc("");
                setSong(false);
                setImage(false);

            }else{
                toast.error("Something went wrong 😥");
            }

        } catch (error) {
            toast.error("Error Occured 💀");
        }
        setLoading(false);
    }
    const loadAlbumData = async()=>{
        const response = await axios.get(`${url}/api/album/get`);
        try {
            if(response){
                setAlbumData(response.data.listData);
            }else{
                toast.error("Unable to load album data");
            }
        } catch (error) {
            toast.error("Error Occured");
        }
        
    }
    useEffect(()=>{
        loadAlbumData();
    },[])
    return loading? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) :  (  
        <form onSubmit={onSubmitHandler} className="flex flex-col item-start gap-6 text-gray-600">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input onChange={(e)=> setSong(e.target.files[0])} type="file" id = 'song' accept="audio/*" hidden />
                    <label htmlFor="song">
                        <img src={song? assets.upload_added : assets.upload_song} className = "w-24 cursor-pointer" alt="" />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                    <label htmlFor="image">
                        <img src={ image? URL.createObjectURL(image) : assets.upload_area} className=" w-24 curosr-pointer" alt="" />
                    </label>

                </div>
            </div> 
            <div className="flex flex-col gap-2.5">
                <p>Song name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className="bg-transparent ouline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] " placeholder="Type here" type="text" required />
            </div> 

            <div className="flex flex-col gap-2.5">
                <p>Song description</p>
                <input onChange={(e)=>setDesc(e.target.value)} value={desc} className="bg-transparent ouline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" type="text" required />
            </div> 
            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select onChange={(e)=> setAlbum(e.target.value)} defaultValue={album} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]">
                    <option value = "none" >none</option>
                    {albumData.map((item,index)=>(<option key={index} value={item.name}>{item.name}</option>))}
                </select>

            </div>             
            <button type="submit" className="bg-green-950 text-green-400 cursor-pointer border w-24      border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group ">
                <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"/>
                 ADD
            </button>
        </form>
        
    )
}
export default AddSong