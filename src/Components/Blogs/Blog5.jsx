import React from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import blog1 from "../../assets/Gif/blog1.png";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog5() {
  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            <img src={blog1} alt="" />
          </div>
          <div className="questionnaire-guide">
            <h1>Waarom herinneringen verdwijnen en hoe je ze kunt bewaren</h1>
            <p>
              Soms weet je het ineens niet meer. Hoe dat oude huis rook waar je
              opgroeide. Of hoe je vader precies klonk als hij je naam riep
              vanaf de trap. Herinneringen, zelfs de dierbaarste, kunnen
              vervagen. Niet omdat ze er niet toe deden, maar juist omdat we ze
              jarenlang met ons meedragen zonder ze hardop te vertellen.
            </p>
            <p>We vergeten. Dat is menselijk. En ook heel normaal.</p>

            <h4> Wat er met je geheugen gebeurt als je ouder wordt</h4>
            <p>
              Naarmate we ouder worden, veranderen onze hersenen. Het geheugen
              wordt trager. Je haalt minder makkelijk informatie naar boven en
              soms is het alsof een herinnering achter een dichte deur zit. Je
              weet dat het er is, maar het laat zich niet zomaar vinden.
            </p>
            <p>
              Volgens de Hersenstichting is dit een normaal proces bij
              veroudering. Het hoort bij de manier waarop onze hersenen
              informatie verwerken. Nieuwe herinneringen worden minder snel
              opgeslagen, en oude herinneringen blijven vaak hangen in flarden,
              tenzij we ze actief ophalen en benoemen.
            </p>
            <p>
              Ook Alzheimer Nederland wijst erop dat het geheugen met de jaren
              kwetsbaarder wordt. Wat we niet gebruiken, raken we langzaam
              kwijt. Juist daarom is herhaling en bewust ophalen van ervaringen
              zo belangrijk.
            </p>

            <h4> Vertellen houdt herinneringen levend</h4>
            <p>
              Wat je niet benoemt, verdwijnt langzaam naar de achtergrond. Dat
              is zonde, want juist in die verhalen zit de kern van wie iemand
              is. Een herinnering hoeft niet groots te zijn om waardevol te
              zijn. Soms is het de geur van een zondags gerecht, de klank van
              een stem, of een klein voorval dat ineens weer bovenkomt. Door
              zulke momenten hardop te vertellen, worden ze steviger verankerd
              in het geheugen.
            </p>
            <p>
              Uit een overzichtsonderzoek getiteld{" "}
              <em>
                “Reminiscence and Health in Later Life: A Review of Recent
                Literature”
              </em>
              , gepubliceerd in het vakblad{" "}
              <strong>Current Directions in Psychological Science</strong>,
              blijkt dat ouderen die regelmatig herinneringen ophalen en delen:
            </p>
            <ul>
              <li>tot 30% minder last hebben van depressieve klachten,</li>
              <li>een groter gevoel van zingeving ervaren,</li>
              <li>en zich meer verbonden voelen met anderen.</li>
            </ul>
            <p>
              Kortom: herinneringen ophalen is geen nostalgisch tijdverdrijf,
              maar een bewezen manier om het welzijn van ouderen te versterken.
            </p>

            <h4> Waarom verhalen opschrijven nog belangrijker is</h4>
            <p>
              Vertellen is stap één. Vastleggen is stap twee. Want wat vandaag
              nog vanzelf opkomt, kan morgen zomaar verdwijnen. En dan zijn het
              niet alleen de details die wegvallen, maar ook de toon, de sfeer
              en de emoties die erbij hoorden. Terwijl dát nou juist het verhaal
              compleet maakt.
            </p>
            <p>
              Een levensboek of een persoonlijk verhaal is dus niet alleen een
              cadeau voor de familie. Het is ook een vorm van zelfbevestiging
              voor de schrijver. Het laat zien: dit is wie ik was, wat ik heb
              meegemaakt en wat ik wil nalaten.
            </p>

            <h4> Eén vraag kan het verschil maken</h4>
            <p>
              Bij Ongeschreven Leven zien we elke dag wat er gebeurt als iemand
              begint met vertellen. Eén eenvoudige vraag – “Wat deed je als kind
              op woensdagmiddag?” – kan leiden tot een stroom aan herinneringen
              die jarenlang ongebruikt op de plank lagen. Soms volgt er een
              lach. Soms een traan. Maar altijd gebeurt er iets bijzonders.
            </p>
            <p>
              Het Ongeschreven Leven Levensboek helpt mensen om die verhalen
              vast te leggen. In eigen woorden. In een prachtig hardcover boek
              dat blijft bestaan, ook als het geheugen het op termijn niet
              allemaal meer kan bijhouden.
            </p>
            <p>
              Voor wie liever vertelt dan typt, is er de spraak-naar-tekst
              functie. En voor wie graag samen herinneringen ophaalt, is er het
              Familiegesprekken kaartspel – een luchtige, maar betekenisvolle
              manier om herinneringen los te maken en te bewaren.
            </p>

            <h4> Herinneringen vervagen. Maar verhalen kunnen blijven.</h4>
            <p>
              De meeste mensen wachten te lang. Niet omdat ze niet willen, maar
              omdat ze denken dat er nog tijd genoeg is. Tot het moment komt dat
              het lastiger wordt om herinneringen helder terug te halen, of om
              ze nog samen te kunnen delen. Juist daarom is nú het moment om te
              beginnen.
            </p>
            <p>
              <strong>
                Herinneringen vervagen. Maar verhalen kunnen blijven. Als je ze
                vandaag nog vastlegt.
              </strong>
            </p>
            <Link to="/">Ontdek hoe Ongeschreven Leven werkt</Link>
          </div>
        </div>
      </div>
      <Newfooter />
    </div>
  );
}

const styles = `
  .blog-page {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .blog-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .blog-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 0;
    line-height: 1.8;
    font-size: 1.1rem;
  font-family: Poppins, sans-serif;

    color: #333;
  }
  
  .blog-image-container {
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }
  
  .blog-image {
    max-width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .blog-section h3 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #222;
    line-height: 1.3;
  }
  
  .blog-section h4 {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.2rem;
    color: #2c3e50;
  }
  
  .blog-section p {
    margin-bottom: 1.5rem;
  }
  
  .blog-section ul {
    padding-left: 2rem;
    margin: 1.5rem 0;
  }
  
  .blog-section li {
    margin-bottom: 0.8rem;
  }
  
  @ (max-width: 768px) {
    .blog-section {
      padding: 20px 16px;
      font-size: 1rem;
    }
    
    .blog-section h3 {
      font-size: 1.8rem;
    }
    
    .blog-section h4 {
      font-size: 1.4rem;
    }
    
    .blog-image {
      max-height: 400px;
    }
  }
`;

// Add styles to the document head
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default Blog5;
