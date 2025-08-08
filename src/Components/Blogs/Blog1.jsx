import React from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import blog1 from "../../assets/Gif/blog1.png";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog1() {
  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            <img src={blog1} alt="" />
          </div>
          <div className="questionnaire-guide">
            <h1>Tips voor het invullen van je vragenlijst</h1>
            <p>
              Een persoonlijke en praktische gids om van jouw vragenlijst een
              betekenisvol levensverhaal te maken.
            </p>
            <h4>Waarom deze vragenlijst belangrijk is</h4>
            <p>
              Jouw herinneringen, gedachten en emoties vormen samen een uniek
              verhaal. Door deze op een gestructureerde manier vast te leggen,
              creëer je niet alleen een waardevol document voor jezelf, maar ook
              voor toekomstige generaties om te koesteren.
            </p>
            <strong>1. Begin met overzicht</strong>
            <br />
            Verzamel eerst je vragenlijst, foto’s, brieven of notities op één
            plek – zo heb je direct helderheid over wat je wilt invullen.
            <br />
            <br />
            <strong>2. Plan inspiratie‑momenten</strong>
            <br />
            Laat het schrijven niet alleen afhangen van directe ingevingen.
            Reserveer rustige momenten waarin ideeën vanzelf komen –
            bijvoorbeeld bij het doorbladeren van oude fotoalbums.
            <br />
            <br />
            <strong>3. Schrijf zoals je praat</strong>
            <br />
            Beantwoord de vragen alsof je een verhaal vertelt aan een goede
            vriend: persoonlijk, ontspannen en authentiek.
            <br />
            <br />
            <strong>4. Werk thematisch of chronologisch</strong>
            <br />
            Dit helpt overzicht te houden en stimuleert herinneringen die elkaar
            versterken. Begin bijvoorbeeld met je jeugd of thematische
            hoofdstukken.
            <br />
            <br />
            <strong>5. Lees later opnieuw</strong>
            <br />
            Neem afstand door je antwoorden na een dag opnieuw door te lezen.
            Vaak komen er dan nieuwe details of inzichten boven.
            <br />
            <br />
            <strong>6. Betrek je omgeving</strong>
            <br />
            Spreek met familie of vrienden over gebeurtenissen in je verhaal.
            Hun herinneringen kunnen je verrijken en toevoegen wat je zelf
            misschien was vergeten.
            <br />
            <br />
            <strong>7. Maak het beheersbaar</strong>
            <br />
            Neem per sessie slechts enkele vragen door. Zo blijft het leuk en
            overzichtelijk zonder te overweldigen.
            <br />
            <br />
            <strong>8. Gebruik digitale hulpmiddelen</strong>
            <br />
            Als je vastloopt, kun je inspiratie halen uit verdiepende vragen van
            een chatbot of andere prompts. Zo ontdek je nieuwe lagen in je
            herinneringen.
            <h4>Samenvatting</h4>
            <p>
              Met structuur, aandacht en ruimte geef je jouw levensverhaal de
              diepgang en warmte die het verdient. Gun jezelf de tijd. Begin
              vandaag nog – jouw herinneringen zijn een waardevolle
              nalatenschap.
            </p>
          </div>

          
        </div>
      </div>
      <Newfooter/>
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

export default Blog1;
