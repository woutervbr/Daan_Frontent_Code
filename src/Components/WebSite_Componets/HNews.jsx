import React, { useEffect, useState } from "react";
import newsimg1 from "../../assets/Gif/new1.gif";
import newsimg2 from "../../assets/Gif/new2.gif";
import newsimg3 from "../../assets/Gif/new3.gif";
import newsimg4 from "../../assets/Gif/new4.gif";
import newsimg5 from "../../assets/Gif/new5.gif";
import newsimg6 from "../../assets/Gif/new6.gif";
import newsimg7 from "../../assets/Gif/new7.gif";
import newsimg8 from "../../assets/Gif/new8.gif";
import NewSvg from "../WebSite_Svg/NewSvg";
import blog1 from "../../assets/Gif/blog1.png";
import { useLocation, useNavigate } from "react-router-dom";
import blog2 from "../../assets/Gif/blog2.png";
import blog3 from "../../assets/Gif/blog3.png";
import blog4 from "../../assets/Gif/blog4.png";
import blog6 from "../../assets/Gif/blog6.png";
import blog7 from "../../assets/Gif/blog7.png";
import blog8 from "../../assets/Gif/blog8.png";
import blog9 from "../../assets/Gif/blog9.png";
import blog10 from "../../assets/Gif/blog10.png";
import blog11 from "../../assets/Gif/blog11.png";
import blog12 from "../../assets/Gif/blog12.png";
import blog13 from "../../assets/Gif/blog13.png";
const newsData = [
  {
    id: 1,
    date: "08 August 2025",
    text: `Waarom herinneringen verdwijnen en hoe je ze kunt bewaren Soms weet je het ineens niet meer. Hoe dat oude huis rook waar je opgroeide. Of hoe je vader precies klonk als hij je naam riep vanaf de trap.`,
    image: blog1,
    navigate: "/blog1",
    filter: ["all", "tips&inspiration"],
  },
  {
    id: 2,
    date: "07 August 2025",

    text: `Familiegesprekken: het kaartspel dat generaties verbindt Of je nu op zoek bent naar een betekenisvol cadeau voor je ouders of opa en oma, of gewoon een avondje echte gesprekken wilt aan tafel`,
    image: blog2,
    navigate: "/blog2",

    filter: ["all", "news"],
  },
  {
    id: 3,
    date: "14 August 2025",
    text: `We snappen heel goed dat je zorgvuldig wilt omgaan met iets zó persoonlijks als herinneringen, verhalen, foto's en filmpjes. Daarom nemen wij jouw privacy en veiligheid uiterst serieus.`,
    image: blog3,
    navigate: "/blog3",
    filter: ["all", "gifts"],
  },
  {
    id: 4,
    date: "14 August 2025",
    text: `Bij Ongeschreven Leven betaal je één keer voor een compleet pakket. Daarin zit standaard een gedrukt boek tot 160 pagina’s. Een gemiddeld Levensboek telt zo’n 100 pagina’s, inclusief foto’s.`,
    image: blog4,
    navigate: "/blog4",
    filter: ["all", "gifts"],
  },
  {
    id: 5,
    date: "08 August 2025",
    text: `Herinneringen laat je niet afraffelen. Ze komen wanneer ze willen — bij een kop thee, op een bankje in de zon, of gewoon aan de keukentafel. Daarom kun je bij Ongeschreven Leven..`,
    image: blog6,
    navigate: "/blog6",
    filter: ["all", "tips&inspiration"],
  },
  {
    id: 6,
    date: "08 August 2025",
    text: `Een levensverhaal cadeau doen, klinkt groots. Maar bij Ongeschreven Leven is het verrassend eenvoudig. In vijf overzichtelijke stappen geef je iemand de kans om zijn of`,
    image: blog7,
    navigate: "/blog7",
    filter: ["all", "tips&inspiration"],
  },
  {
    id: 7,
    date: "08 August 2025",
    text: `Sommige mensen typen niet graag. En dat hoeft ook niet.
Met Ongeschreven Leven kun je simpelweg praten en het systeem zet je woorden automatisch om in tekst.`,
    image: blog8,
    navigate: "/blog8",
    filter: ["all", "tips&inspiration"],
  },
  {
    id: 8,
    date: "08 August 2025",
    text: `Een verhaal wordt pas écht levend met beelden. Daarom kun je bij Ongeschreven Leven heel eenvoudig foto’s en video’s toevoegen bij elke herinnering.`,
    image: blog9,
    navigate: "/blog9",
    filter: ["all", "tips&inspiration"],
  },
  {
    id:9,
    date: "08 August 2025",
    text: `In het Levensboek van Ongeschreven Leven kunnen ook filmpjes verwerkt worden. Dat gebeurt heel makkelijk: via een QR-code die bij een herinnering in het boek gedrukt wordt.`,
    image: blog10,
    navigate: "/blog10",
    filter: ["all", "tips&inspiration"],
  },
  {
    id:10,
    date: "08 August 2025",
    text: `Iedereen is anders, dus elk Levensboek mag er ook anders uitzien.
Bij Ongeschreven Leven kun je zelf de omslag kiezen. Upload een foto, kies een titel en selecteer een kleur die past bij het verhaal.
`,
    image: blog11,
    navigate: "/blog11",
    filter: ["all", "tips&inspiration"],
  },

  {
    id:11,
    date: "08 August 2025",
    text: `Ongeschreven Leven is ontworpen met één gedachte: iedereen moet ermee overweg kunnen. Ook als je 76 bent, geen smartphone hebt of technologie spannend vindt.`,
    image: blog12,
    navigate: "/blog12",
    filter: ["all", "tips&inspiration"],
  },

  {
    id:12,
    date: "08 August 2025",
    text: `En dan ligt het boek op tafel. Een hardcover vol verhalen, foto’s, herinneringen. Iets tastbaars dat je kunt vasthouden. Iets dat blijft. Ouders bladeren erin met een glimlach`,
    image: blog13,
    navigate: "/blog13",
    filter: ["all", "tips&inspiration"],
  },
















  {
    id:14,
    date: "31 July 2025",
    text: `Tips voor het invullen van je vragenlijst
Een persoonlijke en praktische gids om van jouw vragenlijst een betekenisvol levensverhaal te maken. Waarom deze vragenlijst belangrijk is
Jouw`,
    image: blog1,
    navigate: "/blog1",
    filter: ["all", "tips&inspiration"],
  },

];



























