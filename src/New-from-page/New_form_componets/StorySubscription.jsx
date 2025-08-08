import React from "react";
import Storyimg from "../../assets/Boek/Boek.jpeg";
import { useCopies } from "../../context/CopiesContext";
import section2img4 from "../../assets/section2img4.png";
import googleImg from "../../assets/google-img.png";
const StorySubscription = ({
  title = "",
  price = "",
  discount = "",
  promo = "",
  total = "",
  includes = [],
  note = "",
  deliverTo = null, // object: { name, email, date }
  giftMessage = "",
  headDeliver = "",
  headGift = "",
}) => {
  const { noOfCopies, audioBook, initialAmount, finalAmount, cardGame, originalAmount } =
    useCopies();

    const handleOptionClick = ()=>{
      window.open("https://g.page/r/CY57-cQP-AExEBE/review", "_blank");
    };

  return (
    <div className="StorySubscription">
      <div className="StorySubscription-img">
        <img src={Storyimg} alt="" />
      </div>

      <div className="StorySubscription-tital-box">
       <div style={{marginBottom:"10px"}} className="small-title-google">
                       <div className="google-img">
                         <img src={googleImg} alt="" />
                       </div>
                       <div onClick={handleOptionClick} className="google-title">
                         <h3>Google Reviews</h3>
                         <div className="google-title-star-img">
                           <h3>4.9</h3>
                           <span className="five-star">★★★★★</span>
                         </div>
                       </div>
                     </div>
        {title && (
          <h2 style={{ paddingBottom: audioBook > 0 ? "0px" : "20px" }}>
            {title}
          </h2>
        )}
        {audioBook > 0 && (
          <p style={{ paddingTop: "4px" }}>Inclusief audioboek</p>
        )}
        {cardGame > 0 && <p style={{ lineHeight: 0 }}>Inclusief kaartspel</p>}

        <span
          className="grey"
          style={{ paddingTop: cardGame > 0 ? "10px" : "0px" }}
        >
          {" "}
          Total :
          <p className="auto-with center-underline">
            €{originalAmount}, <span>-</span>
          </p>
          <p className="auto-with grey">€{finalAmount},- </p>
        </span>

        {/* {price && (
          <span>
            Price :<p>{price}</p>
          </span>
        )}
        {discount && (
          <span>
          <div className="Discount">   Discount:</div> <div className="Discount-p">{discount}</div>      <div className="Discountx">{promo && `${promo}`}</div>
          </span>
        )}
        {total && (
          <span>
            Total :<p>{total}</p>
          </span>
        )} */}
      </div>

      {includes.length > 0 && (
        <div className="StorySubscription-tital-box">
          <h2 style={{ paddingBottom: "20px" }}>Je krijgt:</h2>
          <ul>
            {includes.map((item, index) => (
              <div>
                <li key={index}> {item}</li>
              </div>
            ))}
          </ul>
        </div>
      )}

      {note && (
        <div className="StorySubscription-p">
          <p>{note}</p>
        </div>
      )}

      {/* ✅ Deliver To Section */}
      {deliverTo && (
        <div className="StorySubscription-tital-box">
          <h2>{headDeliver}</h2>
          <span style={{ paddingTop: "10px" }}>{deliverTo.name}</span>
          <span>{deliverTo.email}</span>
          <span>{deliverTo.date}</span>
        </div>
      )}

      {/* ✅ Gift Message Section */}
      {giftMessage && (
        <div className="StorySubscription-tital-box">
          <h2>{headGift}</h2>
          <span style={{ paddingTop: "10px" }}>{giftMessage}</span>
        </div>
      )}
    </div>
  );
};

export default StorySubscription;
