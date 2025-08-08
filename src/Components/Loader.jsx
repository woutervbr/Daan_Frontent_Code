import React from "react";

const Loader = () => {
  return (
    <>
      <div class="loader">
        <div class="loading-text">
          
Laden<span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
        <div class="loading-bar-background">
          <div class="loading-bar">
            <div class="white-bars-container">
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
