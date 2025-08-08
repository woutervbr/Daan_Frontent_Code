import React, { useState, useRef } from "react";


import Newleft from "../WebSite_Svg/Newleft";
import NewRight from "../WebSite_Svg/NewRight";

const HBookSalider2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardBoxRef = useRef(null);

    const images = [
        bookslide1,
        bookslide2,
        bookslide3,
        bookslide4,
        bookslide5,
  
       
    ];

    const scrollAmount = 130; // approx width of one card

    const handleScrollLeft = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            cardBoxRef.current.scrollLeft -= scrollAmount;
        }
    };

    const handleScrollRight = () => {
        if (activeIndex < images.length - 1) {
            setActiveIndex(activeIndex + 1);
            cardBoxRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="HBookSalider">
            <div className="HBookSalider-main-img">
                <img src={images[activeIndex]} alt="" />
            </div>

            <div className="HBookSalider-box">
                <button onClick={handleScrollLeft}><Newleft /></button>

                <div className="HBookSalider-card-box" ref={cardBoxRef}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="HBookSalider-card"
                            style={{
                                border: activeIndex === index ? "3px solid #4F6780" : "none",
                                cursor: "pointer"
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={img} alt="" />
                        </div>
                    ))}
                </div>

                <button onClick={handleScrollRight}><NewRight /></button>
            </div>
        </div>
    );
};

export default HBookSalider2;
