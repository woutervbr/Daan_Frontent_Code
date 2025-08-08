import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Storyimg from "../../../src/assets/Story.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast } from "../../Components/Toaster/Toaster";

const Gift_Delivery = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sendDate: "",
    from: "",
    message: "Ik geef je dit Levensboek cadeau, zodat jij je mooiste herinneringen kunt vastleggen en wij die voor altijd kunnen bewaren.",
  });
  const [isMessageTouched, setIsMessageTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.firstName && !isMessageTouched) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, ${formData.firstName}   `,
      }));
    }
  }, [formData.firstName, isMessageTouched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "message") {
      setIsMessageTouched(true); // Mark message as manually edited
    }
  };

  const validateForm = () => {
    if (!formData.firstName) return "Recipient's first name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "A valid recipient's email is required.";
    }
    if (!formData.sendDate) return "Send date is required.";
    if (!formData.from) return "From field is required.";
    return "";
  };

  const handleContinue = () => {
    const validationError = validateForm();
    if (validationError) {
      showErrorToast(validationError);

      return;
    }

    // Save form data to localStorage
    localStorage.setItem("giftDeliveryData", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/Inner_page3");
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="Will_Purchase">
        <div className="Will_Purchase-step-box">
          <div className="Will_Purchase-step-card with-shot">
            <h3>Personalizen </h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card with-shot">
            <h3>Verzending</h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card with-shot">
            <h3>Afrekenen </h3>
            <div className="line-border"></div>
          </div>
        </div>

        <h2>Verzendinformatie voor je cadeau</h2>

        <div className="Will_Purchase-form">
          <div className="Will_Purchase-group">
            <label>Naam van de ontvanger</label>
            <div className="hafe-wiy-box">
              <input
                type="text"
                name="firstName"
                placeholder=" Voornaam "
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Achternaam"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="Will_Purchase-group">
            <label>E-mailadres van de ontvanger</label>
            <input
              type="email"
              name="email"
              placeholder="jouw@voorbeeld.nl"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Verstuur dit cadeau op</label>
            <input
              type="date"
              name="sendDate"
              value={formData.sendDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]} // disables past dates
            />
          </div>

          <h2>Voeg een persoonlijk bericht toe</h2>

          <div className="Will_Purchase-group">
            <label>Van wie is dit cadeau?</label>
            <input
              type="text"
              name="from"
              placeholder=" Bijvoorbeeld: jouw naam + kinderen of kleinkinderen"
              value={formData.from}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Jouw bericht</label>
            <textarea
              name="message"
              placeholder="Ik geef je dit Levensboek cadeau, zodat jij je mooiste herinneringen kunt vastleggen en wij die voor altijd kunnen bewaren."
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-btn-box">
            <button onClick={handleContinue}>Doorgaan</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift_Delivery;
