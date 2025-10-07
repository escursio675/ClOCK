import { useState, useEffect, useRef } from "react";

function usefadeUi(){

    const [isIdle, setisIdle]=useState(false); 
    const timeoutRef=useRef(null);
   
    // Mouse tracker
    useEffect(()=>{

        const resetIdle=()=>{
            if(timeoutRef.current)
                clearTimeout(timeoutRef.current);

            setisIdle(false);

            timeoutRef.current=setTimeout(()=>{
                setisIdle(true)
            }, 1700);
        };

        const handleMove=(e)=> resetIdle();
        const handleClick=(e)=> resetIdle();

        resetIdle();

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("click", handleClick);

        return()=>{
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("click", handleClick);
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        }

    }, []); 

    return isIdle;
}

export default usefadeUi;