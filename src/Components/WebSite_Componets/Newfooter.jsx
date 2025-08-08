import React from "react";
import footerLogo from "../../assets/footerLogo.png";
import facebookIcon from "../../assets/facebookIcon.png";
import instagramImg from "../../assets/instagramImg.png";
import Visa5 from "../../assets/Visa5.png";
import Visa3 from "../../assets/Visa3.png";
import Visa2 from "../../assets/Visa2.png";
import Visa1 from "../../assets/Visa1.png";
import ApplePay from "../../assets/ApplePay.png";
import klarna from "../../assets/klarna.png";
import idealLogo from "../../assets/idealFooter.png";
import Discover from "../../assets/Discover.png";
import GooglePay from "../../assets/GooglePay.png";
import { Link } from "react-router-dom";
import Twitter from "../../assets/Twitter.png";
function Newfooter() {
  const handleNavigate = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <footer>
        <div className="New-container">
          <div className="New-main-footer">
            <div className="footer-portion  logo">
              <div className="footer-logo">
                <img src={footerLogo} alt="" />
              </div>
              <p>Elk leven verdient het om herinnerd te worden</p>
              <div className="facebook-insta">
                <img
                  onClick={() =>
                    handleNavigate("https://www.facebook.com/ongeschrevenleven")
                  }
                  src={facebookIcon}
                  alt="facebook"
                />
                <img
                  onClick={() =>
                    handleNavigate(
                      "https://www.instagram.com/ongeschrevenleven/"
                    )
                  }
                  src={instagramImg}
                  alt="Instagram"
                />
                <img
                  onClick={() => handleNavigate("https://x.com/Ongeschrvnlvn")}
                  src={Twitter}
                  alt="Twitter"
                />
              </div>
            </div>
            <div className="footer-portion">
              <h2>Direct naar </h2>
              <ul>
                <Link to="/Producten#head3">
                  <li> Producten</li>
                </Link>
                <Link to="/Works#head6">
                  <li>Hoe het werkt</li>
                </Link>
                <Link to="/News#head4">
                  <li>Nieuws</li>
                </Link>
                <Link to="/Contact#head5">
                  <li>Contact</li>
                </Link>
              </ul>
            </div>
            <div className="footer-portion">
              <h2>Praktische info</h2>
              <ul>
                <Link to="/Privacypolicy#head2">
                  {" "}
                  <li> Privacyverklaring</li>
                </Link>
                <Link to="/Algemene#heading">
                  <li>Algemene voorwaarden</li>
                </Link>
              </ul>
            </div>
            <div className="footer-portion">
              <ul>
                <li>info@ongeschrevenleven.nl</li>
              </ul>
            </div>
          </div>
          <div className="copyright-portion">
            <div className="copyright-p">
              <p>Ongeschreven Leven © 2025</p>
            </div>
            <div className="payment-box">
              <img src={klarna} alt="" />    
              <img src={GooglePay} alt="" />    
              <img src={ApplePay} alt="" />
              <img src={Visa1} alt="" />
              <img src={Visa5} alt="" />
              <img src={idealLogo} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Newfooter;
