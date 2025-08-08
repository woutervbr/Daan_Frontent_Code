import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cross from "../assets/cross.png";
import loginImg from "../assets/login.png";
import { login } from "../Redux/Features/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../baseUrl";
import logo from "../assets/logo.png";
import {
  showErrorToast,
  showSuccessToast,
} from "../Components/Toaster/Toaster";
import axios from "axios";
import RenewModal from "../Components/RenewModal/RenewModal";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setError(""); // Reset the error state

    const credentials = { email, password };

    const result = await dispatch(login(credentials));

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
            // console.log(data.user.id, "userid");
            localStorage.setItem("userId", data.user.id);
            // localStorage.setItem("currentuser", data.user);
            // localStorage.setItem("currentuser", data.user);

            // toast.success("User logged in successfully.");
            // navigate("/dashboard");
            // setTimeout(() => {
            // }, 2000);
            navigate("/dashboard");
          } else {
            showErrorToast("Invalid username or password.");
            // Unauthorized access
            localStorage.removeItem("user");
            // navigate("/login");
          }
        } catch (error) {
          // Network error or other issues during the fetch
          console.error("Error during protected request:", error);
          showErrorToast("An error occurred. Please try again.");
          setIsDisabled(false);
        } finally {
          setIsDisabled(false); // Re-enable the button after the request
        }
      } else {
        // Token missing or invalid
        showErrorToast("Token missing or invalid. Please log in again.");
        // navigate("/login");
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(false);

      showErrorToast(result.payload || "Login failed. Please try again.");
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const hanldeEmailLinkLogin = async (e) => {
      e.preventDefault(); // Stop form from refreshing the page
    setIsDisabled(true);

    // Basis e-mailformaat validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showErrorToast("Vul uw e-mailadres in.");
      return;
    }
    if (!emailRegex.test(email)) {
      showErrorToast("Vul een geldig e-mailadres in.");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/login-link`, { email });
      if (response.status === 200) {
        if(response.data.expire){
          setShow(true);
          setUserId(response.data.userId)
        }else{

        
        showSuccessToast("E-mail verzonden. Controleer uw inbox.");
        setEmail("");
      }

      } else {
        showErrorToast("Er is een fout opgetreden. Probeer het opnieuw.");
      }
    } catch (errr) {
      console.log();
      showErrorToast(errr.response.data.error);
    }finally {
          setIsDisabled(false); // Re-enable the button after the request
        }
  };

  // const handleClick = () => {
  //   setIsDisabled(true); // Button ko disable kar do
  // };
  return (
    <>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}

      {show && (
        <RenewModal
          setShow={setShow}
          show={show}
          setIsAddCopies={false}
          isAddCopies={false}
          reSubs={false}
          email={email}
          userId={userId}
          title="Je abonnement is verlopen"
          descp={"Je abonnement is verlopen. Klik op de onderstaande knop om je abonnement te vernieuwen en direct weer toegang te krijgen."}
        />
      )}

      <section className="Emailt1">
        <div className="main-Emailt1">
          <div style={{cursor:"pointer"}} onClick={()=>navigate("/")} className="Emailt1-logo">
            <img src={logo} alt="" />
          </div>
          <div className="Emailt1-heading">
            <h2>Welkom terug</h2>
            <p>
              Voer uw e-mailadres in om in te loggen op uw account. We sturen u
              een beveiligde link om in te loggen.
            </p>
          </div>
          <form className="Emailt1-group-box" onSubmit={hanldeEmailLinkLogin}>
            <div className="Emailt1-group">
              <label style={{fontWeight:"bold"}} htmlFor="email">E-mailadres</label>
              <input
                id="email"
                className="input-ar"
                type="email"
                placeholder="Uw e-mailadres hier"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="Emailt1-group">
              <label htmlFor="password">Wachtwoord *</label>
              <input
                id="password"
                className="input-ar"
                type={showPassword ? "text" : "password"}
                placeholder="Voer uw wachtwoord in"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "relative",
                  left: "95%",
                  bottom: "42px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <svg
                    className="eye"
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    className="eye-slash"
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </span>
            </div> */}

            <div className="Emailt1-btn">
              <button
                style={{
                  backgroundColor: "#FAD7A0",
                  opacity: isDisabled ? 0.5 : 1, // Opacity ko kam karo jab disable ho
                  cursor:
                    email === "" || isDisabled ? "not-allowed" : "pointer", // Cursor ko bhi change karo
                }}
                type="submit"
                // onClick={hanldeEmailLinkLogin}
                disabled={email === "" || isDisabled} // Disable attribute lagao
              >
                Inloggen met e-mail link
              </button>
            </div>

            {/* <div className="Emailt1-link">
              <p>
                <strong
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={hanldeEmailLinkLogin}
                ></strong>
              </p>
            </div> */}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
