import React, { useEffect, useState } from "react";
import HWorks1 from '../../assets/Gif/step1.gif';
import HWorks2 from '../../assets/Gif/step2.gif';
import HWorks3 from '../../assets/Gif/step3.gif';
import HWorks4 from '../../assets/Gif/step4.jpeg';
import HWorks5 from '../../assets/Gif/step5.jpeg';
import NewStepSvg from "../WebSite_Svg/NewStepSvg";
import { useLocation, useNavigate } from "react-router-dom";

const stepsData = [
    {
        step: "Stap 01",
        title: "  het Levensboek",
        description: "Verras je dierbare met het Levensboek - optioneel inclusief luisterboek en het Familiegesprekken kaartspel. Tijdens het bestellen geef je aan wanneer het cadeau verzonden mag worden. Jij kiest het moment, wij regelen de rest.",
        image: HWorks1,
    },
    {
        step: "Stap 02",
        title: "Herinneringen verzamelen",
        description: "Met de zorgvuldig gekozen vragen duikt je dierbare in waardevolle herinneringen. Alleen of samen – vaak ontstaan er warme gesprekken en bijzondere momenten.",
        image: HWorks2,
        points: [
            "Gebruiksvriendelijke interface: Speciaal ontworpen voor alle leeftijden",
            "Samen herinneringen toevoegen: Familie en vrienden kunnen op afstand meeschrijven",
            "Herinneringsmeldingen: Zachte aanmoedigingen om verder te gaan",
            "Spraak-naar-tekst: Vertel het verhaal hardop, ideaal voor wie niet graag schrijft",
        ],
    },
    {
        step: "Stap 03",
        title: "Het verhaal vormgeven",
        description: "De antwoorden worden verwerkt tot een prachtig en samenhangend levensverhaal, zorgvuldig geschreven en volledig afgestemd op de toon, stijl en wensen van de maker.",
        image: HWorks3,
        points: [
            "Omslag kiezen: Kies een omslag die perfect past bij het verhaal",
            "Foto’s en video’s toevoegen: Foto’s worden direct in het boek afgedrukt; video’s worden omgezet in scanbare QR-codes",
            "Aanpassingen maken: Bekijk en bewerk het verhaal eenvoudig in de online omgeving",
        ],
    },
    {
        step: "Stap 04",
        title: "Jouw verhaal wordt werkelijkheid",
        description: "Zodra alle antwoorden binnen zijn, gaan wij aan de slag. Binnen 10 werkdagen wordt het verhaal professioneel opgemaakt, gedrukt en gebonden tot een luxe hardcover boek.",
        image: HWorks4,
        points: [
            "Luxe uitvoering: Full color druk op hoogwaardig papier, met een gepersonaliseerde hardcover.",
            "Verhaalopmaak: Je kiest zelf – we nemen je antwoorden één-op-één over, of maken er een vloeiend verhaal van met behoud van jouw toon en stijl",
        ],
    },
    {
        step: "Stap 05",
        title: "Een cadeau vol betekenis",
        description: "Het resultaat? Een tastbaar en tijdloos boek vol herinneringen - om te bewaren, te herlezen, te delen met familie en door te geven aan volgende generaties.",
        image: HWorks5,
        points: [
            "Luisterboek (optioneel): Beluister het verhaal in een passende, zorgvuldig gekozen stem.",
            "Familiegesprekken kaartspel (optioneel): Start mooie gesprekken aan tafel en haal samen nog meer herinneringen op.",
            "Extra exemplaren bestellen: Voor broers, zussen of kleinkinderen – direct of later",
            "Meerdere afleveradressen: Laat het boek naar verschillende familieleden sturen, ideaal voor families die verspreid wonen.",
        ],
    },
];


const HWorks = () => {
    const navigate = useNavigate(); 
  

    return (
        <section  className="HWorks ">
            <div className="New-container">
                <div className="mainHWorks">
                    <div className="HWorks-box">
                        {stepsData.map((item, index) => (
                            <StepCard key={index} item={item} isFirst={index === 0} />
                        ))}
                    </div>
                    <div className="HWorks-btn-box">
                        <button onClick={()=>navigate("/Main_page1")}>Bestel nu</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StepCard = ({ item, isFirst }) => {
    const [showPoints, setShowPoints] = useState(false);

    const togglePoints = () => {
        setShowPoints((prev) => !prev);
    };

    return (
        <div className={`HWorks-card ${isFirst ? "first-card-extra-class" : ""}`}>
            <div className="HWorks-tital">
                <span>
                    <div className="new-span-svg">
                        <NewStepSvg />
                    </div>
                    <h3>{item.step}</h3>
                </span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>

                {/* Points with toggle button */}
                {item.points && item.points.length > 0 && (
                    <>
                        {showPoints && (
                            <ul>
                                {item.points.map((point, i) => {
                                    const [boldText, ...rest] = point.split(":");
                                    const normalText = rest.join(":");

                                    return (
                                        <li key={i}>
                                            <strong>{boldText.trim()}</strong>
                                            {normalText && `: ${normalText.trim()}`}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <button onClick={togglePoints}>
                            {showPoints ? "Lees minder" : "Lees meer"}
                        </button>
                    </>
                )}
            </div>

            <div className="HWorks-img">
                <img src={item.image} alt={item.title} />
            </div>
        </div>
    );
};

export default HWorks;
