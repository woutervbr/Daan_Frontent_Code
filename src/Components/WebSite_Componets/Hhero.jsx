import React from "react";
import Newheroimg from "../../assets/new-img/pic1.jpeg";
import googleimg from "../../assets/google-img.png";
import starimg from "../../assets/star-img.png";
import { useNavigate } from "react-router-dom";
import homepgGif from "../../assets/Gif/homepgGif.mp4";
function Hhero() {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");
  };
  return (
    <>
      <section className="new-hero">
        <div className="New-container">
          <div className="New-hero-main">
            <div className="title-New-hero">
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
              <h2 className="destok-show">
                Elk verhaal verdient het om verteld, herinnerd en vereeuwigd te
                worden.
              </h2>
              <h2 className="mobile-show">
                Geef iets dat blijft, hun verhaal, voorgoed vastgelegd
              </h2>
              <p className="destok-show">
                Geef je (groot)ouders een bijzonder cadeau waarmee hun
                herinneringen eenvoudig worden vastgelegd, zonder gedoe, op hun
                manier. Wij maken er een prachtig hardcover boek van, gevuld met
                hun verhalen en momenten om nooit te vergeten.
              </p>
              <p className="mobile-show">
                {" "}
                Leg de verhalen van je (groot)ouders vast in een prachtig
                hardcover boek, in hun eigen woorden, stap voor stap, zonder
                gedoe. Een cadeau dat herinneringen bewaart en generaties
                verbindt.
              </p>
              <div className="button-title-New-hero">
                <button
                  onClick={() => navigate("/Main_page1")}
                  className="btn-1"
                >
                  Bestel voor €89{" "}
                </button>
                <button onClick={() => navigate("/Works")} className="btn-2">
                  Zo werkt het
                </button>
              </div>
            </div>
            <div className="title-New-hero-img">
              <video
                src={homepgGif}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              {/* <img src={homepgGif} alt="" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hhero;
