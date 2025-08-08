import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // routing hook
import Storyimg from "../../../src/assets/Story.png"; // not used in this file yet

const Subscriptionform = ({ setCurrOpt }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOption) return;
    localStorage.removeItem("subscriptionform");
  }, []);

  useEffect(() => {
    setCurrOpt(selectedOption);
  }, [selectedOption]);

  const handleContinue = () => {
    if (selectedOption === "iWill") {
      navigate("/Inner_page1");
    } else if (selectedOption === "someoneElse") {
      navigate("/Inner_page2");
    } else if (selectedOption === "buyCard") {
      navigate("/Inner_page4"); // add your desired route here
    }
    localStorage.setItem("subscriptionform", selectedOption);
  };

  return (
    <>
      <div className="Subscriptionform">
        <h2>Wie gaat het Levensboek invullen?</h2>

        <div className="Subscriptionform-group-box">
          {/* Option 1 */}
          <div
            className={`Subscriptionform-card ${
              selectedOption === "iWill" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("iWill")}
          >
            <div className="content">
              <label className="checkBox">
                <input
                  type="checkbox"
                  checked={selectedOption === "iWill"}
                  onChange={() => setSelectedOption("iWill")}
                />
                <div className="transition"></div>
              </label>
            </div>
            <p>Ik ga het zelf invullen</p>
          </div>

          {/* Option 2 */}
          <div
            className={`Subscriptionform-card ${
              selectedOption === "someoneElse" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("someoneElse")}
          >
            <div className="content">
              <label className="checkBox">
                <input
                  type="checkbox"
                  checked={selectedOption === "someoneElse"}
                  onChange={() => setSelectedOption("someoneElse")}
                />
                <div className="transition"></div>
              </label>
            </div>
            <p>Ik geef het cadeau aan iemand anders</p>
          </div>

          {/* Option 3 */}
          <div
            className={`Subscriptionform-card ${
              selectedOption === "buyCard" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("buyCard")}
          >
            <div className="content">
              <label className="checkBox">
                <input
                  type="checkbox"
                  checked={selectedOption === "buyCard"}
                  onChange={() => setSelectedOption("buyCard")}
                />
                <div className="transition"></div>
              </label>
            </div>
            <p>Ik wil alleen het kaartspel bestellen</p>
          </div>
        </div>

        <button onClick={handleContinue}>Doorgaan</button>
      </div>
    </>
  );
};

export default Subscriptionform;
