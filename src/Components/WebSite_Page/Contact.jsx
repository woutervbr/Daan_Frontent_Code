import React, { useEffect } from "react";

import Newheader from "../WebSite_Componets/Newheader";
import Newfooter from "../WebSite_Componets/Newfooter";
import Hcontact from "../WebSite_Componets/Hcontact";
import Phero from "../WebSite_Componets/Phero";
import { useLocation } from "react-router-dom";

function Contact() {
  const location = useLocation();

    useEffect(() => {
        if (location.hash) {
          const element = document.querySelector(location.hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Scroll to top if no hash
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, [location]);
  return (
    <>
      <Newheader />
      <div id="head5">
      <Phero
        title="Contact"
        para={
          "Heb je een vraag, idee, feedback of interesse in samenwerking? Neem contact op via het formulier of mail ons direct. Wij reageren binnen 48 uur."
        }
        bold="bold"
      />
      <Hcontact />
      <Newfooter />
      </div>
    </>
  );
}

export default Contact;
