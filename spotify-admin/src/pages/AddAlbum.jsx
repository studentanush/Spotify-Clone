import React, { useState } from "react";
import { assets } from "../assets/assets";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
function AddAlbum(){
    const [image,setImage] = useState(false);
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [bgColor,setBgColor] = useState("#ffffff");  
    const [loading,setLoading] = useState(false);
    const onSubmitHandler = async(e)=>{
            e.preventDefault();
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("name",name);  // the second name  is state which we have written in the value
                formData.append("desc",desc);
                formData.append("image",image);
                formData.append("bgColor",bgColor);
                
                //here formdata is going in the body of the req in the backend
                const response = await axios.post(`${url}/api/album/add`,formData);
                if(response){
                    toast.success("Album Added 🥳");
                    setName("");
                    setBgColor("#ffffff");
                    setDesc("");
                    setImage(false);
    
                }else{
                    toast.error("Something went wrong 😥");
                }
    
            } catch (error) {
                toast.error("Error Occured 💀");
            }
            setLoading(false);
    }        

    return loading?(
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ):(
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-6 text-gray-600">
            <div className="flex flex-col gap-4">
                <p>Upload Image</p>
                <input onChange={(e)=>setImage(e.target.files[0])} id="image" type="file" accept="image/*" hidden />
                <label htmlFor="image">
                    <img  className="w-24 cursor-pointer" src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>

            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Type here" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]  "/>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album description</p>
                <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" placeholder="Type here" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]  "/>
            </div>
            <div className="flex flex-col gap-3">
                <p>Background Color</p>
                <input onChange={(e)=>setBgColor(e.target.value)} value={bgColor} type="color"  />


            </div>
            <button type="submit" className="bg-green-950 text-green-400 cursor-pointer border w-24 border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group ">
                <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"/>
                 ADD
            </button>
        </form>
    )

}
export default AddAlbum