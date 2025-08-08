import React, { useEffect, useState } from "react";
import Informationbook from "../../assets/Information.png";
import Shippingbook from "./Shippingbook";
import Storyimg from "../../assets/new-img/pic17new.jpg";

import {
  decrementcounter,
  increment,
  incrementcounter,
  updateCounterAndPrice,
  incrementstep,
  decrementstep,
  setUserDetails,
  setPrice,
  incrementPrice,
  setStep,
} from "../../Redux/Features/QuestionsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AddtoCart,
  getCartElement,
  login,
} from "../../Redux/Features/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import ArrowRightIcon from "../../svgsIcons/ArrowRightIcon copy";
import ArrowLeftIcon from "../../svgsIcons/ArrowLeftIcon";
import { baseUrl } from "../../baseUrl";
import Game from "../../assets/Game.png";
import Audio from "../../assets/Audio.png";
import * as yup from "yup";
import { useForm, useFieldArray, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import PrevOrder from "./PrevOrder";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../Toaster/Toaster";

import { copies_data, getCopyAmount } from "../../utils/CopiesArr";
import { useCopies } from "../../context/CopiesContext";

const userSchema = yup.object().shape({
  userDetails: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      address: yup.string().required("Address is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      zipcode: yup.string().required("Zip code is required"),
    })
  ),
});

