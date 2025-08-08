import React, { useEffect } from "react";

import HMemories from "../WebSite_Componets/HMemories";
import Newheader from "../WebSite_Componets/Newheader";
import Phero from "../WebSite_Componets/Phero";
import HNews from "../WebSite_Componets/HNews";
import Newfooter from "../WebSite_Componets/Newfooter";
import { useLocation } from "react-router-dom";

function News() {
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
      <div id="head4">
      {/* <Phero title="Nieuws" /> */}
      <HNews />
      <Newfooter />
      </div>

    </>
  );
}

export default News;
