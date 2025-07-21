import React, { useEffect, useRef, useState } from "react";
import { TodoImage } from "../Components/Icons/Icon";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../Components/Button";
const slides = [
  {
    title: "Gets things done with TODO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum dictum tempus, interdum at dignissim metus. Ultricies sed nunc.",
    image: <TodoImage />,
  },
  {
    title: "Stay Organized Easily",
    description:
      "Keep track of your daily tasks and deadlines with a smart checklist system that works for you.",
    image: <TodoImage />,
  },
  {
    title: "Be More Productive",
    description:
      "Boost your focus and accomplish more by prioritizing and completing your todos with ease.",
    image: <TodoImage />,
  },
];

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-28 pb-8 text-gray-900">
      {/* Image above everything */}
      <div className="absolute top-10">{slides[current].image}</div>

      {/* Arrows and dots between image and card */}
      <div className="flex justify-between items-center mt-10 w-80 z-10">
        <button
          onClick={goToPrev}
          className="text-2xl text-black disabled:text-gray-300"
          disabled={current === 0}
        >
          <FiArrowLeft className="text-2xl" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                current === index ? "w-10 bg-pink-400" : "w-6 bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={goToNext}
          className="text-2xl text-black disabled:text-gray-300"
          disabled={current === slides.length - 1}
        >
          <FiArrowRight className="text-2xl" />
        </button>
      </div>

      {/* Card below */}
      <div
        className="w-80 rounded-2xl p-6 pt-10 mt-6 bg-white flex flex-col shadow-custom"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-center mb-4">
          <h2 className="font-bold text-xl mb-8">{slides[current].title}</h2>
          <p className="text-base mb-8">{slides[current].description}</p>
        </div>

        <Button onClick={goToNext} variant="custom">
          Get Started
        </Button>
      </div>
    </div>
  );
}
