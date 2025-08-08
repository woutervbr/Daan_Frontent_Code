import React, { useEffect, useRef, useState } from "react";

import Newleft from "../WebSite_Svg/Newleft";
import NewRight from "../WebSite_Svg/NewRight";

const HBookSalider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(""); // "left" or "right"
  const [animationClass, setAnimationClass] = useState("");
  const imgRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleScrollLeft = () => {
    if (activeIndex > 0) {
      triggerAnimation("right");
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (activeIndex < images.length - 1) {
      triggerAnimation("left");
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      handleScrollRight();
    } else if (deltaX < -50) {
      handleScrollLeft();
    }
  };

  const triggerAnimation = (dir) => {
    setAnimationClass(""); // Step 1: clear class

    // Step 2: Wait for next paint to re-apply class
    requestAnimationFrame(() => {
      setAnimationClass(`slide-${dir}`);
    });
  };

  const dotIndices = [0, Math.floor(images.length / 2), images.length - 1];


  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const activeThumb = container?.children?.[activeIndex];
  
    if (container && activeThumb) {
      const thumbOffsetLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const containerWidth = container.offsetWidth;
  
      const scrollLeft = thumbOffsetLeft - (containerWidth - thumbWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeIndex]);
  
  

  return (
    <div className="HBookSalider">
      <div
        className="HBookSalider-main-img"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imgRef}
          src={images[activeIndex]}
          alt="main-book"
          className={animationClass}
        />
      </div>

      {/* Only show 3 dots on mobile */}
      <div className="HBookSalider-dots mobile-only">
        {dotIndices.map((index, i) => (
          <span
            key={i}
            className={`dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              setDirection(index > activeIndex ? "left" : "right");
              setActiveIndex(index);
            }}
          />
        ))}
      </div>

      {/* Full card selector for desktop */}
      <div className="HBookSalider-box">
        <button onClick={handleScrollLeft}>
          <Newleft />
        </button>

        <div
  className="HBookSalider-card-box desktop-only"
  ref={thumbnailContainerRef}
>
  {images.map((img, index) => (
    <div
      key={index}
      className="HBookSalider-card"
      style={{
        border: activeIndex === index ? "3px solid #4F6780" : "none",
        cursor: "pointer",
      }}
      onClick={() => {
        triggerAnimation(index > activeIndex ? "left" : "right");
        setActiveIndex(index);
      }}
    >
      <img src={img} alt={`img-${index}`} />
    </div>
  ))}
</div>


        <button onClick={handleScrollRight}>
          <NewRight />
        </button>
      </div>
    </div>
  );
};

export default HBookSalider;
