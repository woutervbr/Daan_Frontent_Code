import React from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import blog4 from "../../assets/Gif/blog4.png";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog4() {
  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            <img src={blog4} alt="" />
          </div>
          <div className="questionnaire-guide">
  <h1>Wat zit er in het pakket en wat kost het precies?</h1>
  <p>
    Bij <strong>Ongeschreven Leven</strong> betaal je <strong>één keer</strong> voor een compleet pakket. Daarin zit standaard een gedrukt boek tot <strong>160 pagina’s</strong>.
  </p>
  <p>
      Een gemiddeld Levensboek telt zo’n 100 pagina’s, inclusief foto’s. Met 160 pagina’s heb je dus meer dan genoeg ruimte voor een compleet verhaal, zonder dat je hoeft te schrappen of in te korten.
  </p>
  <h4>  Rekenvoorbeeld: wat betaal ik voor een boek van 130 pagina’s?</h4>
  <p>
    Stel, je dierbare beantwoordt de meeste vragen en voegt ook wat mooie familiefoto’s toe. Dan kom je bijvoorbeeld uit op 130 pagina’s.
  </p>
  <ul>
    <li>✔ 1 jaar toegang tot het platform om het boek te maken en printen</li>
    <li>✔ Tot 160 pagina’s: <strong>€89</strong></li>
    <li>✔ Inclusief hardcover boek, spraakfunctie, foto's en video’s</li>
    <li>✔ Inclusief verzending</li>
    <li>✔ Geen abonnement of automatische verlenging</li>
    <li>✔ Alles in één, klaar om cadeau te geven</li>
  </ul>

  <h4>  Extra boeken? Je krijgt 33% korting</h4>
  <p>
    Vaak wil je het boek niet maar één keer in huis hebben. Broers, zussen of kleinkinderen willen ook een exemplaar. Daarom krijg je bijbestellingen met korting:
  </p>
  <table>
    <thead>
      <tr>
        <th>Boekformaat</th>
        <th>Prijs extra exemplaar</th>
        <th>Korting</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Boek tot 160 pagina’s</td>
        <td>€60 (i.p.v. €89)</td>
        <td>33%</td>
      </tr>
      <tr>
        <td>Boek tussen 161–300 p.</td>
        <td>€89</td>
        <td>–</td>
      </tr>
      <tr>
        <td>Boek vanaf 300 pagina’s</td>
        <td>2 x €89 = €178</td>
        <td>–</td>
      </tr>
    </tbody>
  </table>

  <p>
    Je kunt extra boeken direct bij je bestelling toevoegen, of later als je het eerste exemplaar in handen hebt. Zo kan iedereen in de familie een blijvend aandenken bewaren, voor nu én later.
  </p>

  <h4> Schrijf je meer dan 160 pagina’s?</h4>
  <table>
    <thead>
      <tr>
        <th>Aantal pagina’s</th>
        <th>Wat gebeurt er?</th>
        <th>Prijs</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tot 160 p.</td>
        <td>Inbegrepen bij standaardpakket</td>
        <td>€89</td>
      </tr>
      <tr>
        <td>161–300 p.</td>
        <td>Toeslag van €30</td>
        <td>€119</td>
      </tr>
      <tr>
        <td>Meer dan 300 p.</td>
        <td>Automatisch tweedelig boek</td>
        <td>€178</td>
      </tr>
    </tbody>
  </table>

  <h4>  Extra’s die je kunt toevoegen (optioneel)</h4>
  <p>
    <strong>  Het luisterboek – laat het verhaal écht tot leven komen</strong><br />
    Laat het Levensverhaal professioneel inspreken in een stem die bij de verteller past.
    <br />Je kunt na je aankoop kiezen uit 6 stemmen (3 mannen, 3 vrouwen).<br />
    <strong>Prijs:</strong> €25 (normaal €35)
  </p>
  <p>
    <strong>  Het Familiegesprekken kaartspel – 147 vragen die verhalen losmaken</strong><br />
    Deze luxe kaartenset is een perfecte aanvulling op het Levensboek. Ontroerende gesprekken gegarandeerd.
    <br />
    <strong>Prijs:</strong> €30 (normaal €45)
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

export default Blog4;
