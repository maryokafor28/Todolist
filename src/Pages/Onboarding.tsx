import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookImage } from "../Components/Icons/Icon";
import Button from "../Components/Button";

const slides = [
  {
    title: "Gets things done with TODO",
    description:
      "Plan smarter, stress less, and stay on top of your day with a simple and powerful to‑do app designed just for you.",

    image: <BookImage />,
  },
  {
    title: "Stay Organized Easily",
    description:
      "Keep track of your daily tasks and deadlines with a smart checklist system that works for you.",
    image: <BookImage />,
  },
  {
    title: "Be More Productive",
    description:
      "Boost your focus and accomplish more by prioritizing and completing your todos with ease.",
    image: <BookImage />,
  },
];

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    navigate(users.length > 0 ? "/login" : "/register");
  };

  // Auto slide every 5s
  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

  // Touch gestures for swipe
  const goToNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goToPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8
      text-gray-900 dark:text-white 
      
      md:flex-row md:items-center md:justify-center md:gap-20 md:px-20 md:pt-0"
    >
      {/* IMAGE SECTION - mobile: centered, desktop: left side */}
      <div className="mb-6 md:mb-0 relative flex justify-center md:justify-end ">
        <div className="w-56 h-full md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-xl overflow-hidden shadow-lg">
          <div className="w-full h-auto object-">{slides[current].image}</div>
        </div>
      </div>

      {/* TEXT + DOTS + BUTTON SECTION */}
      <div
        className="w-80 md:w-[600px] rounded-2xl p-8 md:p-12 bg-white dark:bg-gray-800 shadow-custom text-center md:text-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Title */}
        <h2 className="font-bold text-xl md:text-3xl mb-4 md:mb-6">
          {slides[current].title}
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg mb-6 md:mb-8">
          {slides[current].description}
        </p>

        {/* Dots (above button) */}
        <div className="flex gap-2 justify-center md:justify-center mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                current === index ? "w-4 bg-pink-400" : "w-2 bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Button */}
        <Button onClick={handleGetStarted} variant="custom" className="w-full">
          Get Started
        </Button>
      </div>
    </div>
  );
}
