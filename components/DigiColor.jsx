import { useState, useEffect } from "react";
import usefadeUi from "./Hooks/usefadeUi";

function DigiColor(){

    const [time, setTime]=useState(new Date());
    const [milTime, setmilTime]=useState(true);
    const [color, setColor]=useState("#ef4444");
    const [animationKey, setanimationKey]=useState(0);
    const [colorPickerOpen, setColorPickerOpen]=useState(false);

    const isIdle=usefadeUi();

    const handleColorChange=(e)=>setColor(e.target.value);

    useEffect(()=>{
        const interval=setInterval(()=>setTime(new Date()), 1000);
        return ()=>clearInterval(interval);
    }, []);
    
    const animationActive = isIdle && !colorPickerOpen;

    useEffect(()=>{
        setanimationKey(prev=>prev+1);
    }, [animationActive]); 

    return(
        <div className="bg-black h-screen w-screen flex justify-center items-center text center pt-50">

            <div className="flex flex-col justify-center items-center gap-15">
                {
                    milTime &&
                    <div className=" text-9xl"
                    style={{fontFamily:`dseg`, color: color}}>
                        {time.toLocaleTimeString().toUpperCase()}
                    </div>
                }

                {
                    !milTime &&
                    <div className="text-9xl"
                    style={{fontFamily:`dseg`, color: color}}>
                        {time.toLocaleTimeString([],
                            {hour: "2-digit", minute: "2-digit", second:"2-digit", hour12:true})
                        }
                    </div>
                }

                <div key={animationKey} className="flex flex-col items-center justify-center gap-12">
                    
                    <button
                        onClick={()=>setmilTime(!milTime)}
                        className={`pt-10 text-3xl border-none focus:outline-none
                                    ${animationActive? "animate-disappear-bottom": "animate-appear-bottom"}`}
                        style={{color: color}}>
                            {milTime? "12 Hour": "24 Hour"}
                    </button>
                    
                    <input  type="color"
                            className={`appearance-none h-7 w-7 rounded-full border-0 p-0 cursor-pointer
                            ${animationActive? "animate-disappear-bottom": "animate-appear-bottom"}`}
                            value={color}
                            onChange={(e)=>handleColorChange(e)}
                            onFocus={()=>setColorPickerOpen(true)}
                            onBlur={()=>setColorPickerOpen(false)}
                    />
                </div>
            </div>

        </div>
    )
}

export default DigiColor;