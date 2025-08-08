import React, { useEffect } from "react";
import logo from "../assets/logo.png";
// import profile from "../assets/profile.png";
import profile from "../assets/profileImg.png";
import logout from "../assets/logout.png";
import noti from "../assets/noti.png";
import cart from "../assets/cart.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast } from "./Toaster/Toaster";
const Header = () => {
  const navigate = useNavigate();
  function getSafeUserFromLocalStorage() {
    try {
      const raw = localStorage.getItem("currentuser");
      if (raw && raw !== "undefined" && raw !== "null") {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Invalid user in localStorage:", e);
    }
    return null;
  }

  const userDetails = getSafeUserFromLocalStorage();

  const handleLogout = () => {
    // Clear the user ID from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("subscriptionform");

    localStorage.clear();
    showSuccessToast("U bent succesvol uitgelogd");

    // Prevent navigation back to the protected page
    setTimeout(() => {
      navigate("/Login");
    }, 100); // Timeout to allow toast to show before reload
  };

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    if (!user_id) {
      // handleLogout();
    }
  }, []);

  const backtoanswer = () => {
    navigate("/dashboard");
  };

  return (
    <div className="header-ar">
      {/* <ToastContainer /> */}

      <div className="main-heading-box">
        <div className="logo-ar">
          <Link to="/dashboard">
            <img src={logo} alt="" />
            <p style={{ fontSize: "14px", textAlign: "center" }}>Home</p>
          </Link>
        </div>

        <div className="profile-logout">
          {/* <div className="logout-img-ar">
          <img src={cart} alt="" />
        </div> */}
          {/* <div className="noti-img-ar">
          <img src={noti} alt="" />
        </div> */}
          <div className="logout-img-ar" onClick={handleLogout}>
            <img src={logout} alt="" />
          </div>

          <Link
            to="/Myaccount"
            className="none-list"
            onClick={() => handleChangeIndex(1)}
          >
            <div className="profile-img-ar">
              <img
                src={userDetails?.UserImage ? userDetails?.UserImage : profile}
                alt=""
              />
            </div>
          </Link>

          {window.location.pathname === "/ReviewBook" ? (
            <button className="animated-button" onClick={backtoanswer}>
              {/* <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg> */}
              <span className="text">Terug naar antwoorden</span>
              <span className="circle"></span>
              {/* <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg> */}
            </button>
          ) : (
            <Link to="/ReviewBook" className="none-list-button">
              <button className="animated-button">
                {/* <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg> */}
                <span className="text">Voorbeeldboek</span>
                <span className="circle"></span>
                {/* <svg viewBox="0 0 24 24" className="arr-1  arr-color" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg> */}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
