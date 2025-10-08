import Analog from "../components/Analog";
import Basic from "../components/Basic";
import Flip from "../components/FlipDigit/FlipDigit.jsx";
import BgSelect from "../components/BgSelect";
import DigiColor from "../components/DigiColor";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usefadeUi from "../components/Hooks/usefadeUi";

function Home() {
  const navigate = useNavigate();

  const items = [<Basic />, <Analog />, <DigiColor />, <Flip />, <BgSelect />];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const updateAndFetch = async () => {
      try {
        await fetch('https://api.counterapi.dev/v2/clock/clock-visitors/up');
        const response = await fetch('https://api.counterapi.dev/v2/clock/clock-visitors/');
        const data = await response.json();
        setData(data.data.up_count);
      } catch (error) {
        console.error("Error updating or fetching count:", error);
      }
    };
  
    updateAndFetch();
  }, []);


  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
    setDirection("next");
  };


  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    setDirection("prev");
  };

  // Keyboard functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const isIdle = usefadeUi();

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={() => navigate("/info", { state: { visitorCount: data } })}
        className={`z-10 text-3xl absolute top-10 right-12 text-[#697a87] underline
          ${isIdle ? "animate-disappear-top-right" : "animate-appear-top-right"}`}
      >
        More
      </button>
      <div
        className="relative h-screen w-screen flex overflow-hidden justify-center 
        items-center gap-6 bg-black text-white"
      >
        <button
          onClick={handlePrev}
          className={`absolute z-10 text-9xl left-1/16 bg-transparent focus:outline-none
            ${isIdle ? "animate-disappear-left" : "animate-appear-right"}`}
          style={{ fontFamily: "red-hat" }}
        >
          {"<"}
        </button>

        <div
          key={index}
          className={`transition-all duration-700
          ${direction === "next" ? "animate-appear-right" : "animate-appear-left"}`}
        >
          {items[index]}
        </div>

        <button
          onClick={handleNext}
          className={`absolute z-10 text-9xl right-1/16 bg-transparent focus:outline-none
            ${isIdle ? "animate-disappear-right" : "animate-appear-left"}`}
          style={{ fontFamily: "red-hat" }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Home;
