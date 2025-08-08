import React, { useState, useEffect } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import Will_Purchase from "./New_form_componets/Will_Purchase";
import logopostion from "../../src/assets/logopostion.png";
import { Link } from "react-router-dom";
import StorySubscriptioncard from "./New_form_componets/StorySubscriptioncard";

const Inner_page4 = () => {
  const [giftData, setgiftData] = useState();
  useEffect(() => {
    const giftData = localStorage.getItem("giftDeliveryData");
    if (giftData) {
      const parsedData = JSON.parse(giftData);
      setgiftData(parsedData)
    }
  }, []);
  const subsFor = localStorage.getItem("subscriptionform")


  return (
    <>
      <section className="Main_page1-sec    add-class-3">
        <div className="container-ar">
          <div className="Main_page1-logo">
            <Link to="/">
              <img src={logopostion} alt="" />
            </Link>
          </div>
        <div className={subsFor ?"main-Main_page-news" :"main-Main_page1"}>
            <div className="Main_page1-from">
              <Will_Purchase amount={80} />
            </div>
            <div className="Main_page1-side-compo">
              <StorySubscriptioncard
                price="€100,-"
                discount="20%"
                promo="LUCKY20"
                total="$80"
              />


            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Inner_page4;
