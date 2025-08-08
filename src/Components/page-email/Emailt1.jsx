import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../Toaster/Toaster";
const Emailt1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetloading, setResetLoading] = useState(false);
  const location = useLocation();

  // To parse query parameters
  const queryParams = new URLSearchParams(location.search);

  // Accessing the parameters
  const isDirectReset = queryParams.get("reset");

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate("");

  useEffect(() => {
    if (isDirectReset === "true" || isDirectReset === true) {
      setShowCodeInput(true); // Show the code input field
    } else {
      setShowCodeInput(false); // Show the code input field
    }
  }, []);

  const onSubmit = async () => {
    // Check if fields are empty
    if (!email || !password) {
      showErrorToast("All fields are required");

      return; // Exit early if fields are empty
    }
    setLoading(true);

    try {
      // Sending the POST request
      const response = await axios.post(`${baseUrl}/set-password`, {
        email,
        password,
      });

      // If response is successful, handle success
      if (response.data.token) {
        // Save data in localStorage (or whatever data you want to store)
        localStorage.setItem("userId", response.data.user._id);

        navigate("/dashboard");

        // Show success toast

        showSuccessToast("Password set successfully!");
      } else {
        // Handle unexpected successful responses (if needed)
        showErrorToast("Something went wrong! Please try again.");
      }
    } catch (error) {
      // If there is an error, show the error message
      console.error("Error:", error);

      showErrorToast(
        error.response?.data?.message || "Error occurred while setting password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForget = async () => {
  if (!email) {
    showErrorToast("Email field is required");
    return; // Exit early if fields are empty
  }

  try {
    // Sending the POST request
    const response = await axios.post(`${baseUrl}/forgot-pass`, {
      email,
    });

    // If response is successful, handle success
    if (response.data.message) {
      showSuccessToast("Code sent to your email!");
      setShowCodeInput(true); // Show the code input field
    } else {
      // Handle unexpected successful responses (if needed)
      showErrorToast("Something went wrong! Please try again.");
    }
  } catch (error) {
    // If there is an error, show the error message
    console.error("Error:", error);
    showErrorToast(
      error.response?.data?.message || "Error occurred while setting password"
    );
  }
};


const onResetSubmit = async () => {
  if (!email || !password || !code) {
    showErrorToast("All fields are required");
    return; // Exit early if fields are empty
  }

  setResetLoading(true);
  try {
    // Sending the POST request
    const response = await axios.post(`${baseUrl}/reset-pass`, {
      email,
      password,
      code,
    });

    // If response is successful, handle success
    if (response.data.token) {
      localStorage.setItem("userId", response.data.user._id);

      navigate("/dashboard");

      // Show success toast
      showSuccessToast("Password set successfully!");
    } else {
      // Handle unexpected successful responses (if needed)
      showErrorToast("Something went wrong! Please try again.");
    }
  } catch (error) {
    // If there is an error, show the error message
    console.error("Error:", error);
    showErrorToast(
      error.response?.data?.message || "Error occurred while setting password"
    );
  } finally {
    setResetLoading(false);
  }
};

  return (
    <>
      <section className="Emailt1">
        <div className="main-Emailt1">
          <div className="Emailt1-logo">
            <img src={logo} alt="" />
          </div>
          <div className="Emailt1-heading">
            <h2>Welkom terug</h2>
            <p>
              Voer je e-mailadres in om in te loggen op je account. We sturen je
              een beveiligde link om in te loggen.
            </p>
          </div>
          <div className="Emailt1-group-box">
            <div className="Emailt1-group">
              <label>E-mailadres</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
            placeholder="Uw e-mailadres hier"
              />
            </div>
            <div className="Emailt1-group">
              <label>Set Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"

                placeholder="Voer uw wachtwoord in"
              />
            </div>
            {showCodeInput && (
              <div className="Emailt1-group">
                <label>Enter Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the 5-digit code"
                />
              </div>
            )}
            {!showCodeInput ? (
              <div className="Emailt1-btn">
                <button disabled={loading} onClick={() => onSubmit()}>
                  {loading ? "Verwerken..." : "Set Password"}
                </button>
              </div>
            ) : (
              <div className="Emailt1-btn">
                <button disabled={resetloading} onClick={() => onResetSubmit()}>
                  {resetloading ? "Verwerken..." : "Reset Password"}
                </button>
              </div>
            )}

            <div className="Emailt1-link">
              <p>
                NEW TO Ongeschrevan Levan?{" "}
                <span onClick={handleForget}> Forget</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Emailt1;
