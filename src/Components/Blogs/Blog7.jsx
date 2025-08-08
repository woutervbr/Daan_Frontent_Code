import React, { useEffect, useState } from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import video2 from "../../assets/Gif/video2.mp4";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog7() {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = video2;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.currentTime = 0.1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/png");
      setThumbnail(imageUrl);
    });
  }, []);

  const handleClick = () => {
    window.open(video2, "_blank");
  };

  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            {thumbnail ? (
              <div
                onClick={handleClick}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                <img
                  src={thumbnail}
                  alt="Video Thumbnail"
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <div className="video-play-button">▶</div>
              </div>
            ) : (
              <p>Loading thumbnail...</p>
            )}
          </div>
          <div className="questionnaire-guide">
  <h1>Bestellen in 5 simpele stappen</h1>
  <h4>Zo start je met het Levensboek van <i>Ongeschreven Leven</i></h4>
  <p>
    Een levensverhaal cadeau doen, klinkt groots. Maar bij <i>Ongeschreven Leven</i> is het verrassend eenvoudig. In vijf overzichtelijke stappen geef je iemand de kans om zijn of haar verhaal vast te leggen — op een manier die bij hen past.
  </p>

  <h3>1. Bestel het Levensboek</h3>
  <p>
    Je kiest of je het boek zelf invult of cadeau doet. Geef aan wanneer de ontvanger mag starten, en voeg desgewenst een persoonlijke boodschap toe.
  </p>

  <h3>2. Kies een cover en voeg een naam toe</h3>
  <p>
    Kies een kleur, upload een foto, en geef het boek een titel. De omslag maakt het verhaal persoonlijk vanaf het eerste moment.
  </p>

  <h3>3. Vul de gegevens in</h3>
  <p>
    Je vult het e-mailadres van de ontvanger in, zij krijgen een duidelijke e-mail met alles wat ze nodig hebben om te starten. Geen gedoe met wachtwoorden of downloads.
  </p>

  <h3>4. Kies extra’s (optioneel)</h3>
  <p>
    Wil je ook het Familiegesprekken kaartspel toevoegen of een luisterboek? Of extra exemplaren van het boek voor broers, zussen of kleinkinderen? Je stelt alles zelf samen.
  </p>

  <h3>5. Afrekenen en klaar</h3>
  <p>
    Na betaling wordt alles automatisch geregeld. De eerste vraag verschijnt in de inbox van je dierbare. En voor je het weet, groeit hun verhaal — week na week — uit tot een prachtig boek.
  </p>

  <p><i>Simpel. Duidelijk. Zonder gedoe. Precies zoals je het zou willen voor je ouders of grootouders.</i></p>

  <Link to="/login">Ga naar het bestelproces</Link>
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

export default Blog7;
