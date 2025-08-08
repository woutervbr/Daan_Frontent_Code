import React from "react";
import googleimg from "../../assets/google-img.png";
import starimg from "../../assets/star-img.png";
import HBookSalider1 from "./HBookSalider1";
import newdp from "../../assets/newdp.jpeg";

import bookslide1 from "../../assets/new-img/pic8new.png";
import bookslide2 from "../../assets/new-img/pic13.jpeg";
import bookslide3 from "../../assets/new-img/pic7.jpeg";
import bookslide4 from "../../assets/new-img/pic10.jpeg";
import bookslide5 from "../../assets/new-img/pic8.jpeg";
import bookslide6 from "../../assets/new-img/pic13.jpeg";
import Filter1 from "./Filter1";
import HBookSalider from "./HBookSalider";

const Description = ({ handleOptionClick }) => {
  return (
    <>
      <div className="options-list-1">
        <h2 onClick={handleOptionClick} className="select-option">
          Een verhaal dat verder gaat dan papier
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Soms zegt een stem meer dan woorden alleen. Met het luisterboek wordt
          het levensverhaal van je ouder of grootouder professioneel ingesproken
          – in een stem die raakt.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Kies uit zes warme stemmen
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Of je nu kiest voor zacht en helder of warm en gedragen: je selecteert
          een stem die past bij het verhaal. Wij zorgen voor de rest.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Voor onderweg, thuis of op afstand
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Het luisterboek is eenvoudig te delen en op elk moment te beluisteren
          – samen met familie of in alle rust alleen.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Een extra manier om herinneringen te beleven
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Voor wie liever luistert dan leest, of gewoon op een andere manier het
          verhaal wil voelen.
        </p>

        <p onClick={handleOptionClick} className="select-option">
          Een cadeau dat je niet alleen vasthoudt, maar ook hoort.
        </p>
      </div>
    </>
  );
};

const MobileDescription = ({ handleOptionClick }) => {
  return (
    <>
      <div className="options-list-1">
        <h2 onClick={handleOptionClick} className="select-option">
          Een cadeau dat meteen iets in gang zet
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Sommige verhalen wil je niet alleen lezen, je wilt ze horen. Rustig,
          vol emotie en in een stem die bij het verhaal past.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Kies een stem, wij doen de rest
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Met zes professionele stemmen (drie vrouwen, drie mannen) komt elk
          hoofdstuk tot leven.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Samen luisteren, waar je ook bent
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          In de auto, thuis of op afstand met familie, het luisterboek is altijd
          dichtbij.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Een extra manier om herinneringen te beleven
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Voor wie liever luistert dan leest. Of gewoon allebei.
        </p>
      </div>
    </>
  );
};

function HAUDIOBOOK() {
  const HAUDIOBOOKImages = [
    bookslide1,
    bookslide2,
    bookslide3,
    bookslide4,
    bookslide5,
    bookslide6,
  ];

  const handleOptionClick = ()=>{
    window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");
  }

  return (
    <>
      <section className="New-Memories">
        <div className="New-container">
          <div className="New-main-Memories">
            <div className="New-Memories-salide">
              <HBookSalider images={HAUDIOBOOKImages} />
            </div>

            <div className="New-Preserving-Memories">
              <h1>Het Luisterboek</h1>
              <div onClick={handleOptionClick} className="small-title-google">
                <div className="google-img">
                  <img src={googleimg} alt="" />
                </div>
                <div  className="google-title">
                  <h3>Google Reviews</h3>
                  <div className="google-title-star-img">
                    <h3>4.9</h3>
                    <span className="five-star">★★★★★</span>
                  </div>
                </div>
              </div>
              <p>
                Een professioneel ingesproken luisterboek dat het verhaal tot
                leven brengt.
              </p>

              <div className="box-span-New">
                <h3>€25</h3>
                <span>
                  <h4>€35</h4>{" "}
                </span>
              </div>

              <ul className="destok-show">
                <li>
                  <span>Professionele vertelling: </span> Kies uit zes
                  verschillende stemmen (drie mannelijke, drie vrouwelijke) voor
                  de perfecte vertolking.{" "}
                </li>

                <li>
                  <span>Een blijvende verbinding:</span> Geeft kinderen en
                  kleinkinderen de kans om dieper in het verhaal te duiken
                </li>
                <li>
                  <span>Meer dan tekst: </span>De professionele vertelling voegt
                  emotie en nuance toe.
                </li>
                <li>
                  <span>Altijd dichtbij:</span> Eenvoudig te beluisteren en te
                  delen met familie
                </li>
                <li>
                  <span>1 jaar toegang tot het platform inbegrepen:</span> Je
                  kunt op je gemak schrijven. Meer tijd nodig? Dan kun je nog
                  een jaar doorgaan voor €30
                </li>
              </ul>

              <ul className="mobile-show  mobile-flex">
                <li>Professioneel ingesproken in 6 stemmen</li>
                <li>Vol emotie, nuance en persoonlijkheid</li>
                <li>Luister samen of op afstand</li>
                <li> Ideaal als aanvulling op het Levensboek</li>
                <li>Eenvoudig te beluisteren en te delen</li>
              </ul>
              <h6>
                Perfect om samen te beluisteren met kinderen, kleinkinderen of
                familie op afstand – of als waardevolle aanvulling op het
                Levensboek.
              </h6>

              <button>Voeg toe aan winkelmand</button>

              <h6>14 dagen bedenktijd • Direct te delen met familie</h6>
              <Filter1
                DesktopDes={Description}
                MobileDescription={MobileDescription}
              />
              <div className="Experience-New-box">
                <div onClick={handleOptionClick}   className="small-title-google">
                  <div className="google-img">
                    <img src={newdp} alt="" />
                  </div>
                  <div className="google-title">
                    <h3>Luuk Hooijmans</h3>
                    <div className="google-title-star-img">
                      <span className="five-star">★★★★★</span>
                    </div>
                  </div>
                </div>

                <p>
                  Ik heb het cadeau gegeven aan zowel mijn moeder én
                  schoonmoeder. Twee keer een schot in de roos! Beide vonden ze
                  het makkelijk en fijn in gebruik. Vond het ook wel tof dat ik
                  als (schoon) zoon vragen kon stellen, die zij vervolgens kon
                  beantwoorden. Echt een heel fijn en bijzonder cadeau!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HAUDIOBOOK;
