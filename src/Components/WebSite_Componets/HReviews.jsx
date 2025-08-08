import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Reviewsimg from "../../assets/newdp.jpeg";
import googleimg from "../../assets/google-img.png";
// import GoogleReviewsWidget from "google-reviews-widget";

const testimonials = [
  {
    name: "Luuk Hooijmans",
    rating: 5,
    text: "Ik heb het cadeau gegeven aan zowel mijn moeder én schoonmoeder. Twee keer een schot in de roos! Beide vonden ze het makkelijk en fijn in gebruik. Vond het ook wel tof dat ik als (schoon) zoon vragen kon stellen, die zij vervolgens kon beantwoorden. Echt een heel fijn en bijzonder cadeau!",
    image: "",
  },
  {
    name: "Anouk Haagh",
    rating: 5,
    text: "Wat een ontzettend waardevol cadeau is dit voor mijn oma (jaja 93 jaar), zodat we samen obv de vragen al haar herinneringen van vroeger kunnen ophalen. Hierdoor ben ik zelfs meer te weten te komen over haar tijd in de kostschool. Je kunt het je niet meer voorstellen!",
    image: Reviewsimg,
  },
  {
    name: "Roy",
    rating: 5,
    text: "Wat een aangename verrassing dat ik dit proces met mijn moeder heb mogen doorlopen. Ondanks de digitale vragenlijst verliep alles vlekkeloos en was het zelfs ontzettend leuk om deze samen in te vullen en oude herinneringen op te halen. De vragen zijn ontzettend goed bedacht en zetten je daardoor aan het denken. Hierdoor kwamen we zelfs tot nieuwe gespreksonderwerpen. Super tof! Daarnaast vonden wij de service en afwerking van het fysieke boek van hoge kwaliteit. Herinneringen die we samen hebben vastgelegd, die een enorme waarde vertegenwoordigen. Enorm veel dank voor deze mooie ervaring, herinnering en toffe eindresultaat! Gr. Moeders en Roy",
    image: "",
  },
  {
    name: "stan linders",
    rating: 3,
    text: "Samen met oma hebben we dit boek gemaakt. Van de boerderij tot de dorpskermis. Voor haar een feest van herinneringen, voor ons een Brabants boek vol goud waard. Het was heerlijk om haar verhalen tot leven te zien komen.",
    image: "",
  },
  {
    name: "Lucas Gosker",
    rating: 5,
    text: "Mijn oma is niet handig met computers, maar dit platform was verrassend eenvoudig. En de spraakfunctie hielp enorm. Haar boek is prachtig geworden, vol met foto’s en verhalen uit haar leven. Daarom 5 sterren!",
    image: "",
  },
  {
    name: "marleen portegies",
    rating: 5,
    text: "Vorige maand kreeg ik voor mijn verjaardag Ongeschreven Leven cadeau van mijn kinderen. Ze vroegen me om daarmee aan de slag te gaan, zodat ze een mooi document zouden krijgen over mijn leven. Toen ik ermee begon, kreeg ik er hoe langer hoe meer plezier in. Er kwamen telkens meer leuke herinneringen bovendrijven. Ik heb veel foto’s toegevoegd en vond zelfs nog een paar foto’s van mijn oma’s en opa’s! De website werkt supergoed, heel gemakkelijk. Af en toe kwamen mijn kinderen kijken hoe ver ik al was. En nu heb ik onlangs het boek ontvangen. In één woord geweldig! Hele mooie kwaliteit en precies zoals ik het me voorstelde. Een mooier cadeau kom ik niet krijgen én geven aan mijn kinderen! Heel blij!",
    image: "",
  },
  {
    name: "Martin Vermeulen",
    rating: 5,
    text: "Wel digibeet, maar met een beetje hulp kon ik gewoon mijn verhaal inspreken. Ongelooflijk dat het zo makkelijk ging. Het eindresultaat is prachtig.",
    image: Reviewsimg,
  },
  {
    name: "Yoas Huwaë",
    rating: 5,
    text: "Dankzij Ongeschreven Leven hebben we het levensverhaal van mijn moeder op een heel mooie manier kunnen vastleggen. Ze vertelde open over haar jeugd in de barakken, de eerste ontmoeting met mijn vader, hun huwelijk en de geboorte van mijn zus en mij. Stuk voor stuk dierbare herinneringen, nu bewaard in haar eigen stem en een uniek boek.",
    image: "",
  },
];

const HReviews = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  // const instanceId = "Wvik5YOlFIb0ViqMtYis";
  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
//  useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://static.elfsight.com/platform/platform.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);
const handleOptionClick = ()=>{
  window.open("https://www.google.com/maps/place/Ongeschreven+Leven/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x4bd39bbb962344b7:0x3101f80fc4f97b8e!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11xfj536t0!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D", "_blank");
}
const writeReview = ()=>{
  window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");

}
   
  return (
    <section className="HReviews">
      <div className="New-container">
        <div className="testimonial-section">
          <h2 className="testimonial-heading">Schrijf een review</h2>
          {/* <div
            className="elfsight-app-31ecd6c7-95c4-45d8-bd0f-515ed300a35a"
            data-elfsight-app-lazy
          ></div> */}
          <Slider {...settings} className="testimonial-slider">
            {testimonials.map((item, index) => (
              <div key={index}>
                <div className="testimonial-card">
                  <img
                    className="avatar"
                    src={item.image ? item.image : Reviewsimg}
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <div className="stars">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                  <p
                    className={`text-para ${
                      expandedIndex === index ? "expanded" : "collapsed"
                    }`}
                  >
                    {item.text}
                  </p>
                  {item.text.length > 200 && (
                    <button
                      className="read-more-button"
                      onClick={() => toggleReadMore(index)}
                    >
                      {expandedIndex === index ? "Lees minder" : "Lees meer"}
                    </button>
                  )}
                  <img  onClick={handleOptionClick} src={googleimg} alt="Google" className="google-logo" />
                </div>
              </div>
            ))}
          </Slider>
          <div className="review-button-wrapper">
            <button  onClick={writeReview} className="review-button">Schrijf een review</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HReviews;
