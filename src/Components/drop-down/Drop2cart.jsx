import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PayPal from "../../assets/PayPal.png";
import ideal from "../../assets/ideal.jfif";
import PayPalButtonComponent from "../../pages/paypal";
import PayPalButtonComponentCart from "../../pages/paypalcart";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../baseUrl";
import { showErrorToast } from "../Toaster/Toaster";
import { useCopies } from "../../context/CopiesContext";
import { copies_data, getCopyAmount } from "../../utils/CopiesArr";
import { resetActiveStep } from "../../Redux/Features/QuestionsSlice";

const Drop2Cart = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const {
    extraPgCost,
    isAbleToPay,
    cardGame,
    audioBook,
    copiesCounter,
    bookCounter,
    setBookCounter,
    finalAmount,
  } = useCopies();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const { counter, price } = useSelector((state) => state.questionCounter);
  const navigate = useNavigate();
  // Function to toggle popup visibility
  const handleViewClick = () => {
    setIsPopupVisible(true); // Show the popup
  };
  const handleViewClick2 = () => {
    setIsPopupVisible2(true); // Show the popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };
  const handleClosePopup2 = () => {
    setIsPopupVisible2(false); // Hide the popup
  };

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = getCopyAmount(userDetails?.numberOfCopies);
      const finalCopyRate = result?.amount || 0;

      const cartId = localStorage.getItem("cartId");

      let body = {
        price: finalAmount,
        counter: copiesCounter,
        userId: myCurrId,
        cartId,
        audioBook,
        cardGame,
        bookCounter,
      };

      // Step 1: Place the orderF
      const response = await axios.post(`${baseUrl}/orderpayemt`, body);

      if (response.status === 200) {
        body.orderId = response.data?.data?._id;
        try {
          if (isAbleToPay && isAbleToPay === true) {
            // Step 2: Create iDEAL payment
            const paymentresponse = await axios.post(
              `${baseUrl}/create-payment-ideal`,
              body
            );

            const checkOutUrl = paymentresponse?.data?.checkoutUrl;
            if (checkOutUrl) {
              window.open(checkOutUrl, "_blank");
            } else {
              throw new Error("No checkout URL received from payment API.");
            }
          } else if (isAbleToPay === false) {
          dispatch(resetActiveStep());

            userDetails.isFirstPayFree = false;
            localStorage.setItem("currentuser", JSON.stringify(userDetails))
            navigate(
              `/Successful?orderComp=true&orderId=${response.data?.data?._id}`
            );
          }
        } catch (paymentErr) {
          console.error("Payment API error:", paymentErr);
          showErrorToast("Failed to initiate iDEAL payment.");
        }
      } else {
        showErrorToast("Failed to place order.");
      }
    } catch (error) {
      console.error("Order API error:", error);
      showErrorToast("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="select-station-drop">
        <div  className="dropdwon-1-list">
          {isAbleToPay ? (
            <h3>
            
              Je kunt betalen met iDEAL, Apple Pay, Klarna, creditcard, bankoverschrijving of Google Pay. 
            </h3>
          ) : (
            <h3>{loading ? "Verwerken..." : "Bevestig bestelling"}</h3>
          )}

         

          {/* <div className="more-box-cion">
            <img src={ideal} alt="" />
          </div> */}
        </div>
        

        {/* {isOpen && (
          <div className="taba">
            <PayPalButtonComponentCart />
          </div>
          //    <div className="new-box-item">
          //    <input type="number"  placeholder="0000 0000 0000 0000"/>
          //    <input type="text"placeholder="Name On Card" />

          //    <button>Submit</button>
          //  </div>
        )} */}
      </div>
      <div className="pay-btn new">
            <button onClick={() => handleClick(!isOpen)}>{loading ? "Verwerken..." :   "Afrekenen en betalen"}</button>
          </div>
    </>
  );
};

export default Drop2Cart;
