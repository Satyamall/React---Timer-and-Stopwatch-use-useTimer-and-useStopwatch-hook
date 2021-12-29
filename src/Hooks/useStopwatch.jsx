import { useEffect, useRef, useState } from "react"

export default function useStopwatch(initTimer){

    const [time,setTime]=useState(initTimer.time);
    const [timerOn,setTimeOn]=useState(false);

    const timer = useRef(null);
    
    useEffect((timer)=>{
        if(timerOn)
        {
            timer=setInterval(()=>{
                 setTime((prev)=>prev+10)
             },10)
        }
        else if(!timerOn){
            clearInterval(timer)
        }
        return ()=>{
            clearInterval(timer)
        }
    },[timerOn])

    const handleStart=()=>{
        setTimeOn(true);
    }
    
    const handleReset=()=>{
        setTime(0);
        setTimeOn(false)
    }
    
    const handleStop=()=>{
        setTimeOn(false)
    }

    return {time,timer,handleReset,handleStart,handleStop}
}