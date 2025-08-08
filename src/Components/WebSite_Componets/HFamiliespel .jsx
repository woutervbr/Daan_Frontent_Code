import React from "react";
import googleimg from "../../assets/google-img.png";
import starimg from "../../assets/star-img.png";
import HBookSalider2 from "./HBookSalider2";
import newdp from "../../assets/newdp.jpeg";
import Filter1 from "./Filter1";
import bookslide1 from "../../assets/new-img/cardgame.jpeg";
import bookslide6 from "../../assets/new-img/pic17new.jpg";
import bookslide2 from "../../assets/new-img/pic16.png";
import bookslide3 from "../../assets/new-img/pic15.jpg";
import bookslide4 from "../../assets/new-img/pic14.png";
import bookslide5 from "../../assets/new-img/pic18.jpg";
import HBookSalider from "./HBookSalider";
import { useNavigate } from "react-router-dom";
const Description = ({ handleOptionClick }) => {
  return (
    <>
      <div className="options-list-1">
        <h2 onClick={handleOptionClick} className="select-option">
          Een spel dat verbindt en verhalen tot leven brengt

        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Met het Familiegesprekken kaartspel draait het niet om winnen, maar om herinneringen delen. Het spel nodigt uit tot gesprek - tussen generaties, rond de tafel.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
         150 vragen, honderden verhalen
        </h2>
        <p onClick={handleOptionClick} className="select-option">
Van jeugdherinneringen tot toekomstdromen. Elke kaart is een uitnodiging om stil te staan, te lachen of iets nieuws over elkaar te ontdekken.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
         Voor een avond vol verbinding
        </h2>
        <p onClick={handleOptionClick} className="select-option">
        Ouders, kinderen, kleinkinderen - het spel brengt iedereen samen, zonder schermen. Echt contact, gewoon aan tafel.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
En als het bijzonder wordt… bewaar het
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Dankzij de koppeling met het Levensboek kun je mooie antwoorden direct inspreken en bewaren.
        </p>

        <p onClick={handleOptionClick} className="select-option">
        Het kaartspel is niet alleen leuk, het legt vast wat anders misschien verloren zou gaan
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
         Een spel dat herinneringen losmaakt

        </h2>
        <p onClick={handleOptionClick} className="select-option">
Met 150 vragen over vroeger, nu en de toekomst ontstaat er vanzelf een goed gesprek.

        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Niet alleen leuk – ook waardevol
        </h2>
        <p onClick={handleOptionClick} className="select-option">
         Oude herinneringen, grappige verhalen, onverwachte inzichten… alles mag.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
Voor iedereen aan tafel        </h2>
        <p onClick={handleOptionClick} className="select-option">
        Kind, ouder, opa of oma – dit spel verbindt alle generaties.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Meer dan een spelmoment
        </h2>
        <p onClick={handleOptionClick} className="select-option">
Gebruik de spraakfunctie en leg bijzondere antwoorden meteen vast in het Levensboek.

        </p>
      </div>
    </>
  );
};

function HFamiliespel() {
  const navigate = useNavigate(); 

  const HFamiliespeImages = [
    bookslide1,
    bookslide6,
    bookslide2,
    bookslide3,
    bookslide4,
    bookslide5,
  ];

  const handleOptionClick = ()=>{
    window.open("https://www.google.com/maps/place/Ongeschreven+Leven/@52.1909763,5.2795551,7z/data=!4m8!3m7!1s0x4bd39bbb962344b7:0x3101f80fc4f97b8e!8m2!3d52.1909763!4d5.2795551!9m1!1b1!16s%2Fg%2F11xfj536t0!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D", "_blank");

  }
  const writeReview = ()=>{
    window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");
  
  }
  return (
    <>
      <section className="New-Memories">
        <div className="New-container">
          <div className="New-main-Memories">
            <div className="New-Memories-salide">
              <HBookSalider images={HFamiliespeImages} />
            </div>

            <div className="New-Preserving-Memories">
              <h1>Het Familiespel Familiegesprekken</h1>
              <div onClick={writeReview} className="small-title-google">
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
                Een luxe kaartspel dat families samenbrengt en verhalen tot
                leven brengt.
              </p>

              <div className="box-span-New">
                <h3>€30 </h3>
                <span>
                  <h4>€45</h4>{" "}
                </span>
              </div>

              <ul className="destok-show">
                <li>
                  <span>150 gespreksstarters:</span> verdeeld over verleden,
                  heden en toekomst
                </li>
                <li>
                  <span> Premium kwaliteit:</span> met stevige kaarten, luxe doos
                  en fluwelen zakje met dobbelsteen
                </li>
                <li>
                  <span> Verbindt generaties:</span> - doorbreekt eenzaamheid en
                  brengt jong en oud dichter bij elkaar
                </li>
                <li>
                  <span>Direct te koppelen aan het Levensboek:</span> –
                  antwoorden kun je inspreken en direct opslaan via de
                  spraak-naar-tekst functie
                </li>
                <li>
                  <span>Perfect te combineren: </span> het spel brengt de
                  gesprekken op gang, het Levensboek bewaart de herinneringen
                </li>
              </ul>

              <ul className="mobile-show  mobile-flex">
                <li>150 vragen over verleden, heden en toekomst</li>
                <li> Luxe kaarten, stevige doos en velvet zakje</li>
                <li>Leuk om samen te doen met de hele familie</li>
                <li>Direct te koppelen aan het Levensboek</li>
                <li>Gesprek starten én bewaren in één</li>
              </ul>
              {/* <h6>Ideaal voor aan tafel met kinderen, kleinkinderen en grootouders - of als waardevol cadeau bij het Levensboek. */}
              {/* </h6> */}

              <button onClick={()=>navigate("/Main_page1")}>Bestel het spel</button>

              <h6>
                Gratis verzending • 14 dagen bedenktijd (ongebruikt retour)
              </h6>
              <Filter1
                DesktopDes={Description}
                MobileDescription={MobileDescription}
              />
              <div className="Experience-New-box">
                <div onClick={handleOptionClick} className="small-title-google">
                                <div className="google-img">
                                  <img src={googleimg} alt="" />
                                </div>
                                <div className="google-title">
                                  <h3>Google Reviews</h3>
                                  <div className="google-title-star-img">
                                    <h3>4.9</h3>
                                    <span className="five-star">★★★★★</span>
                                  </div>
                                </div>
                              </div>
                              <p className="google-review-text1">Anouk Haagh</p>
             

                <p>
                  Wat een ontzettend waardevol cadeau is dit voor mijn oma (jaja
                  93 jaar), zodat we samen obv de vragen al haar herinneringen
                  van vroeger kunnen ophalen. Hierdoor ben ik zelfs meer te
                  weten te komen over haar tijd in de kostschool. Je kunt het je
                  niet meer voorstellen!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HFamiliespel;
