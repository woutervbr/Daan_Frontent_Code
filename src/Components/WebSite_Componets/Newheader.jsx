import React, { useState, useEffect, useRef } from "react";
import Newlogo from "../../assets/Newlogo.png";
import logo from "../../assets/logo.png";
import NewCartSvg from "../WebSite_Svg/NewCartSvg";
import NewLogSvg from "../WebSite_Svg/NewLogSvg";
import { Link, useNavigate } from "react-router-dom";

function Newheader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const navigate = useNavigate();
  const menuRef = useRef(null); // ref for the sidebar

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="top-header">
        <p>Tijdelijk €30 korting - nu voor maar €89</p>
      </div>
      <header className="New-header">
        <div className="New-container">
          <nav className="New-nav">
            <div className="New-nav-left">
              <Link to="/">
                <div className="New-logo">
                  <img src={Newlogo} alt="Logo" className="destok-logo" />
                  <img src={logo} alt="Logo" className="mobile-logo" />
                </div>
              </Link>

              <div className="box-btn-mobile">
                <button onClick={() => navigate("/Login")} className="New-Log">
                  <NewLogSvg />{" "}
                </button>
                {isMobile &&
                  (menuOpen ? (
                    <button
                      className="New-Log"
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        width="29"
                        height="17"
                        viewBox="0 0 29 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.578125"
                          y="0.210938"
                          width="27.6316"
                          height="3.31579"
                          rx="1.65789"
                          fill="black"
                        />
                        <rect
                          x="1"
                          y="7"
                          width="27.63"
                          height="3"
                          rx="1.5"
                          fill="black"
                        />
                        <rect
                          x="0.578125"
                          y="13.4736"
                          width="27.6316"
                          height="3.31579"
                          rx="1.65789"
                          fill="black"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button className="New-Log" onClick={toggleMenu}>
                      <svg
                        width="29"
                        height="17"
                        viewBox="0 0 29 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.578125"
                          y="0.210938"
                          width="27.6316"
                          height="3.31579"
                          rx="1.65789"
                          fill="black"
                        />
                        <rect
                          x="1"
                          y="7"
                          width="27.63"
                          height="3"
                          rx="1.5"
                          fill="black"
                        />
                        <rect
                          x="0.578125"
                          y="13.4736"
                          width="27.6316"
                          height="3.31579"
                          rx="1.65789"
                          fill="black"
                        />
                      </svg>
                    </button>
                  ))}
              </div>
            </div>

            {/* Mobile Slide Menu */}
            {isMobile ? (
              <div
                ref={menuRef}
                className={`slide-menu ${menuOpen ? "open" : ""}`}
              >
                <ul>
                  <Link to="/Producten">
                    <li>Onze producten</li>
                  </Link>
                  <Link to="/Works">
                    <li>Hoe het werkt</li>
                  </Link>
                  <Link to="/News">
                    <li>Nieuws</li>
                  </Link>
                  <Link to="/Contact">
                    <li>Contact</li>
                  </Link>
                </ul>
                <button
                  onClick={() => navigate("/Main_page1")}
                  className="Get-Started"
                >
                  Begin nu
                </button>
              </div>
            ) : (
              <ul className="desktop-nav">
                <Link to="/Producten">
                  <li>Onze producten</li>
                </Link>
                <Link to="/Works">
                  <li>Hoe het werkt</li>
                </Link>
                <Link to="/News">
                  <li>Nieuws</li>
                </Link>
                <Link to="/Contact">
                  <li>Contact</li>
                </Link>
              </ul>
            )}

            {/* Always visible on both desktop and mobile */}
            <div className="New-nav-btn-box">
              <button
                onClick={() => navigate("/Main_page1")}
                className="Get-Started"
              >
                Begin nu
              </button>
              <button onClick={() => navigate("/Login")} className="New-Log">
                <NewLogSvg /> Inloggen
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Newheader;
