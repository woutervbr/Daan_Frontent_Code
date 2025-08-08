import React, { useState } from "react";
import logo from "../../assets/logo.png";
const EmailtForget = () => {

  return (
    <>

      <section className="Emailt1">
        <div className="main-Emailt1">

          <div className="Emailt1-logo">

<img src={logo} alt="" />

          </div>
          <div className="Emailt1-heading">
            <h2>Welkom terug</h2>
            <p>Voer je e-mailadres in om in te loggen op je account. We sturen je
een beveiligde link om in te loggen.</p>
          </div>
          <div className="Emailt1-group-box">
            <div className="Emailt1-group">
              <label >E-mailadres
              </label>
              <input type="text" placeholder="Your email here"/>
            </div>

            <div className="Emailt1-btn">
              <button>Inloggen met e-mail link</button>
            </div>

            <div className="Emailt1-link">
              <p>NEW TO MY LIFE IN A BOOK? <span> Forget</span></p>
            </div>
          </div>
        </div>

      </section>

    </>
  );
};

export default EmailtForget;