const Shipping = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      // userDetails: [
      //   {
      //     firstName: "",
      //     email: "",
      //     address: "",
      //     country: "",
      //     city: "",
      //     mybook: "",
      //     zipcode: "",
      //   },
      // ],
      userDetails: [], // 👈 empty by default
    },
  });

  // Watch the first address field
  const firstAddress = watch("userDetails.0.address");
  const allAddresses = watch("userDetails");

  // Sync addresses when first address changes
  useEffect(() => {
    if (firstAddress) {
      const fields = getValues("userDetails");
      fields.forEach((field, index) => {
        if (index !== 0 && !allAddresses[index]?.addressModified) {
          setValue(`userDetails.${index}.address`, firstAddress);
        }
      });
    }
  }, [firstAddress, setValue, getValues, allAddresses]);

  const currentStep = useSelector((state) => state.questionCounter.activeStep);
  const [selectedImages, setSelectedImages] = useState(
    localStorage.getItem("image")
  );
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const [bookData, setBookData] = useState(() => {
    const stored = localStorage.getItem("groupedData");
    return stored ? JSON.parse(stored) : null;
  });
  const { counter, price } = useSelector((state) => state.questionCounter);
  const [cartData, setCartData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [prevOrder, setPrevOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const audioBookPrice = 25.0;
  const playGamePrice = 30.0;
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const isFirstPayFree = Boolean(userDetails?.isFirstPayFree);
  const iswithSubscription = Boolean(userDetails?.withSubscription);

  const baseCopies = Number(userDetails?.numberOfCopies)   || 0; // just to be safe

  const totalPages = parseInt(localStorage.getItem("totalPages"));
  const [extraPrice, setExtraPrice] = useState(0);
  const isTotalPageCount = totalPages > 160;

  const {
    setAudioBook,
    setCardGame,

    setAbleToPay,
    audioBook,
    cardGame,
    setExtraPgCost,
    extraPgCost,
    setImageView,
    setCopiesCounter,
    copiesCounter,
    bookCounter,
    setBookCounter,
    finalAmount,
    isAbleToPay,
    setInitialAmount,
  } = useCopies();


  const userId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;

  // Main user details field array
  const {
    fields: userFields,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control,
    name: "userDetails",
  });

  const handleSelection = (item, itemPrice) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      let updatedCardGame = cardGame;
      let updatedAudioBook = audioBook;

      if (updatedItems[item]) {
        // ❌ Uncheck: remove item
        delete updatedItems[item];

        if (item === "PlayGame") {
          updatedCardGame = 0;

          if (!updatedItems["AudioBook"]) {
            setImageView(null);
          }
        }
        if (item === "AudioBook") {
          updatedAudioBook = 0;
          if (!updatedItems["PlayGame"]) {
            setImageView(null);
          }
        }
      } else {
        // ✅ Check: add item
        updatedItems[item] = itemPrice;

        if (item === "PlayGame") {
          updatedCardGame = itemPrice;
          if (isTotalPageCount) {
            setImageView("AudioBook");
          } else {
            setImageView("gameImage");
          }
        }
        if (item === "AudioBook") {
          updatedAudioBook = itemPrice;

          setImageView("AudioBook");
        }
      }

      // Update state
      setCardGame(updatedCardGame);
      setAudioBook(updatedAudioBook);

      // Calculate total price
      const basePricePerBook = parseInt(totalPages) > 80 ? 120 : 90;
      const newPrice =
        counter * basePricePerBook +
        Object.values(updatedItems).reduce((sum, val) => sum + val, 0);

      dispatch(updateCounterAndPrice({ counter, price: newPrice }));

      return updatedItems;
    });
  };

  useEffect(() => {

    if (bookCounter > 0) {

      setAbleToPay(true);
      return;
    }
    if (!isFirstPayFree && !iswithSubscription) {
      
      setAbleToPay(true);
      return;
    }

    if (isTotalPageCount || cardGame > 0 || audioBook > 0) {
      setAbleToPay(true);

    } else {

      setAbleToPay(false);
    }

    if (isTotalPageCount) {
      setExtraPgCost(30);
    }
  }, [bookCounter, cardGame, audioBook, isTotalPageCount]);


  const handleAddressChange = (index, value) => {
    // Mark the field as modified if it's not the first address
    if (index !== 0) {
      setValue(`userDetails.${index}.addressModified`, true);
    }
    setValue(`userDetails.${index}.address`, value);
  };

  const getCart = async () => {
    const result = await dispatch(getCartElement(userId));

    if (result.payload && result.payload.cart) {
      setCartData(result.payload.cart);
      const newCounter = result.payload.cart.counter;
      const basePricePerBook = parseInt(totalPages) > 80 ? 120 : 90;
      let newPrice = newCounter * basePricePerBook;

      // Add prices for selected items (AudioBook, PlayGame)
      if (selectedItems["AudioBook"]) newPrice += audioBookPrice;
      if (selectedItems["PlayGame"]) newPrice += playGamePrice;

      dispatch(updateCounterAndPrice({ counter: newCounter, price: newPrice }));
    }
  };

  const getPrevOrder = async () => {
    if (!userId) return;
    try {
      const response = await axios.post(`${baseUrl}/prev-order/${userId}`);
      if (response.data?.findLatestOrd) {
        setPrevOrder(response.data?.findCart);
      } else {
        setPrevOrder({});
      }
    } catch (error) {
      console.error("Failed to fetch previous order:", error);
      return null;
    }
  };

  useEffect(() => {
    getPrevOrder();
    getCart();
    // const basePricePerBook = parseInt(totalPages) > 80 ? 120 : 90;
    // dispatch(setPrice(basePricePerBook));
  }, []);

  const hanldeSend = async () => {
    try {
      if (!cartData) {
        showErrorToast("Cart data is missing. Please fill out the form first.");

        return;
      }

      const payloads = {
        userId,
        formData: cartData.formData,
        counter,
        price,
        book: bookData,
        cover: selectedImages,
      };
      const result = await dispatch(AddtoCart(payloads)).unwrap();

      showSuccessToast("Toegevoegd, ga verder naar afrekenen.");

      setTimeout(() => {
        getCart();
      }, 1000);
    } catch (error) {
      console.error("Cart update failed:", error);
      showErrorToast("Failed to update cart");
    }
  };

  const decrementcount = () => {
    dispatch(decrementcounter());
    removeUser(userFields.length - 1);
  };

  useEffect(() => {
    // Clear all existing fields
    removeUser();

    const copies = userDetails?.numberOfCopies;
    const totalToAppend = 1; // Always at least 1

    for (let i = 0; i < totalToAppend; i++) {
      appendUser({
        firstName: "",
        email: "",
        address: "",
        country: "",
        city: "",
        mybook: "",
        zipcode: "",
        addressModified: false,
      });
    }
  }, [userDetails?.numberOfCopies]);

  const incrementcount = () => {
    dispatch(incrementcounter());
    // appendUser({
    //   firstName: "",
    //   email: "",
    //   address: "",
    //   country: "",
    //   city: "",
    //   mybook: "",
    //   zipcode: "",
    //   addressModified: false, // Track if this address was manually modified
    // });
  };

  const onSubmit = async (data) => {
    try {
      // Remove the addressModified flags before submitting
      const cleanData = {
        ...data,
        userDetails: data.userDetails.map(
          ({ addressModified, ...rest }) => rest
        ),
      };
      const copiesRates = getCopyAmount(userDetails?.numberOfCopies);
      const finalCopyRate = copiesRates?.amount || 0;
      const userId = localStorage.getItem("userId");

      const payloads = {
        userId,
        formData: cleanData?.userDetails,
        counter: copiesCounter,
        price: finalAmount,
        book: bookData,
        cover: selectedImages,
      };
      const result = await dispatch(AddtoCart(payloads)).unwrap();

      if (result.cart._id) {
        localStorage.setItem("cartId", result.cart._id);
       dispatch(setStep(6));

        showSuccessToast("Toegevoegd, ga verder naar afrekenen.");

        setTimeout(() => {
          getCart();
        }, 1000);
      } else {
        showErrorToast("Failed to update cart");
      }
    } catch (error) {
      console.error("Cart update failed:", error);
      showErrorToast("Failed to update cart");
    }
  };

  const handleCancel = async (id) => {
    setLoading(true);
    const response = await axios.post(`${baseUrl}/cancel-order/${id}`);

    if (response) {
      if (response.data.cancelled) {
        getPrevOrder();
        setLoading(false);
        showSuccessToast("Successfully Order Cancelled");
      } else {
        setLoading(false);
        showErrorToast("Something went wrong");
      }
    } else {
      setLoading(false);
      showErrorToast("Something went wrong");
    }
  };

  const handleincrementcount = () => {
    setBookCounter((prev) => {
      const newCount = prev + 1;
      const totalCopies = baseCopies + newCount;

      const copiesRates = getCopyAmount(newCount); // how many *extra* copies
      setExtraPrice(copiesRates?.amount || 0);
      setCopiesCounter(totalCopies); // UI counter

      return newCount;
    });
  };

  const handleDecrementcount = () => {
    setBookCounter((prev) => {
      if (prev > 0) {
        const newCount = prev - 1;
        const totalCopies = baseCopies + newCount;

        const copiesRates = getCopyAmount(newCount);
        setExtraPrice(copiesRates?.amount || 0);
        setCopiesCounter(totalCopies); // UI counter

        return newCount;
      }
      return prev; // don't go below base
    });
  };
  useEffect(()=>{
    if(isAbleToPay && !isFirstPayFree && !iswithSubscription){
      setInitialAmount(89)
    };
  },[isAbleToPay])

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="navigation--site">
        <button
          className="animated-button"
          onClick={() => dispatch(decrementstep())}
          disabled={activeStep === 0}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Terug naar Laatste controle</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(incrementstep(5))}
          disabled={!cartData || cartData <= 0}
          style={{
            backgroundColor: !cartData || cartData <= 0 ? "#9e9e9e" : "",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Ga naar Afrekenen</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>

      <div className="Shipping-box">
        <div className="container-ar">
          <div className="main-Shipping">
            <div className="Shipping-box-1">
              <h2>Verzendinformatie</h2>
              <div className="Information-box">
                <div className="Information-Book-box">
                  <div className="Information-Book-img">
                    <img src={selectedImages} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Extra boeken bestellen?</h2>

                    <p>
                    Dat kan! U krijgt 33% korting op elk extra exemplaar – nu €60 i.p.v. €89 per stuk. Ideaal voor familieleden en vrienden.
                    </p>
                  </div>
                </div>

                <div className="Information-Book-no-box">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="6"
                      viewBox="0 0 26 6"
                      fill="none"
                      onClick={handleDecrementcount}
                    >
                      <path
                        d="M22.9413 0H16.0952H9.90476H3.05871C1.37676 0 0 1.3692 0 3C0 4.6308 1.37676 6 3.05871 6H9.90476H16.0952H22.9413C24.6232 6 26 4.6308 26 3C26 1.3692 24.6232 0 22.9413 0Z"
                        fill="black"
                      />
                    </svg>

                    <p>{bookCounter}</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      onClick={handleincrementcount}
                    >
                      <g clipPath="url(#clip0_4184_2992)">
                        <path
                          d="M20.9785 9.47852H13.5215V2.02148C13.5215 0.905041 12.6164 0 11.5 0C10.3836 0 9.47852 0.905041 9.47852 2.02148V9.47852H2.02148C0.905041 9.47852 0 10.3836 0 11.5C0 12.6164 0.905041 13.5215 2.02148 13.5215H9.47852V20.9785C9.47852 22.095 10.3836 23 11.5 23C12.6164 23 13.5215 22.095 13.5215 20.9785V13.5215H20.9785C22.095 13.5215 23 12.6164 23 11.5C23 10.3836 22.095 9.47852 20.9785 9.47852Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4184_2992">
                          <rect width="23" height="23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  {/* <p>€{price}.00</p> */}
                  <p>€{extraPrice}.00,-</p>
                </div>
              </div>

              <div className="Information-box">
                <div className="Information-Book-box">
                  <div
                    style={{ width: "50%" }}
                    className="Information-Book-img"
                  >
                    <img src={selectedImages} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Luisterboek</h2>
                    <p>
                      Vindt u het mooi om verhalen ook te horen? Voeg dan het
                      luisterboek toe - professioneel ingesproken, automatisch
                      geleverd per e-mail.  
                    </p>
                  </div>
                </div>

                <div className="Information-Book-no-box">
                  <input
                    type="checkbox"
                    checked={!!selectedItems["AudioBook"]}
                    onChange={() =>
                      handleSelection("AudioBook", audioBookPrice)
                    }
                    className={selectedItems["AudioBook"] ? "checked-box" : ""}
                  />
                  <p>€{audioBookPrice},-</p>
                </div>
              </div>

              <div className="Information-box">
                <div className="Information-Book-box">
                  <div
                    style={{ width: "46%" }}
                    className="Information-Book-img"
                  >
                    <img src={Storyimg} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Kaartspel ‘Familiegesprekken’</h2>
                    <p>
                      Een verbindend kaartspel vol mooie en speelse vragen.
                      Perfect om samen met (klein)kinderen herinneringen op te
                      halen.  
                    </p>
                  </div>
                </div>
                <div className="Information-Book-no-box">
                  <input
                    type="checkbox"
                    checked={!!selectedItems["PlayGame"]}
                    onChange={(e) => handleSelection("PlayGame", playGamePrice)}
                    className={selectedItems["PlayGame"] ? "checked-box" : ""}
                  />
                  <p>€{playGamePrice},-</p>
                </div>
              </div>

              <h2>Verzendinformatie</h2>

              <div className="Information-from-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    style={{ width: "100%" }}
                    className="Information-from-box"
                  >
                    {userFields.map((field, userIndex) => (
                      <div key={field.id} className="Information-from-box">
                        <div className="Information-group">
                          <label>Naam</label>
                          <input
                            type="text"
                            placeholder="Naam"
                            {...register(`userDetails.${userIndex}.firstName`)}
                          />
                          <p style={{ color: "red" }}>
                            {
                              errors?.userDetails?.[userIndex]?.firstName
                                ?.message
                            }
                          </p>
                        </div>

                        <div className="Information-group">
                          <label>E-mailadres</label>
                          <input
                            type="email"
                            placeholder="E-mailaddres"
                            {...register(`userDetails.${userIndex}.email`)}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.userDetails?.[userIndex]?.email?.message}
                          </p>
                        </div>

                        <div className="Information-group">
                          <label>Adres </label>
                          <input
                            type="text"
                            placeholder="Adres"
                            {...register(`userDetails.${userIndex}.address`)}
                            onChange={(e) =>
                              handleAddressChange(userIndex, e.target.value)
                            }
                          />
                          <p style={{ color: "red" }}>
                            {errors?.userDetails?.[userIndex]?.address?.message}
                          </p>
                        </div>

                        <div className="Information-group">
                          <label>Land</label>
                          <input
                            type="text"
                            placeholder="Land"
                            {...register(`userDetails.${userIndex}.country`)}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.userDetails?.[userIndex]?.country?.message}
                          </p>
                        </div>

                        <div className="Information-group">
                          <label>Stad</label>
                          <input
                            type="text"
                            placeholder="Stad"
                            {...register(`userDetails.${userIndex}.city`)}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.userDetails?.[userIndex]?.city?.message}
                          </p>
                        </div>

                        <div className="Information-group">
                          <label>Postcode</label>
                          <input
                            type="text"
                            placeholder="Postcode"
                            {...register(`userDetails.${userIndex}.zipcode`)}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.userDetails?.[userIndex]?.zipcode?.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="btn-box-Confirm">
                    <button type="submit">Bevestig mijn gegevens</button>
                  </div>
                </form>
              </div>
            </div>

            <Shippingbook
              prevData={prevOrder}
              handleCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
