import React from "react";
import questionbook from "../assets/questionbook.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FutureBook from "../pages/FutureBook";
import { showErrorToast } from "./Toaster/Toaster";

const Questionoftheweek = () => {
  const navigate = useNavigate();
  const giveAnswer = useSelector((state) => state.questionCounter.giveAnswer);

  const previewBook = () => {
    // navigate('/ReviewBook')

    if (giveAnswer) {
      navigate("/ReviewBook"); // Navigate to review book
    } else {
      showErrorToast("Please give the answer to the questions.");
    }
  };
  return (
    <div className="questionoftheweek-div-ar">
      {/* <ToastContainer
            position="top-center"
            autoClose={3000}
          /> */}

      <div className="inner-question-bok-ar">
        {/* <div className="question-book-img-ar">
              <img src={questionbook} alt="" />
            </div> */}
        <h5>U heeft de vraag van de week beantwoord</h5>
        <h6>
 Benieuwd hoe uw boek er nu uitziet? Bekijk het via de knop hieronder.
        </h6>
        <button onClick={previewBook}>
          Bekijk een voorbeeld van mijn boek
        </button>
      </div>
    </div>
  );
};

export default Questionoftheweek;
