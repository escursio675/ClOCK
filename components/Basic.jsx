import {useState, useEffect} from 'react';
import usefadeUi from './Hooks/usefadeUi';

function Basic(){
    
    const [time, setTime]=useState(new Date());
    const [milTime, setmilTime]=useState(true);
    const [animationKey, setanimationKey]=useState(0);

    const isIdle=usefadeUi();

    useEffect(()=>{
        const interval=setInterval(()=> setTime(new Date()), 1000);

        return ()=>clearInterval(interval);
    }, []);

    useEffect(()=>{
        setanimationKey(prev=>prev+1);
    }, [isIdle]);

    return(
        <>
            <div
             className='bg-[#000000] h-screen w-screen flex items-center justify-center pt-20'>
                <div className='flex items-center justify-center flex-col gap-25'>

                    {milTime===true && <div className='bg-[#000000]'>
                    <h1 className='text-[#ffffff] text-6xl lg:text-9xl '>{time.toLocaleTimeString()}
                    </h1>
                </div>}

                { milTime===false && <div className='bg-[#000000]'>
                    <h1 className='text-[#ffffff] text-6xl lg:text-9xl'>{time.toLocaleTimeString([],
                        {hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true}).toUpperCase()}
                    </h1>
                </div> }

                <button key={animationKey}
                  className={`text-white text-3xl lg:text-5xl border-none focus:outline-none
                    ${isIdle? "animate-disappear-bottom": "animate-appear-bottom"}`}
                onClick={()=>setmilTime(!milTime)}>{milTime? "12 Hour": "24 Hour"}</button>

                </div>

            </div>
        </>
    )

}

export default Basic;