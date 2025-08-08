import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // ✅ Icons
import Question from "../../assets/Question.png";
import SendSvg from "../WebSite_Svg/SendSvg";
import TopSvg from "../WebSite_Svg/TopSvg";
import Bottomsvg from "../WebSite_Svg/Bottomsvg";
import axios from "axios";
import Base from "antd/es/typography/Base";
import { baseUrl } from "../../baseUrl";

const faqs = [
  {
    question: "Wat zit er in het pakket?",
    answer: `Het pakket omvat een jaar lang wekelijkse vragen voor één hoofdauteur, de
mogelijkheid om tot drie medeschrijvers uit te nodigen, en één full-color hardcover
boek (tot 160 pagina’s). Verzending binnen Nederland is inbegrepen.
\n\nAls je boek meer dan 160 pagina’s bevat, rekenen we een toeslag van €30. Bij
boeken > 300 pagina’s verdelen we het automatisch over twee delen. Ter referentie:
een gemiddeld levensverhaal komt uit op zo’n 100 pagina’s.`,
  },
  {
    question: "Is Ongeschreven Leven echt veilig?",
    answer: (
      <>
        Ja, alles wat je via Ongeschreven Leven deelt, blijft persoonlijk en
        goed beschermd. Jij bepaalt wie toegang heeft tot jouw verhalen. Alles
        wordt versleuteld opgeslagen, en de communicatie tussen jouw apparaten
        en ons platform is goed beveiligd. Meer weten over hoe wij omgaan met
        jouw privacy? Lees daar hier meer over:{" "}
        <Link
          to="/Privacypolicy"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          privacy statement
        </Link>
        .
      </>
    ),
  },
  {
    question: "Kunnen grootouders dit echt gebruiken?",
    answer:
      "Zeker! Er zijn geen downloads, logins of wachtwoorden nodig. Veel gebruikers van 70 jaar en ouder bevelen Ongeschreven Leven aan.",
  },
  {
    question: "Kan ik extra boeken bestellen?",
    answer:
      "Ja, extra hardcover boeken kosten €60 (tot 160 pagina’s) of €89 (161-300 pagina’s).",
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer: `Je hebt 30 dagen bedenktijd. Ben je in die periode niet tevreden, dan wordt het
aankoopbedrag op je rekening teruggestort. Let op: zodra het boek gedrukt is, is
restitutie niet meer mogelijk.`,
  },
  {
    question: "Waarom werkt Ongeschreven Leven met een abonnement?",
    answer:
        `Het abonnement geeft je één jaar lang toegang tot alle functies van ons platform. In
de praktijk rondt 95% van onze gebruikers het boek binnen dat jaar af. Ben je toch
nog niet helemaal klaar? Dan kun je de toegang handmatig verlengen met één jaar
voor €30. Het abonnement loopt vanzelf af en wordt niet automatisch verlengd, je
gegevens worden ook niet verwijderd.`,
  },
  {
    question: "Wat als Ongeschreven Leven stopt?",
    answer:
        `Dat is natuurlijk niet de bedoeling! Maar mocht Ongeschreven Leven ooit stoppen,
dan brengen we je daar ruim van tevoren van op de hoogte. Tot dat moment blijft
alles gewoon werken zoals je gewend bent. Je hoeft je dus geen zorgen te maken -
jouw verhalen blijven veilig toegankelijk zolang onze dienst actief is.`,
  },
];

const Hfaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setMessage("E-mail is vereist.");

      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("Ongeldig e-mailformaat.");

      return;
    }

    try {
      setMessage("");
      const response = await axios.post(`${baseUrl}/subscribe`, { email });
      const result = response.data.create._id;

      if (result) {
        setEmail("");
        setMessage("Succesvol ingediend");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="Hfaq">
      <div className="New-container">
        <div className="faq-main">
          <div className="faq-left">
            <img src={Question} alt="faq" />
            <h2>Veelgestelde vragen</h2>
          </div>

          <div className="faq-right">
            {visibleFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                faq={faq}
                isActive={activeIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>

          <div className="faq-btn-box">
            <button onClick={toggleShowAll}>
              {showAll ? "Lees minder" : "Lees meer"}
            </button>
          </div>

          <div className="New-subscribe-box">
            <div className="New-subscribe-tital">
              <h2>€10,- korting bij aanmelding</h2>
              <p>
                Door je aan te melden ontvang je zo nu en dan een mail met
                inspiratie, verhalen en acties. Uitschrijven kan op elk moment.
              </p>
            </div>
            <div className="New-subscribe-input-main">
              <div className="New-subscribe-input">
                <input
                  type="text"
                  placeholder="E-mailadres invullen "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubmit}>
                  <SendSvg />
                </button>
              </div>
              <span>
                {message !== "" && message && (
                  <p style={{ fontWeight: 500, color: "red" }}>*{message}</p>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ faq, isActive, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isActive) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isActive]);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onClick}>
        <h2>{faq.question}</h2>
        <span className="faq-icon">
          {isActive ? <Bottomsvg /> : <TopSvg />}
        </span>
      </button>
      <div
        ref={contentRef}
        className="faq-answer"
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div className="faq-answer-text">
          {
            typeof faq.answer === "string"
              ? faq.answer
                  .split("\n\n")
                  .map((para, idx) => <p key={idx}>{para}</p>)
              : faq.answer // Already JSX — render directly
          }
        </div>
      </div>
    </div>
  );
};

export default Hfaq;
