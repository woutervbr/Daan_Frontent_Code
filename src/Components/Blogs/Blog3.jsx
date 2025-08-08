import React from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import blog3 from "../../assets/Gif/blog3.png"; // was 'Blog5', corrected to 'blog3' to match usage
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog3() {
  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            <img src={blog3} alt="Familiegesprekken kaartspel" />
          </div>
 

          {/* Tips Section */}
          <div className="conversation-tips">
            

            {/* ✅ NEW SECTION: Privacy & Security */}
            <div className="veiligheid-info">
              <h4>Hoe veilig is Ongeschreven Leven?</h4>
              <p>
                We snappen heel goed dat je zorgvuldig wilt omgaan met iets zó persoonlijks als herinneringen, verhalen, foto's en filmpjes.
                Daarom nemen wij jouw privacy en veiligheid uiterst serieus.
              </p>
              <p>
                Alles wat je deelt via Ongeschreven Leven – van geschreven antwoorden tot ingesproken herinneringen,
                van foto's tot video's – wordt <strong>versleuteld opgeslagen</strong> op veilige servers.
                Alleen jij (en eventueel medeschrijvers die jij zelf toegang geeft) kunnen erbij.
              </p>
              <p>
                We werken uitsluitend met betrouwbare hostingpartners die voldoen aan de strengste normen voor gegevensbeveiliging,
                inclusief <strong>ISO 27001-certificering</strong>. Je data is dus niet alleen juridisch beschermd (volgens de <strong>AVG</strong>),
                maar ook technisch maximaal beveiligd.
              </p>
     <h4>En verder? </h4> 
              <ul>
                <li> Je logt in via een persoonlijke e-maillink — geen gedoe met wachtwoorden</li>
                <li> Je hoeft niets te downloaden: alles werkt veilig via je browser</li>
                <li> Je bepaalt zélf wie toegang heeft tot jouw boek of account</li>
                <li> Je kunt op elk moment informatie aanpassen, verwijderen of exporteren</li>
                <li> Ook ná afloop van je jaar blijft jouw verhaal veilig bewaard (tenzij je anders beslist)</li>
                <li> We verkopen of delen je gegevens nooit met anderen, punt.</li>
              </ul>

              <p>
                Kortom: jouw verhaal is van jou, en blijft van jou. <strong>Veilig opgeslagen. Goed beschermd. En met respect behandeld</strong>,
                precies zoals het hoort.
              </p>
            </div>
          </div>

          {/* CTA */}
         
        </div>
      </div>
      <Newfooter/>
    </div>
  );
}

// Fix media query syntax
const styles = `
  .blog-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 0;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #333;
  }

  .img-section img {
    max-width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: contain;
 
  }

  .blog-section h3 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #222;
  }

  .blog-section h4 {
    font-size: 1.6rem;
    margin: 2rem 0 1rem;
    color: #2c3e50;
  }

  .blog-section ul {
    padding-left: 2rem;
    margin: 1rem 0;
  }

  .blog-section li {
    margin-bottom: 0.8rem;
  }

  @media (max-width: 768px) {
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

    .img-section img {
      max-height: 400px;
    }
  }
`;

const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default Blog3;
