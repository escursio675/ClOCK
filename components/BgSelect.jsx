import { useState, useEffect, useRef } from 'react';
import usefadeUi from './Hooks/usefadeUi';

function BgSelect() {
  const [time, setTime] = useState(new Date());
  const [milTime, setmilTime] = useState(true);
  const [background, setBackground] = useState(null);
  const [darkText, setdarkText] = useState(false);
  const isIdle = usefadeUi();

  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) setBackground(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!inputRef.current) return;

    if (isIdle) {
      inputRef.current.style.animation = "disappear-bottom 0.2s forwards";
      inputRef.current.onanimationend = () => {
        if (isIdle) inputRef.current.style.visibility = "hidden";
        inputRef.current.style.removeProperty("animation");
      };
    } else {
      inputRef.current.style.visibility = "visible";
      inputRef.current.style.animation = "appear-bottom 0.2s forwards";
      inputRef.current.onanimationend = () => {
        inputRef.current.style.removeProperty("animation");
      };
    }
  }, [isIdle]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center pt-40 landscape:pt-20"
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundColor: background ? "transparent" : "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center flex-col landscape:gap-12 gap-25">
        {milTime ? (
          <div className={`${darkText ? "text-black" : "text-white"} text-6xl lg:text-9xl`}>
            {time.toLocaleTimeString()}
          </div>
        ) : (
          <div className={`${darkText ? "text-black" : "text-white"} text-6xl lg:text-9xl`}>
            {time
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
              .toUpperCase()}
          </div>
        )}

        <div className="flex flex-col gap-12 items-center justify-center text-xl lg:text-2xl">
          <button
            className={`${darkText ? "text-black" : "text-white"} lg:text-3xl text-2xl 
              border-none focus:outline-none
              ${isIdle ? "animate-disappear-bottom" : "animate-appear-bottom"}`}
            onClick={() => setmilTime(!milTime)}
          >
            {milTime ? "12 Hour" : "24 Hour"}
          </button>

          <div className="focus:outline-none bg-transparent rounded-lg portrait:pl-40">
            <input
              ref={inputRef}
              className={`${darkText ? "text-black" : "text-white"}`}
              type="file"
              accept="image/*"
              onChange={handleBackgroundChange}
            />

            <button
              className={`${darkText ? "text-black" : "text-white"} portrait:pt-10 focus:outline-none
                ${isIdle ? "animate-disappear-bottom" : "animate-appear-bottom"}`}
              onClick={() => setdarkText(!darkText)}
            >
              Invert Colours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BgSelect;