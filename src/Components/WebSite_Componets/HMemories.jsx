import React from "react";
import googleimg from "../../assets/google-img.png";
import newdp from "../../assets/newdp.jpeg";
import starimg from "../../assets/star-img.png";
import HBookSalider from "./HBookSalider";
import { useNavigate } from "react-router-dom";
import bookslide1 from "../../assets/Boek/Boek2.jpg";
import bookslide2 from "../../assets/Boek/Boek3.jpg";
import bookslide3 from "../../assets/Boek/Boek4.png";
import bookslide4 from "../../assets/Boek/Boek5.png";
import bookslide5 from "../../assets/new-img/pic11.jpeg";
import bookslide6 from "../../assets/new-img/pic12.jpeg";
// import firstSlide from "../../assets/firstSlide.png";
import firstSlide from "../../assets/Boek/Boek.jpeg";

import Filter1 from "./Filter1";
const Description = ({ handleOptionClick }) => {
  return (
    <>
      <div className="options-list-1">
        <h2 onClick={handleOptionClick} className="select-option">
          Een cadeau dat niet stopt bij geven – maar daar pas begint
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Op een moment dat jij kiest ontvangt je ouder of grootouder een
          persoonlijke e-mail, met een boodschap die je zelf hebt geschreven.
          Perfect voor een verjaardag, jubileum, kerst of zomaar, omdat hun
          verhaal ertoe doet.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Elke week één vraag die iets losmaakt
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Over hun kindertijd, familiebanden, eerste liefdes of belangrijke
          levenslessen. Geen invulboekjes, maar vragen die écht iets betekenen.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Zonder gedoe – typen of inspreken
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Via laptop, tablet of telefoon. Geen wachtwoorden, geen apps. Eén klik
          en ze kunnen beginnen.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Je kunt helpen – maar hoeft niet
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Als je wilt, voeg je foto’s toe of kijk en help je mee. Zij houden de
          regie en bepalen het tempo.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Wij maken er één mooi geheel van
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Alle losse antwoorden worden een vloeiend geschreven levensverhaal.
          Met ruimte voor foto’s én filmpjes via QR-code. Professioneel gedrukt
          in een luxe hardcover boek.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Een luisterboek – voor jong en oud
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Professioneel ingesproken in een stem naar keuze. Ideaal voor
          kinderen, slechtzienden of wie liever luistert dan leest.
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
          Op de dag die jij kiest ontvangen ze een e-mail met jouw persoonlijke
          boodschap.Niet zomaar een bericht, maar een uitnodiging om hun verhaal
          te vertellen.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Wekelijks een mooie vraag
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Over hun jeugd, familie, liefde of levenslessen. Vragen die
          herinneringen tot leven brengen.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Beantwoorden op hun manier
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Ze typen of spreken hun antwoord in via telefoon, tablet of laptop.
          Zonder app, zonder wachtwoord.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Jij mag meekijken (als je dat wil)
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Je kunt foto’s toevoegen of zelf een vraag meegeven. Maar zij houden
          de regie.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Van losse antwoorden naar één verhaal
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          Wij bundelen hun herinneringen tot een samenhangend levensverhaal.
          Professioneel geschreven en gedrukt in een luxe hardcover boek.
        </p>
        <h2 onClick={handleOptionClick} className="select-option">
          Een luisterboek als aanvulling
        </h2>
        <p onClick={handleOptionClick} className="select-option">
          handig voor kinderen, ouderen of wie liever luistert dan leest.
        </p>

        <h2 onClick={handleOptionClick} className="select-option">
          Een cadeau voor nu. Een erfstuk voor later.
        </h2>
      </div>
    </>
  );
};

function HMemories() {
  const navigate = useNavigate();

  const HMemoriesImages = [
    firstSlide,
    bookslide1,
    bookslide2,
    bookslide3,
    bookslide4,
    bookslide5,
    bookslide6,
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
              <HBookSalider images={HMemoriesImages} />
            </div>

            <div className="New-Preserving-Memories">
              <h1>Het levensboek</h1>
              <div onClick={writeReview} className="small-title-google">
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
              <p>
                Een persoonlijk boek vol herinneringen - voor henzelf en voor de
                generaties na hen.
              </p>

              <div className="box-span-New">
                <h3>€89</h3>
                <span>
                  <h4>€119</h4>
                </span>
              </div>

              <ul className="destok-show">
                <li>
                  <span>Premium hardcover boek in A5-formaat:</span> Stevig,
                  stijlvol en gemaakt om generaties mee te gaan. Tot 160
                  pagina’s inbegrepen - een gemiddeld boek telt zo’n 100
                  pagina’s. Voor langere verhalen ({">"} 160 pagina’s) wordt €30
                  extra in rekening gebracht.
                </li>

                <li>
                  <span>Wekelijkse vragen die herinneringen oproepen:</span> Met
                  zorg samengesteld om het vertellen nog gemakkelijker te maken.
                </li>
                <li>
                  <span>Jij vertelt, wij doen de rest:</span> je spreekt je
                  verhaal gewoon in. Wij zetten het om naar geschreven tekst én
                  maken er een mooi, samenhangend levensverhaal van.
                </li>
                <li>
                  <span>Foto’s en filmpjes toevoegen:</span> foto’s worden
                  afgedrukt in het boek, filmpjes zijn zichtbaar via een
                  QR-code.
                </li>
                <li>
                  <span>1 jaar toegang tot het platform inbegrepen:</span> je
                  kunt op je gemak schrijven. Meer tijd nodig? Dan kun je nog
                  een jaar doorgaan voor €30.
                </li>
                <li>
                  <span>Wil je het levensverhaal ook kunnen beluisteren?</span>{" "}
                  Voeg een luisterboek toe, in een stem die bij je past.
                </li>
                <p></p>
              </ul>

              <ul className="mobile-show  mobile-flex">
                <li>Werkt op laptop, tablet en telefoon</li>
                <li>Antwoorden kun je typen of inspreken</li>
                <li>Voeg foto’s en video’s toe via QR-code</li>
                <li> Wij maken er een samenhangend levensverhaal van</li>
                <li>Gedrukt in een luxe hardcover boek</li>
                <li>Geen app, geen gedoe. Gewoon beginnen</li>
                <li>Maak het compleet met een luisterboek.</li>
              </ul>

              <button onClick={() => navigate("/Main_page1")}>
                Begin met dit boek
              </button>

              <h6>Gratis verzending • 30 dagen bedenktijd</h6>
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
              <p className="google-review-text1">Martin Vermeulen</p>


                <p className="google-review-text">
                  Wel digibeet, maar met een beetje hulp kon ik gewoon mijn
                  verhaal inspreken. Ongelooflijk dat het zo makkelijk ging. Het
                  eindresultaat is prachtig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HMemories;
