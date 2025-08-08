import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cross from "../assets/cross.png";
import loginImg from "../assets/login.png";
import { login, loginemail } from "../Redux/Features/UserSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../baseUrl";
import { showErrorToast } from "../Components/Toaster/Toaster";

const Loginmain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state

    const credentials = { email, password };

    const result = await dispatch(loginemail(credentials));

    if (login.fulfilled.match(result)) {
      const user = localStorage.getItem("user");


      if (user) {
        try {
          const response = await fetch(`${baseUrl}/protected`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("userId", data.user.id);
            // toast.success("User logged in successfully.");
            navigate("/dashboard");
          } else {
            // Unauthorized access
            showErrorToast("Invalid username or password.");

            localStorage.removeItem("user");
            navigate("/Login");
          }
        } catch (error) {
          showErrorToast("An error occurred. Please try again.");

          // Network error or other issues during the fetch
          console.error("Error during protected request:", error);
        }
      } else {
        showErrorToast("Token missing or invalid. Please log in again.");

        // Token missing or invalid
        navigate("/login");
      }
    } else {
      // Login failed
      showErrorToast(result.payload || "Login failed. Please try again.");
    }
  };

  const gotonavigate = () => {
    navigate("/login");
  };

  return (
    <section className="signup-section">
      {/* <ToastContainer /> */}
      <div className="inner-section-login-ar">
        <div className="signup-form-div">
          <h3>Welkom terug</h3>
          <h5>
            Voer het e-mailaddres in om in te loggen op jouw account. We sturen
            je een beveiligde link om in te loggen
          </h5>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="form-input-div-ar">
            <label htmlFor="email">E-mailaddres *</label>
            <input
              id="email"
              className="input-ar"
              type="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="two-btn-box">
            <button onClick={handleSubmit}>Inloggen met de e-maillink</button>
            <button className="Password-btn-box" onClick={gotonavigate}>
              Inloggen met wachtwoord
            </button>
          </div>
          <div className="add-book-para">
            <p>Nog geen account? Bestel hier jouw boek! (CTA)!</p>
          </div>
          {/* </form> */}
        </div>
        <div className="right-img-div-ar">
          <div className="login-img-ar">
            <img src={loginImg} alt="Login Illustration" />
          </div>
          {/* <div className="cross-div-ar">
            <img src={cross} alt="Close" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Loginmain;
