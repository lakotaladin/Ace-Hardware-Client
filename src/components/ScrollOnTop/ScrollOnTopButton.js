import React, { useState } from "react";
import { UpOutlined } from "@ant-design/icons";
import "../ScrollOnTop/style.css"; // Prilagodite ime CSS fajla prema vašim potrebama

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dodajte event listener za praćenje skrolovanja
  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <UpOutlined className="icon" />
    </button>
  );
};

export default ScrollToTopButton;
