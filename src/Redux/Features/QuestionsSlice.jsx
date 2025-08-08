// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const totalPages = Number(localStorage.getItem("totalPages")) || 0;

// Safe parse for currentUser
let currentUser = null;
try {
  const storedUser = localStorage.getItem("currentuser");
  if (storedUser && storedUser !== "undefined") {
    currentUser = JSON.parse(storedUser);
  }
} catch (error) {
  console.warn("Error parsing currentuser:", error);
}

// Fallback to 1 if userCopies is not defined
const userCopies = currentUser?.numberOfCopies || 1;


const questionCounterSlice = createSlice({
  name: "questionCounter",
  initialState: {
    value: 0,
    activeStep: 0,
    activeComponent: 0,
    selectedOption: null,
    changeChapter: 1,
    giveAnswer: false,
    questionLimit: 1,
    uploadStatus: false,
    menuopen: false,
    counter: userCopies,
    totalPages: totalPages,
    price: totalPages > 80 ? 120 : 90,
    enhanceBook: null,
    userDetails: [],
  },
  reducers: {
    increment: (state) => {
      if (state.changeChapter != 11) {
        state.value += 1;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementstep: (state, action) => {
      const nextStep = action.payload; // Step number passed in action

      if (nextStep >= 0 && nextStep <= 6) {
        state.activeStep = nextStep;
      }
    },
    setStep: (state, action) => {
      state.activeStep = action.payload;
    },
    
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    decrementstep: (state) => {
      if (state.activeStep > 0) state.activeStep -= 1; // Prevent going below 0
    },

    incrementChapter: (state) => {
      if (state.changeChapter != 11) {
        state.changeChapter += 1;
      }
    },
    resetIncrementPrevBtn: (state) => {
      state.value = -1;
    },
    resetIncrementNextBtn: (state) => {
      state.value = 0;
    },
    decrementChapter: (state) => {
      if (state.changeChapter != 1) {
        state.changeChapter -= 1;
        state.value = 0;
      }
    },
    setPrice: (state, action) => {

      state.price = action.payload; // Use payload to update `value`
    },
    NavigateQuestionNo: (state, action) => {
      state.value = action.payload; // Use payload to update `value`
    },

    incrementQuestionLimit: (state) => {
      state.questionLimit += 1;
    },

    resetQuestionLimit: (state) => {
      state.questionLimit = 1;
    },
    changeStatus: (state) => {
      state.uploadStatus = !state.uploadStatus;
    },
    togglemenu: (state) => {
      state.menuopen = !state.menuopen;
    },

    setChangeChapter: (state, action) => {
      state.changeChapter = action.payload; // Update `changeChapter` with the provided value
    },
    setGiveAnswer: (state, action) => {
      state.giveAnswer = action.payload; // Action to update `giveAnswer`
    },
    incrementcounter: (state) => {
      const basePricePerBook = parseInt(state.totalPages) > 80 ? 120 : 90;
      state.counter += 1;
      state.price += basePricePerBook;
    },
    decrementcounter: (state) => {
      if (state.counter > 0) {
        const basePricePerBook = parseInt(state.totalPages) > 80 ? 120 : 90;
        state.counter -= 1;
        state.price -= basePricePerBook;
      }
    },

    updateCounterAndPrice: (state, action) => {
      state.counter = action.payload.counter;
      state.price = action.payload.price;
    },
    setEnhanceBook: (state, action) => {
      state.enhanceBook = action.payload; // Action to set enhanceBook
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.userDetails;
    },
    resetActiveStep: (state) => {
      state.activeStep = 0;
    },
  },
});
export const {
  increment,
  incrementChapter,
  resetIncrement,
  decrement,
  decrementChapter,
  NavigateQuestionNo,
  incrementQuestionLimit,
  resetQuestionLimit,
  changeStatus,
  resetIncrementNextBtn,
  resetIncrementPrevBtn,
  togglemenu,
  setChangeChapter,
  setGiveAnswer,
  incrementcounter,
  decrementcounter,
  updateCounterAndPrice,
  incrementstep,
  decrementstep,
  setEnhanceBook,
  setSelectedOption,
  setUserDetails,
  setPrice,
  incrementPrice,
  resetActiveStep,
  setStep,
} = questionCounterSlice.actions;
export default questionCounterSlice.reducer;
