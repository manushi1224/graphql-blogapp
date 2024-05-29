"use client";

import { useEffect, useState } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 400 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 bg-fuchsia-800 shadow-sm shadow-fuchsia-600 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <div className=" border-l-[10px] border-r-[10px] border-r-transparent border-l-transparent border-b-[15px] border-b-fuchsia-200 ml-auto mr-auto mt-[5%] mb-[15%] w-0 h-0"></div>
    </button>
  );
};

export default GoToTop;
