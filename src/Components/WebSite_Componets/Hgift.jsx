import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // 👈 Add this line
import Question from "../../assets/Question.png";
import { useNavigate } from "react-router-dom";

const Hgift = () => {
  const navigate = useNavigate();
  return (
    <section className="Hgift">
      <div className="New-container">
        <div className="main-Hgift">
          <div className="Hgift-tital">
            <h2>Hun leven is té waardevol om te vergeten.</h2>
            <p>
              Maar herinneringen vervagen sneller dan we willen. Bewaar ze, nu
              het nog kan.
            </p>
            <button onClick={() => navigate("/Main_page1")}>
              Bestel vandaag voor €89
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hgift;