const filters = [
  {
    id: 1,
    name: "Alle berichten", // All
    filter: "all",
  },
  {
    id: 2,
    name: "Veelgestelde vragen", // Gifts
    filter: "gifts",
  },
  {
    id: 3,
    name: "Tips & inspiratie", // Tips & Tricks
    filter: "tips&inspiration",
  },
  {
    id: 4,
    name: "Gebruikerservaringen", // Great Questions
    filter: "users",
  },
  {
    id: 5,
    name: "Nieuws & updates", // Webinars
    filter: "news",
  },
];

const HNews = () => {
  const [activefilter, setActiveFilter] = useState(filters[0]);
  const [filterData, setFilterData] = useState(newsData);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location?.state?.filter);
    if (location?.state?.filter) {
      const filtered = newsData?.filter((f) =>
        f.filter.includes(location.state.filter)
      );
      setFilterData(filtered);
      setActiveFilter(filters?.find((f) => f.filter === location.state.filter));
    }
  }, [location, newsData]);

  useEffect(() => {
    const filterData = newsData.filter((item) =>
      item.filter.includes(activefilter.filter)
    );
    setFilterData(filterData);
  }, [activefilter]);
  const handleClick = (fil) => {
    setActiveFilter(fil);
  };
  return (
    <section className="New-News-section">
      <div className="New-container">
        <div className="New-News-mian">
          <div className="News-filter-main">
            <h1>Nieuws</h1>
            <p>Filters:</p>
            <div className="all-box">
              {filters?.map((fil, i) => (
                <div
                  onClick={() => handleClick(fil)}
                  key={i}
                  className={`   filter-box ${
                    activefilter === fil ? "active" : ""
                  }`}
                >
                  {fil.name}
                </div>
              ))}
            </div>
          </div>
          <div className="New-News-six-cards">
            {filterData?.length == 0 ? (
              <div className="no-blog">
                <p>Geen blogs gevonden</p>
              </div>
            ) : (
              filterData?.map((item) => (
                <div className="News-card" key={item.id}>
                  <div className="News-img">
                    <img src={item.image} alt={`News ${item.id}`} />
                  </div>
                  <div className="News-card-title">
                    <h3>{item.date}</h3>
                    <p>{item.text}</p>
                    <button onClick={() => navigate(item.navigate)}>
                      LEES MEER <NewSvg />{" "}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HNews;
