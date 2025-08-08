import React, { useEffect, useState } from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import video1 from "../../assets/Gif/video1.mp4";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog6() {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = video1;
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
    window.open(video1, "_blank");
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
            <h1>Op je eigen tempo, op je eigen plek</h1>
            <h4>
              Over het beantwoorden van vragen met <i>Ongeschreven Leven</i>
            </h4>
            <p>
              Herinneringen laat je niet afraffelen. Ze komen wanneer ze willen
              — bij een kop thee, op een bankje in de zon, of gewoon aan de
              keukentafel. Daarom kun je bij Ongeschreven Leven zelf bepalen hoe
              en wanneer je jouw verhaal vertelt.
            </p>
            <p>
              Je opent de vragenlijst op je laptop of telefoon. Eén vraag
              tegelijk, zonder haast. Je kiest waar je begint: je jeugd,
              familie, werk of liefde. Sommige vragen roepen meteen iets op.
              Andere laat je even liggen tot het moment daar is.
            </p>
            <p>Typ je liever? Geen probleem.</p>
            <p>
              Vertel je liever? Klik op het microfoontje en spreek in wat je
              wilt delen.
            </p>
            <p>
              Alles wordt automatisch opgeslagen. Je kunt altijd terugkijken,
              aanvullen of pauzeren.
            </p>
            <p>
              En het mooiste? Je hoeft het niet in je eentje te doen.
              Familieleden kunnen meekijken of meeschrijven – ook op afstand.
            </p>
            <p>
              <i>Jouw verhaal, op jouw manier. Zonder druk. Met plezier.</i>
            </p>
            <Link to="/login">Begin vandaag nog met jouw verhaal</Link>
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

export default Blog6;
