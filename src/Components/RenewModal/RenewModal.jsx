import React, { useEffect, useRef, useState } from "react";
import idealLogo from "../../assets/ideal-logo.png";
import amount from "../../assets/amount.png";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { showErrorToast } from "../Toaster/Toaster";
import { useCopies } from "../../context/CopiesContext";
import { copies_data } from "../../utils/CopiesArr";
import Copy from "../drop-down/copy";
import { useNavigate } from "react-router-dom";

function RenewModal({
  show,
  setShow,
  isAddCopies = false,
  forBlock = false,
  title,
  descp,
  reSubs = false,
  email = "",
  userId=""
}) {
  const [loading, setLoading] = useState(false);
  const basicAmount = isAddCopies ? 0 : reSubs ? 82 : 30;
  const [totalAmount, setAmount] = useState(basicAmount);
  const [isMobile, setIsMobile] = useState(false);

  const modalRef = useRef();
  const {  noOfCopies, initialAmount, setInitialAmount } =
    useCopies();
  const navigate = useNavigate();

  const currentuserData = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId =userId ? userId : currentuserData?.inviteBy
    ? currentuserData?.inviteBy
    : currentuserData?._id;

    
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShow]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      let findNumOfCopies = null;

      // If additional copies are requested
      if (isAddCopies) {
        findNumOfCopies = copies_data.find((obj) => obj.amount === noOfCopies);
        if (!findNumOfCopies) {
          showErrorToast("Ongeldig aantal exemplaren geselecteerd.");
          return;
        }
      }

      // Build the request body
      const body = {
        userId: myCurrId,
        amount: totalAmount,
      };

      if (findNumOfCopies) {
        body.increaseCopies = findNumOfCopies.number;
      }else if(reSubs){
        body.increaseCopies = 1;
        body.reSubs = true;
      }


      // Make API request
      const response = await axios.post(`${baseUrl}/renewSubscription`, body);

      // Validate response and redirect
      const checkoutUrl = response?.data?.checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
      } else {
        showErrorToast("Betaling mislukt: Geen afreken-URL ontvangen.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      const message =
        error?.response?.data?.error ||
        "Something went wrong while processing payment.";
      showErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAddCopies) return;

    setAmount(noOfCopies);
  }, [noOfCopies]);

  const handleNavigate = () => {
    navigate("/Myaccount",{
      state:2
    });
    setShow(false);
  };

  return (
    <div className="renew-modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="close-btn">
          <button className="clous-btn" onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.5 0C14.5632 0 0 14.5632 0 32.5C0 50.4367 14.5632 65 32.5 65C50.4367 65 65 50.4367 65 32.5C65 14.5632 50.4367 0 32.5 0ZM27.9013 32.5L18.7103 23.3057C17.4427 22.0382 17.4427 19.9778 18.7103 18.7103C19.9778 17.4427 22.0382 17.4427 23.3057 18.7103L32.5 27.9045L41.691 18.7103C42.9585 17.4427 45.019 17.4427 46.2865 18.7103C47.5573 19.9778 47.5573 22.0382 46.2865 23.3057L37.0955 32.5L46.2865 41.691C47.5573 42.9585 47.5573 45.019 46.2865 46.2865C45.019 47.5573 42.9585 47.5573 41.691 46.2865L32.5 37.0955L23.3057 46.2865C22.0382 47.5573 19.9778 47.5573 18.7103 46.2865C17.4427 45.019 17.4427 42.9585 18.7103 41.691L27.9013 32.5Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        <h1>{title}</h1>
        <p>{descp}</p>
        <div className="input-section">
          {!forBlock && (
            <>
              <label>E-mailadres              </label>
              <input
                value={email || currentuserData?.email}
                disabled
                type="email"
                name=""
                id=""
              />
              <label>Betaalmethode</label>
              <div className="payment-method betaalmethode">
                {isMobile ? (
                  <span>
 Je kunt veilig betalen met iDEAL, Apple Pay, Creditcard en
 meer.                  </span>
                ) : (
                  <span>
                    Je kunt veilig betalen met iDEAL, Apple Pay, Creditcard en
                    meer.
                  </span>
                )}
              </div>
              {isAddCopies && (
                <>
                  <label>Totaal aantal exemplaren</label>

                  <Copy classToAdd="backWhite" />
                </>
              )}
              <label>Totaal bedrag</label>
              <div className="payment-method">
                <img src={amount} alt="" />
                <span>€{totalAmount},-</span>
              </div>
            </>
          )}
          <div
            style={{ marginTop: !forBlock ? "50px" : "0px" }}
            className="pay-btn"
          >
            {forBlock ? (
              <button className="blockBtn" onClick={handleNavigate}>
                Doorgaan
              </button>
            ) : (
              <button disabled={totalAmount === 0} onClick={handlePayment}>
                {loading ? "Betalen..." : "Betalen"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenewModal;
