import React, { useState, useRef } from "react";
import Moeiteloossvg from "../WebSite_Svg/Moeiteloossvg";
import { Link, useNavigate } from "react-router-dom";
const Mobilesec = () => {
  const navigate = useNavigate();
  return (
    <section className="Mobilesec">
      <div className="New-container">
        <div className="main-Mobilesec">
          <div className="Mobilesec-card">
            <Moeiteloossvg />
            <h2>Liever praten dan typen? Geen probleem.</h2>
            <p>
              Je ouder vertelt gewoon z’n verhaal. <br />
              Met één klik start de spraakfunctie. <br />
              Wat gezegd wordt, zetten wij om in tekst – warm, persoonlijk en
              precies zoals het klinkt.
            </p>
          </div>

          <div className="Mobilesec-btn">
            <button  >
              <Link to="/Works">Ontdekt hoe het werkt</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobilesec;
