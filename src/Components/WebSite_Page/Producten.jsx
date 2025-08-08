import React, { useEffect, useRef } from "react";

import HMemories from "../WebSite_Componets/HMemories";
import Newheader from "../WebSite_Componets/Newheader";
import Phero from "../WebSite_Componets/Phero";
import Newfooter from "../WebSite_Componets/Newfooter";
import HAUDIOBOOK from "../WebSite_Componets/HAUDIOBOOK";
import HFamiliespel from "../WebSite_Componets/HFamiliespel ";
import { useLocation } from "react-router-dom";
import Hfaq from "../WebSite_Componets/Hfaq";
import StickyCta from "../StickyCta";

function Producten() {
  const location = useLocation();
      const footerRef = useRef(null);
  
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
      <div id="head3">
        <Phero
          title="Producten"
          para="Ontdek onze producten om herinneringen vast te leggen, verhalen te bewaren en generaties te verbinden."
        />
      </div>
      <HMemories />
      {/* <HAUDIOBOOK /> */}
      <HFamiliespel />
      <Hfaq />
      <StickyCta  footerRef={footerRef}/>

      <div ref={footerRef}>
      <Newfooter />
      </div>
    </>
  );
}

export default Producten;
