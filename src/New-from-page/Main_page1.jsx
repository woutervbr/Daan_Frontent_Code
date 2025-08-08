import React, { useEffect, useState } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import Subscriptionform from "./New_form_componets/Subscriptionform";
import logopostion from "../../src/assets/logopostion.png";
import { Link } from "react-router-dom";
import StorySubscriptioncard from "./New_form_componets/StorySubscriptioncard";
import { useCopies } from "../context/CopiesContext";

const Main_page1 = () => {
  const [currOpt, setCurrOpt] = useState("");
  const { setInitialAmount, setNoOfCopiesState, setAudioBook, setCardGame } =
    useCopies();

  useEffect(() => {
    setNoOfCopiesState(0);
    setInitialAmount(89);
    setAudioBook(0);
    setCardGame(0);
  }, []);
  const subsFor = localStorage.getItem("subscriptionform");

  return (
    <>
      <section className="Main_page1-sec     add-class-1">
        <div className="container-ar">
          <div className="Main_page1-logo">
            <Link to="/">
              <img src={logopostion} alt="" />
            </Link>
          </div>
          <div className={"main-Main_page1"}>
            <div className="Main_page1-from">
              <Subscriptionform setCurrOpt={setCurrOpt} />
            </div>
            {currOpt !== "buyCard" ? (
              <div className="Main_page1-side-compo">
                <StorySubscription
                  title="Het Ongeschreven Leven Levensboek"
                  price="$900.00"
                  discount="$10 off"
                  promo=" ( Promo code hhjjgg Applied )"
                  total="$600"
                  includes={[
                    "1 jaar toegang tot alle levensvragen",
                    "Zelf schrijven of inspreken via spraak-naar-tekst",
                    "Professioneel geschreven levensverhaal",
                    "Luxe hardcover boek (full color)",
                    "Persoonlijke omslag met eigen foto",
                    "Foto’s en video’s via QR-code toevoegen",
                  ]}
                />
              </div>
            ) : (
              <div className="Main_page1-side-compo  add-new">
                <StorySubscriptioncard
                  price="€100,-"
                  discount="20%"
                  promo="LUCKY20"
                  total="$80"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Main_page1;
