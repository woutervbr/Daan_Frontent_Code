import React, { createContext, useContext, useEffect, useState } from "react";

const PayMethodContext = createContext();

export const PayMethodProvider = ({ children }) => {
  const [showApplePay, setShowApplePay] = useState(false);
  const [showGooglePay, setShowGooglePay] = useState(false);

  function isApplePayAvailable() {
    return window.ApplePaySession && ApplePaySession.canMakePayments();
  }

  function isGooglePayAvailable() {
    return (
      (window.PaymentRequest !== undefined &&
        /Chrome/.test(navigator.userAgent) &&
        navigator.userAgent.includes("Android")) ||
      navigator.userAgent.includes("Windows") ||
      navigator.userAgent.includes("Mac")
    );
  }

  useEffect(() => {
    setShowApplePay(isApplePayAvailable());
    setShowGooglePay(isGooglePayAvailable());
  }, []);

  return (
    <PayMethodContext.Provider value={{ showApplePay, showGooglePay }}>
      {children}
    </PayMethodContext.Provider>
  );
};

export const paymentMethods = () => useContext(PayMethodContext);
