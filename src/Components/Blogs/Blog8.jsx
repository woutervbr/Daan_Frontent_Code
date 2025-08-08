import React, { useEffect, useState } from "react";
import Header from "../Header";
import Newheader from "../WebSite_Componets/Newheader";
import { Link } from "react-router-dom";
import video3 from "../../assets/Gif/video3.mp4";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog8() {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = video3;
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
    window.open(video3, "_blank");
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
            <h1>Vertellen is makkelijker dan schrijven</h1>
            <h4>
              Over de spraak-naar-tekst functie van<i> Ongeschreven Leven</i>
            </h4>
            <p>
              Sommige mensen typen niet graag. En dat hoeft ook niet. Met i
              <i>Ongeschreven Leven</i> kun je simpelweg praten en het systeem
              zet je woorden automatisch om in tekst.
            </p>

            <p>
              Je klikt op het microfoontje en vertelt. Net alsof je aan tafel
              zit met een familielid. Terwijl je praat zie je een timer lopen en
              als je uitgesproken bent, druk je op het stop-icoontje. Handig,
              intuïtief en verrassend fijn om te doen.
            </p>

            <p>
              Deze functie is speciaal ontwikkeld voor mensen die liever spreken
              dan schrijven. En dat geldt voor meer mensen dan je denkt. Ook
              handig voor wie niet lang achter een scherm wil zitten.
            </p>

            <p>
              <i>
                Geen toetsenbord-stress. Gewoon je verhaal vertellen, zoals je
                dat altijd al deed.
              </i>
            </p>

            <Link to="/login">Ontdek hoe het werkt</Link>
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

export default Blog8;
