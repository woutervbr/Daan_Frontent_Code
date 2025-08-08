import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hhero from '../WebSite_Componets/Hhero'
import Newheader from '../WebSite_Componets/Newheader'
import Hfaq from '../WebSite_Componets/Hfaq'
import HReviews from '../WebSite_Componets/HReviews'
import HSuperior from '../WebSite_Componets/HSuperior'
import Hverhaal from '../WebSite_Componets/Hverhaal'
import Hcategory from '../WebSite_Componets/Hcategory'
import Hgrandparent from '../WebSite_Componets/Hgrandparent'
import HLogoSlider from '../WebSite_Componets/HLogoSlider'
import HMemories from '../WebSite_Componets/HMemories'
import HJouwUnieke from '../WebSite_Componets/HJouwUnieke'
import Newfooter from '../WebSite_Componets/Newfooter'
import Mobilesec from '../WebSite_Componets/Mobilesec'
import StickyCta from '../StickyCta';
function Homepage() {
    const faqRef = useRef(null);
    const footerRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('section') === 'faq') {
            faqRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);
 

    return (
        <>
            <Newheader />
            <Hhero />
            <HSuperior classname="newback" />
            <HJouwUnieke />
            <Mobilesec />
            <HMemories />
            {/* <HLogoSlider /> */}
            <HReviews />
            <HSuperior  />
            <Hgrandparent />
            <Hverhaal />
            <div ref={faqRef}>
                <Hfaq />
            </div>
            <StickyCta  footerRef={footerRef}/>
            <div ref={footerRef}>
                <Newfooter />
            </div>

        </>
    )
}

export default Homepage
