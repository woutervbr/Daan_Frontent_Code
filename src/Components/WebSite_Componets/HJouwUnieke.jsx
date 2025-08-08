import React, { useEffect, useState } from "react";
import section2img1 from "../../assets/section2img1.png";
import section2img2 from "../../assets/section2img2.png";
import section2img3 from "../../assets/section2img3.png";
import section2img4 from "../../assets/section2img4.png";
import section2img5 from "../../assets/section2img5.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cardData = [
  {
    img: section2img1,
    button: "Stap 1",
    title: "Kies en bestel",
    titleMobile: "  Kies en bestel",
    desc: "Geef het Levensboek cadeau aan je (groot)ouder - eventueel samen met het luisterboek of het Familiegesprekken kaartspel. Tijdens het bestellen kun je direct een persoonlijke cadeau-mail klaarzetten en zelf bepalen wanneer die wordt verstuurd.",
    descMobile: "Geef het Levensboek cadeau aan je (groot)ouder.\nStel direct een persoonlijke cadeau-mail in.",
    extraClass: "extra-class-1",
  },
  {
    img: section2img2,
    button: "Stap 2",
    title: "Herinneringen verzamelen",
    titleMobile: " Herinneringen verzamelen",
    desc: "Met een inspirerende vragenlijst duikt je dierbare in zijn of haar mooiste herinneringen. Antwoorden kunnen worden ingetypt of eenvoudig ingesproken. Familieleden en vrienden kunnen op afstand meeschrijven of aanvullen.",
    descMobile: "Met wekelijkse vragen blikt je dierbare terug.\nIngetypt of ingesproken, alleen of samen.",
    extraClass: "extra-class-2",
  },
  {
    img: section2img3,
    button: "Stap 3",
    title: "Het verhaal vormgeven",
    titleMobile: "  Het verhaal vormgeven",
    desc: "Alle antwoorden worden samengebracht tot één mooi, samenhangend levensverhaal. Je kunt foto's toevoegen en video's via QR-codes verwerken. Alles is eenvoudig aan te passen.",
    descMobile: "Alle antwoorden worden één levensverhaal.\nFoto’s en video’s voeg je makkelijk toe.",
    extraClass: "extra-class-3",
  },
  {
    img: section2img4,
    button: "Stap 4",
    title: "Kies een cover en laat het boek drukken",
    titleMobile: "  Kies je cover en laat drukken",
    desc: "Na goedkeuring wordt het boek gedrukt met een omslag naar keuze. Binnen 10 werkdagen ontvang je een luxe hardcover boek, gedrukt op hoogwaardig papier.",
    descMobile: "Na goedkeuring drukken we het boek in kleur.\nBinnen 10 dagen ligt het in huis.",
    extraClass: "extra-class-4",
  },
  {
    img: section2img5,
    button: "Stap 5",
    title: "Een blijvend erfstuk",
    titleMobile: "  Een blijvend erfstuk",
    desc: "Het resultaat is een persoonlijk levensboek - eventueel met luisterboek - dat herinneringen tastbaar maakt voor nu en later. Iets om te bewaren, door te geven en samen te koesteren.",
    descMobile: "Een persoonlijk boek dat raakt en blijft.\nOm te bewaren, delen en door te geven.",
    extraClass: "extra-class-5",
  },
];

function HJouwUnieke() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="New-section-2">
      <div className="New-container">
        <div className="New-section-2-main">
          <div className="New-section-2-title">
            <h2>Herinneringen vastleggen was nog nooit zo makkelijk</h2>
          </div>

          {isMobile ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {cardData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={`New-jouwUniek-card ${item.extraClass}`}>
                    <div className="New-jouwUniek-img-btn">
                      <img src={item.img} alt="" />
                      <button>{item.button}</button>
                    </div>
                    <h2>{item.titleMobile || item.title}</h2>
                    <p  >
                      {item.descMobile || item.desc}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="New-jouwUniek-five-cards">
              {cardData.map((item, index) => (
                <div
                  className={`New-jouwUniek-card ${item.extraClass}`}
                  key={index}
                >
                  <div className="New-jouwUniek-img-btn">
                    <img src={item.img} alt="" />
                    <button>{item.button}</button>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="jouwUniek-five-btn">
            <button onClick={() => navigate("/Main_page1")}>Bestel nu</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HJouwUnieke;
