import React, { useEffect } from 'react'
import Hhero from '../WebSite_Componets/Hhero'
import Newheader from '../WebSite_Componets/Newheader'


import Newfooter from '../WebSite_Componets/Newfooter'
import HPrivac from '../WebSite_Componets/HPrivac'
import Phero from '../WebSite_Componets/Phero'
import { useLocation } from 'react-router-dom'
function Privacypolicy() {

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
                  <div id="head2">
            <Phero title="Privacyverklaring – Ongeschreven Leven" />
            </div>
            <HPrivac />
            <Newfooter />
        </>
    )
}

export default Privacypolicy
