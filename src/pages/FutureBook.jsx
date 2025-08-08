import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import book from "../assets/book.png";
import questionbook from "../assets/homeImg.png";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questionoftheweek from "../Components/Questionoftheweek";
import AllQuestions from "../Components/AllQuestions";

import bookcoverimg from "../assets/bookcoverimg.png";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { showErrorToast } from "../Components/Toaster/Toaster";
import { useCopies } from "../context/CopiesContext";
import { ReSubs } from "../context/ReSubsContext";

const FutureBook = () => {
  const userData = JSON.parse(localStorage.getItem("currentuser"));

  const navigate = useNavigate();
  const {
    setInitialAmount,
    setNoOfCopiesState,
    setAudioBook,
    setCardGame,
    setBookCounter,
  } = useCopies();
  const { setIsActive, isActive } = ReSubs();
  const [states, setStates] = useState({
    storyCount: 0,
    totalQues: 0,
  });
  const location = useLocation();

  let currentuserData = null;

  try {
    const rawData = localStorage.getItem("currentuser");
    if (rawData && rawData !== "undefined") {
      currentuserData = JSON.parse(rawData);
    }
  } catch (err) {
    console.warn("Failed to parse currentuser:", err);
  }

  const [parsedData, setParsedData] = useState(currentuserData || null);
  const [loading, setLoading] = useState(true); // New loading state
  // Create an instance of URLSearchParams
  const queryParams = new URLSearchParams(location.search);

  // Get values
  const authenticate = queryParams.get("authenticate");
  const token = queryParams.get("bypass");
  const isinvite = queryParams.get("isinvite");
  const giveAnswer = useSelector((state) => state.questionCounter.giveAnswer);

  // Fallback for ID
  const myCurrId = parsedData?.inviteBy
    ? parsedData?.inviteBy
    : parsedData?._id;

  const previewBook = () => {
    // navigate('/ReviewBook')

    navigate("/ReviewBook"); // Navigate to review book
    if (giveAnswer) {
    } else {
      showErrorToast("Please give the answer to the questions.");
    }
  };

  useEffect(() => {
    setNoOfCopiesState(0);
    setAudioBook(0);
    setCardGame(0);
    setBookCounter(0);
    localStorage.removeItem("cartId");

    setInitialAmount(0);
  }, [userData]);

  useEffect(() => {
    const fetchMyDetail = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/user?token=${token}&lastLogin=${new Date().toISOString()}`
        );
        const user = res.data;

        await fetchData(user?._id);
        setIsActive(Boolean(user?.isActive));

        localStorage.setItem("currentuser", JSON.stringify(user));
        localStorage.setItem("userId", user?._id);
        localStorage.setItem("isInvited", isinvite || false);

        setParsedData(user); // Set to state
      } catch (err) {
        navigate("/");
        console.error("Error fetching user detail", err);
      }
    };
    const fetchData = async (id) => {
      const response = await axios
        .post(`${baseUrl}/dashboard`, {
          userId: authenticate && token ? id : myCurrId,
        })
        .then((res) => {
          setStates(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const readLocalStorageUser = () => {
      const raw = localStorage.getItem("currentuser");
      if (raw && raw !== "undefined" && raw !== "null") {
        try {
          const parsed = JSON.parse(raw);
          setParsedData(parsed);
        } catch (e) {
          console.error("Failed to parse local user", e);
        }
      }
    };

    if (localStorage.getItem("currentuser")) {
      readLocalStorageUser();
    } else if (authenticate && token) {
      localStorage.setItem("currentuser", JSON.stringify({}));
      fetchMyDetail();
    }

    if (token) fetchMyDetail();
    fetchData();
    setLoading(false);
  }, []);

  const [activeComponent, setActiveComponent] = useState("questionOfWeek");

  const handleHeadingClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
            <h3>Welkom bij uw toekomstige boek </h3>
            <h4>
              Je hebt {states.storyCount} verhalen geschreven van de{" "}
              {states.totalQues}.
            </h4>
            {/* <h4>Je hebt {states.storyCount} verhalen geschreven van de 52.</h4> */}

            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  className="active"
                  onClick={() => navigate("/dashboard")}
                  style={{
                    color: "#000",
                  }}
                >
                  een voorproefje van mijn boek
                </h5>
                <h5
                  onClick={() =>
                    navigate(!isActive ? "#" : `/chapter/${myCurrId}`)
                  }
                  style={
                    {
                      // color: activeComponent === "chapter" ? "#000" : "",
                    }
                  }
                >
                  Hoofdstukken
                </h5>

                <h5
                  onClick={() => navigate(!isActive ? "#" : "/allQuestions")}
                  style={
                    {
                      // color: activeComponent === "allQuestions" ? "#000" : "",
                    }
                  }
                >
                  Alle vragen
                </h5>
                <h5
                  onClick={() => navigate(!isActive ? "#" : "/Overjou")}
                  style={
                    {
                      // color: activeComponent === "allQuestions" ? "#000" : "",
                    }
                  }
                >
                  Mijn familie
                </h5>
                {/* <h5
                  onClick={() => navigate(`/chapterai/${parsedData?._id}`)}
                >
                  With Ai Questions
                </h5> */}
              </div>
              {activeComponent === "allQuestions" && (
                <div className="add-chapter-btn">Voeg nog een vraag toe</div>
              )}
            </div>
            {/* {activeComponent === "questionOfWeek" && <Questionoftheweek />}
            {activeComponent === "chapter" && <Chaptersfuture />}
    
            {activeComponent === "allQuestions" && <AllQuestions />} */}
          </div>
          <div className="   add-box-volgende">
            <h2>Zo werkt het</h2>
            <a
              href="/News?filter=tips&inspiration"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginBottom: "5px",
                textDecoration: "underline",
                cursor: "pointer",
                color:
                  "rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))",
              }}
            >
              Klik hier voor meer uitleg en voorbeeldvideo’s.
            </a>

            <p>
              Begin bij ‘Hoofdstukken’ met het maken van uw boek. Rechtsboven in
              beeld kunt u alles regelen: mensen uitnodigen, een cover kiezen,
              het boek bekijken, extra boeken bestellen en afronden.
            </p>
          </div>

          <div className="questionoftheweek-div-ar">
            <ToastContainer position="top-center" autoClose={3000} />

            <div className="inner-question-bok-ar">
              <div className="question-book-img-ar">
                <img src={questionbook} alt="" />
              </div>
              {states.storyCount == 0 ? (
                <h5>U heeft de vraag van de week nog niet beantwoord</h5>
              ) : (
                <h5>U heeft de vraag van de week beantwoord</h5>
              )}
              <h6>
                {/* Er staan nog {states.totalQues - states.storyCount} vragen open voordat uw boek volledig is.
U kunt een voorbeeld van uw boek bekijken via de knop hieronder. */}
                Benieuwd hoe uw boek er nu uitziet? Bekijk het via de knop
                hieronder.
              </h6>

              <button onClick={previewBook}>
                Bekijk een voorbeeld van mijn boek
              </button>
            </div>

            {/* <div className="inner-question-bok-ar">
              <div className="question-book-img-ar">
                <img src={questionbook} alt="" />
              </div>
              <h5>Book Title</h5>
              <h6>
                Author Name
              </h6>
              <div className="BOOK-theam-cover-box">
                <img src={bookcoverimg} alt="" />
              </div>
              <button>Preview my Book</button>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default FutureBook;
