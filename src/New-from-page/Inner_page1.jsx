import React, { useState } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import Will_Purchase from "./New_form_componets/Will_Purchase";
import logopostion from "../../src/assets/logopostion.png";
import { Link } from "react-router-dom";

const Inner_page1 = () => {
  const subsFor = localStorage.getItem("subscriptionform")
  return (
    <>
      <section className="Main_page1-sec   add-class-1">
        <div className="container-ar">
          <div className="Main_page1-logo">
            <Link to="/">
              <img src={logopostion} alt="" />
            </Link>
          </div>

          <div className={subsFor ?"main-Main_page-news" :"main-Main_page1"}>
            <div className="Main_page1-from">
              <Will_Purchase />
            </div>
            <div className="Main_page1-side-compo">
              <StorySubscription
                title="Het Ongeschreven Leven Levensboek"
                price="$900.00"
                discount="$10 off"
                promo=" ( Promo code hhjjgg Applied )"
                total="$600"
                includes={[ "1 jaar toegang tot alle levensvragen",
                    "Zelf schrijven of inspreken via spraak-naar-tekst",
                    "Professioneel geschreven levensverhaal",
                    "Luxe hardcover boek (full color)",
                    "Persoonlijke omslag met eigen foto",
                    "Foto’s en video’s via QR-code toevoegen",]}
              />

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Inner_page1;
