import React from "react";
import googleImg from "../../assets/google-img.png";
import Storyimg from "../../assets/new-img/cardgame.jpeg";

const StorySubscriptioncard = ({
  title = "Familiegesprekken – het kaartspel dat verbindt:",
  price = "€50",
  discount = "",
  promo = "",
  total = "",
}) => {
  const includes = [
    "150 vragen over vroeger, nu en later",
    "Brengt jong en oud aan tafel in gesprek",
    " Perfect voor familieavonden of cadeaumomenten",
    "Luxe kwaliteit: stevige kaarten, fluwelen zakje & dobbelsteen",
    "Gesprekken bewaren? Scan de QR en voeg ze toe aan het Levensboek",
  ];
  const handleOptionClick = () => {
    window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");
  };
  return (
    <div className="StorySubscription">
      <div className="StorySubscription-img">
        <img src={Storyimg} alt="Gaming Card" />
      </div>

      <div className="StorySubscription-tital-box">
        <div onClick={handleOptionClick} style={{ marginBottom: "10px" }} className="small-title-google">
          <div className="google-img">
            <img src={googleImg} alt="" />
          </div>
          <div  className="google-title">
            <h3>Google Reviews</h3>
            <div className="google-title-star-img">
              <h3>4.9</h3>
              <span className="five-star">★★★★★</span>
            </div>
          </div>
        </div>
        {title && (
          <h2
            style={{ borderBottom: "1px solid #F7B7A3", padding: "20px 0px" }}
          >
            {title}
          </h2>
        )}

        <div className="StorySubscription-includes">
          {includes.length > 0 && (
            <ul style={{ marginTop: "15px" }}>
              {includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        {/* {price && (
          <span>
            Price : <p>{price}</p>
          </span>
        )}

        {discount && (
          <span>
           Discount:
            <p>{discount}</p>
           <p>{promo && `${promo}`}</p>
          </span>
        )}

        {total && (
          <span>
            Total : <p>{total}</p>
          </span>
        )} */}
      </div>
    </div>
  );
};

export default StorySubscriptioncard;
