// CopiesContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCopyAmount } from "../utils/CopiesArr";

// Context create
const CopiesContext = createContext();

// Provider component
export const CopiesProvider = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("currentuser")) || {};
  const baseCopies = Number(userDetails?.numberOfCopies) || 0; // just to be safe

  const [initialAmount, setInitialAmount] = useState(0); // default value
  const [noOfCopies, setNoOfCopiesState] = useState(0); // default value
  const [audioBook, setAudioBook] = useState(0); // default value
  const [cardGame, setCardGame] = useState(0); // default value
  const [isAbleToPay, setAbleToPay] = useState(false); // default value
  const [extraPgCost, setExtraPgCost] = useState(0); // default value
  const [imageView, setImageView] = useState(null);
  const [bookCounter, setBookCounter] = useState(0);
const [copiesCounter, setCopiesCounter] = useState(baseCopies );
const [discount, setDiscount] = useState(0);
const [copyOGAmount, setCopyOGAmount] = useState(0);
useEffect(() => {
  setCopiesCounter(baseCopies ); // ensure reset on first load
}, [baseCopies]);


const finalAmount = (
  noOfCopies > 0
    ? initialAmount + noOfCopies + audioBook + cardGame
    : bookCounter > 0
    ? getCopyAmount(bookCounter)?.amount +
      initialAmount +
      audioBook +
      cardGame
    : initialAmount + audioBook + cardGame
) - discount;

const originalAmount = (
  copyOGAmount > 0
    ? 119 + copyOGAmount + audioBook + cardGame
    : bookCounter > 0
    ? getCopyAmount(bookCounter)?.amount +
      119 +
      audioBook +
      cardGame
    : 119 + audioBook + cardGame
);


  // Load from localStorage on mount
  // useEffect(() => {
  //   const stored = localStorage.getItem("noOfCopies");
  //   if (stored) {
  //     setNoOfCopiesState(Number(stored));
  //   }
  // }, []);

  // Set state + localStorage
  const setNoOfCopies = (value) => {
    setNoOfCopiesState(value);
  };

  return (
    <CopiesContext.Provider
      value={{
        setNoOfCopiesState,
        noOfCopies,
        setNoOfCopies,
        setAudioBook,
        audioBook,
        initialAmount,
        setInitialAmount,
        finalAmount,
        setCardGame,
        cardGame,
        setAbleToPay,
        isAbleToPay,
        setExtraPgCost,
        extraPgCost,
        setImageView,
        imageView,
        setCopiesCounter,
        copiesCounter,
        setBookCounter,
        bookCounter,
        discount,
        setDiscount,
        originalAmount,
        setCopyOGAmount,
        copyOGAmount
      }}
    >
      {children}
    </CopiesContext.Provider>
  );
};

// Custom hook
export const useCopies = () => useContext(CopiesContext);
