import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { ToastContainer, toast } from "react-toastify";
import Successfulpic from "../assets/Successful.png";
import {
  showErrorToast,
  showSuccessToast,
} from "../Components/Toaster/Toaster";
import { async } from "regenerator-runtime";
import { ReSubs } from "../context/ReSubsContext";

const SuccessfulSubscription = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate("");
  const query = new URLSearchParams(location.search);
  const isCalled = useRef(false);
  const isRenew = query.get("renew");
  const increaseAction = query.get("increaseAction");
  const { setIsActive, isActive, setOpenToBlock } = ReSubs();
  useEffect(() => {
    if (!isActive || isActive) {
      setOpenToBlock(false);
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    const paymentId = query.get("paymentId");
    const token = query.get("token");
    const subscriptionform = localStorage.getItem("subscriptionform");

    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/payment-success-subscription`,
          {
            params: { paymentId, token, subscriptionform },
          }
        );
        const result = response.data;
        setStatus(result.paid ? "success" : "failed");
        if (!result?.userData && !result?.userData?._id) {
          showSuccessToast(result.message);
          setMessage(result.message);

          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          localStorage.setItem("currentuser", JSON.stringify(result?.userData));
          localStorage.setItem("userId", result?.userData?._id);

          setMessage(result.message);

          showSuccessToast(result.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        }
      } catch (error) {
        setStatus("failed");
        setMessage(error.response?.data?.message || "Error verifying payment");
        showErrorToast(
          error.response?.data?.message || "Error verifying payment"
        );
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } finally {
        const formType = subscriptionform; // store before removing
        localStorage.removeItem("subscriptionform");
      }
    };

    const verifyRenewPayment = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/renewSubscription-status`,
          {
            params: { paymentId, token, subscriptionform, increaseAction },
          }
        );
        const result = response.data;
        setStatus(result.paid ? "success" : "failed");
        localStorage.setItem("currentuser", JSON.stringify(result?.userData));
        localStorage.setItem("userId", result?.userData?._id);
        setIsActive(result?.userData?.isActive)
        setMessage(result.message);
        showSuccessToast("Betaling geslaagd");
      } catch (error) {
        setStatus("failed");
        setMessage(error.response?.data?.message || "Error verifying payment");
        showErrorToast(
          error.response?.data?.message || "Error verifying payment"
        );
      } finally {
        const formType = subscriptionform; // store before removing
        localStorage.removeItem("subscriptionform");
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
    };

    if (paymentId && token && !isCalled.current) {
      if ((isRenew && isRenew == 1) || (increaseAction && increaseAction > 0)) {
        verifyRenewPayment();
        isCalled.current = true;
      } else {
        verifyPayment();
        isCalled.current = true;
      }
    } else {
      if (status !== "loading") {
        setStatus("failed");
        setMessage("Invalid payment details");

        showErrorToast("Invalid payment details");
      }
    }
  }, [location]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section className="Successful">
        <div className="Successful-main">
          {status === "loading" && <p>Betaling wordt gecontroleerd...</p>}
          {status === "success" && (
            <>
              <img src={Successfulpic} alt="" />

              <h2>{status ? "Betaling geslaagd" : "Betaling niet geslaagd"}</h2>
            </>
          )}
          {status === "failed" && <p style={{ color: "red" }}>{message}</p>}
        </div>
      </section>
    </>
  );
};

export default SuccessfulSubscription;
