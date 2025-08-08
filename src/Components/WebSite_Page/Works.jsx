import React, { useEffect, useRef } from 'react'
import Newheader from '../WebSite_Componets/Newheader'
import HSuperior from '../WebSite_Componets/HSuperior'
import Hfaq from '../WebSite_Componets/Hfaq'
import HWorks from '../WebSite_Componets/HWorks'
import HWorksHero from '../WebSite_Componets/HWorksHero'
import Newfooter from '../WebSite_Componets/Newfooter'
import Hgift from '../WebSite_Componets/Hgift'
import { useLocation } from 'react-router-dom'
import StickyCta from '../StickyCta'


function Works() {
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
            <div id="head6">
            <HWorksHero />
                </div>
            <HSuperior />

            <HWorks />
            <Hgift/>
            <Hfaq />
            <StickyCta  footerRef={footerRef}/>

            <div ref={footerRef}>
            <Newfooter />
            </div>
        </>
    )
}

export default Works
