import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../assets/cross.png";
import signupImage from "../assets/signup.png";

import { signup } from "../Redux/Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import VoiceRecorder from "../Components/recorderaudio/AudioRecorder";
import { showErrorToast } from "../Components/Toaster/Toaster";

const Signup = () => {
  const navigate = useNavigate();
  const [audioBlob, setAudioBlob] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    buyeremail: "",

    password: "",
    rememberMe: false,
    isFirstPayFree:true
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showErrorToast("Alle velden zijn verplicht!");
      return;
    }

    localStorage.setItem("signupData", JSON.stringify(formData));
    // navigate("/dashboard", { state: audioBlob });

    const result = await dispatch(
      signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        buyeremail: formData.buyeremail,
        isFirstPayFree: formData.isFirstPayFree,
      })
    );  
    

    if (result?.payload?.data) {
      navigate("/");
    } else {
      showErrorToast(result?.payload?.message || "Unknown error");
    }
  };
  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
  };
  return (
    <section className="signup-section">
      <div className="inner-section-login-ar">
        <div className="signup-form-div">
          <h3>Schrijf je in</h3>
          <h5>
            Let’s get you all set up so you can access your personal account.
          </h5>
          <form>
            <div className="form-input-div-ar">
              <label htmlFor="name">Naam*</label>
              <input
                className="input-ar"
                type="text"
                name="name"
                value={formData.name}
                placeholder="John"
                onChange={handleChange}
              />

              <label htmlFor="email">E-mailaddres van koper*</label>
              <input
                className="input-ar"
                type="email"
                name="buyeremail"
                value={formData.buyeremail}
                placeholder="user@gmail.com"
                onChange={handleChange}
              />
              <label htmlFor="email">E-mail*</label>
              <input
                className="input-ar"
                type="email"
                name="email"
                value={formData.email}
                placeholder="john.doe@gmail.com"
                onChange={handleChange}
              />

              {/* <label htmlFor="password">Record Your Voice*</label>
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} /> */}
            </div>

            {/* <div className="btn-div">
              <button type="submit" disabled={loading} style={{ color: 'white' }}>
                {loading ? "Signing up..." : "Sign up"}

              </button>
           
            </div> */}

            <div className="btn-div">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                style={{ color: "white" }}
              >
                {/* {loading ? "Signing up..." : "Sign up"} */}
                Volgende
              </button>

              <p>
                Heeft u al een account?{" "}
                <Link to="/Login">
                  <strong>Login</strong>
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="right-img-div-ar">
          <div className="login-img-ar">
            <img src={signupImage} alt="Sign up" />
          </div>
          {/* <div className="cross-div-ar">
            <img src={cross} alt="Close" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Signup;
