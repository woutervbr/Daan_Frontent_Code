import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import section1img1 from "../../assets/section1img1.png";
import section1img2 from "../../assets/section1img2.png";
import section1img3 from "../../assets/section1img3.png";
import category1img from "../../assets/category1img.png";
import category2img from "../../assets/category2img.png";
import category3img from "../../assets/category3img.png";
import category4img from "../../assets/category4img.png";

// Original items (you can ignore if not used here)
const originalItems = [
  { img: section1img1, text: "Hoogwaardige kwaliteit" },
  { img: section1img2, text: "Kies je eigen cover" },
  { img: section1img3, text: "Spreek je verhaal in" },
];

// Main card data
const cardItems = [
  {
    img: category1img,
    text: "Hoogwaardige kwaliteit",

  },
  {
    img: category2img,
    text: "Spreek je verhaal in",

  },
  {
    img: category3img,
    text: "Voeg video's toe",

  },
  {
    img: category4img,
    text: "30 dagen bedenktijd",

  },
];

function HSuperior({ classname = "" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 👇 Duplicate the items for smooth infinite scroll
  const data_to_show = [...cardItems, ...cardItems, ...cardItems];

  const settings = {
    dots: false,
    infinite: true,
    speed: 10000, // slower speed = smoother scroll
    slidesToShow: isMobile ? 1.3 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    swipe: false, // Optional: disable swipe
    draggable: false, // Optional: disable dragging
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
        },
      },
    ],
  };

  return (
    <section className={`New-section-6 ${classname}`}>
      <div className="main-New-section-6">
        <div className="slick-container">
          <Slider {...settings}>
            {data_to_show.map((item, index) => (
              <div key={index} className="slick-slide">
                <div className="New-category-card">
                  <div className="flex-item-box">
                    <div className="category-img">
                      <img src={item.img} alt={item.text} />
                    </div>
                    <h2>{item.text}</h2>
                 
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default HSuperior;
