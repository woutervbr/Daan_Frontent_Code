import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function StickyCta({footerRef}) {
        const [showButton, setShowButton] = useState(false);
    
        const navigate = useNavigate();

        useEffect(() => {
                const handleScroll = () => {
                    const scrollY = window.scrollY;
                    const show = scrollY > 200; 
        
                    if (footerRef.current) {
                        const footerTop = footerRef.current.getBoundingClientRect().top;
                        const windowHeight = window.innerHeight;
                        
                        if (footerTop < windowHeight) {
                            setShowButton(false);
                        } else {
                            setShowButton(show);
                        }
                    } else {
                        setShowButton(show);
                    }
                };
        
                window.addEventListener('scroll', handleScroll);
                return () => {
                    window.removeEventListener('scroll', handleScroll);
                };
            }, []);
    
  return (
    <div
      className={`floating-get-started-button-container ${
        !showButton ? "hidden" : ""
      }`}
    >
      <button onClick={() => navigate("/Main_page1")}>
        Aan de slag met dit boek
      </button>
    </div>
  );
}

export default StickyCta;
