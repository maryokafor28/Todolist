import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoImage } from "../Components/Icons/Icon"; // your image component

export default function LandingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Random duration between 2000ms (2s) and 4000ms (4s)
    const duration = Math.floor(Math.random() * 2000) + 2000;
    const step = 100 / (duration / 50); // update every 50ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          navigate("/onboarding"); // Redirect
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                 px-4"
    >
      {/* Landing Image */}
      <div className="mb-8 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden">
        <LogoImage />
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-2 md:w-96 md:h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-pink-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
export { LandingPage };
