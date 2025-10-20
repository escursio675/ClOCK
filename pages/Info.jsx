import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Info() {
  const navigate = useNavigate();
  const location = useLocation();

  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailModel, setemailModel] = useState(false);

  useEffect(() => {
    const count = location.state?.visitorCount;

    if (count != null) {
      setVisitorCount(count);
      setLoading(false);
    } else {
      fetch("/api/counter")
        .then((res) => res.json())
        .then((data) => setVisitorCount(data.count))
        .catch((err) => {
          console.error("Error fetching visitor count:", err);
          setVisitorCount(null);
        })
        .finally(() => setLoading(false));
    }
  }, [location.key]);

  return (
    <div
      className="h-screen w-screen bg-[#1e2025] realative flex justify-center items-center"
      style={{ filter: emailModel ? "brightness(0.7)" : "brightness(1)" }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-10 left-7 text-[#92a4b1] text-4xl"
        style={{ fontFamily: "red-hat" }}
      >
        {"<"}
      </button>

      <div
        className="lg:h-8/10 lg:w-4/10 h-3/4 w-3/4
         bg-[#172840] rounded-xl border-2 border-[#313842] text-[#92a4b1]"
        style={{ fontFamily: "red-hat" }}
      >
        {emailModel && (
          <div
            className="fixed inset-0 flex justify-center items-center"
            style={{ filter: "brightness(1)" }}
          >
            <div className="bg-[#1e2025] p-10 rounded-xl shadow-lg w-1/3 relative">
              <h2
                className="text-xl text-center font-bold mb-4 text-[#a5b5c0]"
                style={{ fontFamily: "doto" }}
              >
                Shoot me a mail at:
              </h2>
              <p className="text-center text-xl">abhisaikia675@gmail.com</p>

              <button
                className="absolute text-xl top-2 right-2 text-[#a5b5c0] hover:text-white"
                onClick={() => setemailModel(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center 
        gap-10 pt-30 pb-30">
          <h1 className="text-5xl">ClOCK</h1>

          <h2 className="text-2xl lg:pt-25 lg:pb-10 pl-15 pt-12 pb-5" style={{ fontFamily: "doto" }}>
            Made with &#9825; by escursio
          </h2>

          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/escursio675"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="h-10 w-10 transition duration-300 filter hover:invert hover:brightness-150"
                src="/assets/github.svg"
                alt="Github"
              />
            </a>

            <a
              href="https://linkedin.com/in/saikia-abhimanyu"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="h-10 w-10 transition duration-300 filter hover:invert hover:brightness-150"
                src="/assets/linkedin.svg"
                alt="LinkedIn"
              />
            </a>

            <button onClick={() => setemailModel(true)}>
              <img
                className="h-10 w-10 transition duration-300 filter hover:invert hover:brightness-150"
                src="/assets/gmail.svg"
                alt="Gmail"
              />
            </button>

            <a
              href="https://www.instagram.com/escursio675/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="h-10 w-10 transition duration-300 filter hover:invert hover:brightness-150"
                src="/assets/instagram.svg"
                alt="Instagram"
              />
            </a>
          </div>

          {/* Visitor Counter */}
          <h2 className="lg:pt-30 pt-15 pl-5 lg:pl-0 text-xl" style={{ fontFamily: "doto" }}>
            Number of people without clocks:{" "}
            {loading
              ? "Loading..."
              : typeof visitorCount === "number"
              ? Math.floor(visitorCount / 2)
              : "Error!"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Info;
