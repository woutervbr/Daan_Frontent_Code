import React, { useEffect, useState } from "react";
import Informationbook from "../../assets/Information.png";
import { useSelector } from "react-redux";
import { useCopies } from "../../context/CopiesContext";
import Game from "../../assets/Game.png";

const Shippingbook = ({
  prevData,
  handleCancel,
  loading,
  dynamicClass = "",
}) => {
  const { counter, price } = useSelector((state) => state.questionCounter);
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));

  const {
    audioBook,
    cardGame,
    extraPgCost,
    imageView,
    setImageView,
    setCopiesCounter,
    copiesCounter,
    finalAmount
  } = useCopies();
  const [constprice, setConstPrice] = useState(extraPgCost || 30);

  const [selectedImages, setselectedImages] = useState(
    localStorage.getItem("image")
  );
  const totalPages = localStorage.getItem("totalPages");
   

  return (
    <div className={`${dynamicClass} Shipping-box-2`}>
      <div className="My-Book-Shippingbook">
        <div className="Shippingbook-part-1">
          <div className="Shippingbook-box">
            <div className="Shippingbook-box-img">
              <img src={selectedImages} alt="" />
            </div>
            <div className="Shippingbook-box-tital">
              <h2>Mijn bestelling</h2>
              <p>Boek Aantal: {copiesCounter}</p>
              {audioBook > 0 && <p>Luisterboek: €{audioBook}.00,-</p>}
              {cardGame > 0 && <p>Kaartspel: €{cardGame}.00,-</p>}
            </div>
          </div>
          {totalPages > 160 && <h2>€{constprice}.00,-</h2>}
        </div>

        <div className="Shippingbook-part-2">
          <span>
            <h2>Subtotaal</h2> <h2>€{finalAmount}.00,-</h2>
          </span>
          <span>
            <h2>Verzending</h2> <h2 style={{width:"50px"}}>Gratis</h2>
          </span>
        </div>

        <div className="Shippingbook-part-2">
          <span>
            <h2>Totaal</h2> <h2>€{finalAmount}.00,-</h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Shippingbook;
