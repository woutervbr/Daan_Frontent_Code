import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LogoSliderimg from "../../assets/LogoSlider.png";

const logos = [
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
    LogoSliderimg,
];

const HLogoSlider = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover: false,
        rtl: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div className="logo-slider-wrapper">
            <div className="New-container">

                <Slider {...settings}>
                    {logos.map((logo, index) => (
                        <div className="logo-slide" key={index}>
                            <img src={logo} alt={`Logo ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HLogoSlider;
