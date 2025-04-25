import React, { createContext, useEffect, useRef, useState } from "react";
//import { songsData } from "../assets/assets";
export const PlayerContext = createContext();
import axios from "axios";

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();
    const url = "http://localhost:4000";
    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsdata] = useState([]);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0

        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = ()=>{
        audioRef.current.play();
        setPlayStatus(true);
    }
    const pause = ()=>{
        audioRef.current.pause();
        setPlayStatus(false);
    }
    const playWithId = async (id)=>{
        await songsData.map((item)=>{
            if(id ===item._id){
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlayStatus(true);
    }
    const previous = async () => {
        if (track.id > 0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }
    const next = async () => {
        if (track.id < songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }
    const seekSong = async (e)=>{
        //console.log(e);
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth )*audioRef.current.duration)
    }
    const getSongData = async()=>{
        try {
            const response = await axios.get(`${url}/api/song/get`);
            if(response){
                setSongsData(response.data.allSongs);
                setTrack(response.data.allSongs[0]);
            } 
        } catch (error) {
            
        }
        
    }
    const getAlbumData = async()=>{
        try {
            const response = await axios.get(`${url}/api/album/get`);
            if(response){
                setAlbumsdata(response.data.listData);
            }
        } catch (error) {
            
        }
    }
        

    //console.log(audioRef.current.currentTime);
    useEffect(()=>{
        setTimeout(()=>{

            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = Math.floor(audioRef.current.currentTime/audioRef.current.duration*100) + "%";
                setTime({
                    
                    currentTime: {
                        second:Math.floor(audioRef.current.currentTime % 60),
                        minute:Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second:Math.floor(audioRef.current.duration % 60),
                        minute:Math.floor(audioRef.current.duration / 60)

                    }
                })
            }
        },1000)
    },[audioRef])
    useEffect(()=>{
        getSongData();getAlbumData();
    },[])

    const contextValue = {  // this is key value pair which we directly use to write inside the .Provider's value input
        audioRef,// write this or {audioRef:audioRef}
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong,
        songsData,albumsData,
            
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}


export default PlayerContextProvider