import React, { useState, useEffect } from "react";
import headphone from "../../../src/assets/new-img/headphone.png";
import cardgame from "../../../src/assets/cardgame.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import ideal from "../../assets/ideal.jfif";
import ApplePay from "../../assets/ApplePay.png";
import GooglePay from "../../assets/GooglePay.png";
import { Link } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../Components/Toaster/Toaster";
import Copy from "../../Components/drop-down/Copy";
import { useCopies } from "../../context/CopiesContext";
import audioIcon from "../../assets/audioIcon.png";
import { copies_data } from "../../utils/CopiesArr";
import { paymentMethods } from "../../context/PayMethondContext";
const Will_Purchase = ({ amount }) => {
  const [giftData, setgiftData] = useState();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    receiveEmails: false,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ideal"); // Default to iDEAL
  const subscriptionform = localStorage.getItem("subscriptionform");

  const {
    noOfCopies,
    setAudioBook,
    audioBook,
    initialAmount,
    finalAmount,
    setCardGame,
    discount,
    setDiscount,
    setInitialAmount,
  } = useCopies();
  const { showApplePay, showGooglePay } = paymentMethods();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setInitialAmount(89);
  }, []);
  const handleClick = (open, method) => {
    setIsOpen(open);
    setPaymentMethod(method); // Set payment method to iDEAL
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName) return "Full name is required.";
    if (!emailRegex.test(formData.email))
      return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm();
    if (validationError) {
      showErrorToast(validationError);
      setLoading(false);
      return;
    }
    let numberOfCopies = 0;

    if (noOfCopies > 0) {
      numberOfCopies = copies_data?.find((data) => data.amount === noOfCopies);
    }

    const payload = {
      type: "user",
      fullName: formData.fullName,
      email: formData.email,
      amount: finalAmount,
      paymentMethod,
      receiveEmails: formData.receiveEmails,
      giftData,
      buyFor: subscriptionform,
      numberOfCopies: numberOfCopies.number || 0,
      audioBook,
      paymentMethod,
      address: formData.address || "",
      land: formData.land || "",
      city: formData.city || "",
      postcode: formData.postcode || "",
    };

    try {
      const response = await axios.post(`${baseUrl}/subscription`, payload);
      showSuccessToast("Doorsturen naar betaling...");

      window.open(response.data.checkoutUrl, "_blank");
      setCode("");
      localStorage.removeItem("giftDeliveryData");
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to initiate payment"
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const giftData = localStorage.getItem("giftDeliveryData");
    if (giftData) {
      const parsedData = JSON.parse(giftData);
      setgiftData(parsedData);
    }
  }, []);

  const handleDiscountCode = async (e) => {
    e.preventDefault();
    if (subscriptionform == "buyCard") return;

    if (!code) {
      showErrorToast("Voer een kortingscode in");
      return;
    }

    const emailToUse =
      subscriptionform === "iWill" ? formData?.email : giftData?.email;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailToUse || !emailRegex.test(emailToUse)) {
      showErrorToast("Voer een geldig e-mailadres in");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/use-campaign`, {
        email: emailToUse,
        code,
      });

      setCode("");
      setDiscount(response.data?.campaign?.discountOn);
      showSuccessToast("Kortingscode succesvol toegepast");
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Kortingscode klopt niet"
      );
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="Will_Purchase">
        <div className="Will_Purchase-step-box">
          <div className="Will_Purchase-step-card">
            <h3>Personalizen </h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card">
            <h3>Afrekenen </h3>
            <div className="line-border"></div>
          </div>
        </div>

        <h2>Maak je bestelling compleet</h2>

        <div className="Will_Purchase-form">
          <div className="Will_Purchase-group">
            <label>Jouw naam</label>
            <input
              type="text"
              name="fullName"
              placeholder="Voer je volledige naam in"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Jouw e-mailadres</label>
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {subscriptionform === "buyCard" ? (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="Will_Purchase-group" style={{ flex: 1 }}>
                  <label>Adres</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Adres"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="Will_Purchase-group" style={{ flex: 1 }}>
                  <label>Land</label>
                  <input
                    type="text"
                    name="land"
                    placeholder="Land"
                    value={formData.land}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="Will_Purchase-group" style={{ flex: 1 }}>
                  <label>Stad</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Stad"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="Will_Purchase-group" style={{ flex: 1 }}>
                  <label>Postcode</label>
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {subscriptionform === "buyCard" ? (
            ""
          ) : (
            <>
              <div className="Will_Purchase-group">
                <label>Voer kortingscode in</label>
                <input
                  type="text"
                  name="discountCode"
                  placeholder="Kortingscode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <div className="apply-btn">
                  <button onClick={handleDiscountCode}>Toepassen</button>
                </div>
              </div>
            </>
          )}

          <div className="Subscriptionform-card">
            <input
              type="checkbox"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleInputChange}
            />
            <p>Ja, ik ontvang graag tips, inspiratie en verhalen via e-mail.</p>
          </div>

          <div className="Privacy-box">
            <p>
              Privacy is belangrijk voor ons. Door te bestellen ga je akkoord
              met onze{" "}
              <a target="_blank" href="/Algemene#heading">
                algemene voorwaarden
              </a>{" "}
              en{" "}
              <a target="_blank" href="/Privacypolicy">
                privacyverklaring
              </a>
              .
            </p>
          </div>
          {subscriptionform === "buyCard" ? (
            ""
          ) : (
            <>
              <div className="Copies-box">
                <h2> Extra exemplaren van het Levensboek bestellen?</h2>
                <Copy />

                <h2>Voeg een luisterboek toe (+ €25)</h2>

                <div className="Make-audiobook-box">
                  <div className="audiobook-check">
                    <input
                      type="checkbox"
                      onChange={(e) => setAudioBook(e.target.checked ? 25 : 0)}
                    />
                  </div>

                  <div className="audiobook-Make-tital">
                    <img src={audioIcon} alt="" />

                    <span>
                      <p>
                        Laat het levensverhaal professioneel inspreken met een
                        stem die past bij de sfeer van het boek (keuze uit 6
                        stemmen).
                      </p>
                    </span>
                  </div>
                </div>

                <h2 className="card-games">
                  Voeg het Familiegesprekken kaartspel toe (+ €30)
                </h2>

                <div className="Make-audiobook-box ">
                  <div className="audiobook-check">
                    <input
                      type="checkbox"
                      onChange={(e) => setCardGame(e.target.checked ? 30 : 0)}
                    />
                  </div>

                  <div className="audiobook-Make-tital">
                    <img src={cardgame} alt="" />

                    <span>
                      <p>
                        Breng generaties samen met 150 vragen. Voor warme,
                        grappige en ontroerende gesprekken aan tafel.
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <h2 style={{ fontSize: "18px" }}>Betaalmethode kiezen</h2>
          <div className="select-station-drop">
            <div
              onClick={() => handleClick(!isOpen, "ideal")}
              className="dropdwon-1-list"
            >
              <h3>
                {loading
                  ? "Verwerken..."
                  : "Je kunt betalen met iDEAL, Apple Pay, Klarna, creditcard, bankoverschrijving of Google Pay."}
              </h3>

              {/* <div className="more-box-cion">
                <img src={ideal} alt="" />
              </div> */}
            </div>
            {/* {showApplePay && (
              <div
                onClick={() => handleClick(!isOpen, "applepay")}
                className="dropdwon-1-list"
                style={{
                  background: paymentMethod === "applepay" ? "#fad7a0" : "",
                }}
              >
                <h3>
                  {loading
                  ? "Verwerken..."
                  : "Je kunt betalen met iDEAL, Apple Pay, Klarna, creditcard, bankoverschrijving of Google Pay."}
                  Apple Pay
                </h3>

                <div className="more-box-cion">
                  <img src={ApplePay} alt="" />
                </div>
              </div>
            )}
            {showGooglePay && (
              <div
                onClick={() => handleClick(!isOpen, "creditcard")}
                className="dropdwon-1-list"
                style={{
                  background: paymentMethod === "creditcard" ? "#fad7a0" : "",
                }}
              >
                <h3>
                  {loading
                  ? "Verwerken..."
                  : "Je kunt betalen met iDEAL, Apple Pay, Klarna, creditcard, bankoverschrijving of Google Pay."}
                  Google Pay
                </h3>

                <div className="more-box-cion">
                  <img src={GooglePay} alt="" />
                </div>
              </div>
            )} */}
          </div>

          <div
            className="Will_Purchase-btn-box"
            style={{ padding: "10px 0px" }}
          >
            <button disabled={loading} onClick={handleSubmit}>
              {loading ? "Verwerken..." : `Verder naar betalen`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Will_Purchase;
