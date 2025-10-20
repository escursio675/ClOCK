import {useState, useEffect} from 'react'

function Analog(){

    const [angles, setAngles]=useState({secs:"", mins:"", hrs:""});
    const [time, setTime]=useState(new Date());

    useEffect(()=>{
        const secs=time.getSeconds();
        const mins=time.getMinutes();
        const hrs=time.getHours();

        const secAngle=secs*6;
        const minAngle=mins*6+secs*0.1;
        const hrAngle=(hrs % 12)*30+(mins/60)*30;

        setAngles({secs:secAngle, mins:minAngle, hrs:hrAngle});

        const interval=setInterval(()=>setTime(new Date()), 1000);

        return ()=>clearInterval(interval);
    },[time])

    return(
        <div className='bg-black w-screen h-screen flex justify-center items-center'>
            {/* <div className="absolute top-8 text-center pt-4">
                        <h2 className="text-white text-4xl">ClOCK</h2>
                    </div> */}
            {/*Clock face */}
            <div className=' relative h-70 w-70 lg:h-140 lg:w-140 border-white border-5 rounded-full'>
                {/*Hour hand */}
                <div className='absolute top-1/2 left-1/2 origin-bottom  w-1 h-17 
                lg:w-2 lg:h-35 bg-white rounded' 
                style={{transform: `translate(-50%, -100%) rotate(${angles.hrs}deg)`}}></div>

                {/*Minute hand */}
                <div className='absolute top-1/2 left-1/2 lg:w-1 lg:h-50 w-1 h-25
                origin-bottom bg-white rounded'
                style={{transform: `translate(-50%, -100%) rotate(${angles.mins}deg)`}}></div>

                {/*Second Hand */}
                <div className='absolute top-1/2 left-1/2 w-0.5 h-30 lg:w-0.5 lg:h-60
                origin-bottom bg-red-500'
                style={{transform: `translate(-50%, -100%) rotate(${angles.secs}deg)`}}></div>
            </div>
        </div>
    )

}

export default Analog;