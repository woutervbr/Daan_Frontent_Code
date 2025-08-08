import React, { useEffect, useState } from "react";
import { getChapterH, getUserChapterbyid } from "../Redux/Features/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
} from "../Redux/Features/QuestionsSlice";
import Header from "./Header";
import book from "../assets/book.png";
import Lodersvg from "./hComponents/Lodersvg";

// Lottie-File-import// Lottie-File-import// Lottie-File-import
import { debounce } from "lodash";
import Lottie from "lottie-react";
import bla from "../assets/Animation1739376208261.json";
import LottiAnimation from "./LottiAnimation";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { ReSubs } from "../context/ReSubsContext";
const AllQuestions = () => {
  const { isActive,setOpenToBlock } = ReSubs();

  const chapters = [
    {
      num: "01",
    },
    {
      num: "02",
    },
    {
      num: "03",
    },
    {
      num: "04",
    },
    {
      num: "05",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;

  const [loading, setLoading] = useState();

  const [chaptersdata, setChaptersdata] = useState([]);
  const [states, setStates] = useState({
    storyCount: 0,
    totalQues: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .post(`${baseUrl}/dashboard`, {
          userId: myCurrId,
        })
        .then((res) => {
          setStates(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, []);

  // const handleSubmit = async (e) => {

  //   const user_id = localStorage.getItem("userId");

  //   const result = await dispatch(getUserChapter(user_id));

  //   setChaptersdata(result.payload.chapters?.staticquestions)
  // }

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("userId");
    setLoading(true);

    try {
      const result = await dispatch(getChapterH(myCurrId));

      if (result?.payload.chapters) {
        // Filter out chapter with title "Stamboom"
        const filteredChapters = result.payload.chapters.filter(
          (chapter) => chapter.chapterTitle !== "Stamboom"
        );

        setChaptersdata(filteredChapters); // Set the filtered chapters
      } else {
        console.error("No chapters foundssss:", result);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const setChapters = (chapters) => {
    dispatch(setChangeChapter(chapters));

    navigate("/chat");
  };
  const handleSubmitViewQuestionNo = async (question, chapter) => {
  
    const chapDto = JSON.parse(localStorage.getItem(chapters));
    if (chapDto) {
      localStorage.removeItem("chapters");
    }
    localStorage.setItem("chapters", JSON.stringify(chapter));

    const allQuestions = chaptersdata?.flatMap((ch) => ch.questions);
    const clickedIndex = allQuestions.findIndex((q) => q._id === question?._id);
    if (clickedIndex === -1) return [];
    const after = allQuestions.slice(clickedIndex + 1)?.map((q) => q._id);
    const before = allQuestions.slice(0, clickedIndex)?.map((q) => q._id);
    const clicked = allQuestions[clickedIndex]?._id;
    const result = [clicked, ...after, ...before];

    navigate(`/chat-module/${question?._id}`, {
      state: {
        chatperId: chapter?._id,
        questionText: question,
        chapterData2: chapter,
        questionIds: result,
        weekBase: true,
      },
    });
  };

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
              {states.totalQues}.{" "}
            </h4>
            {/* <h4>Je hebt {states.storyCount} verhalen geschreven van de {states.totalQues}.</h4> */}

            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  onClick={() => navigate("/dashboard")}
                
                >
                  een voorproefje van mijn boek
                </h5>
                <h5
                  onClick={() =>  navigate(!isActive ? "#" :`/chapter/${myCurrId}`)}
                  style={
                    {
                      // color: activeComponent === "chapter" ? "#000" : "",
                    }
                  }
                >
                  Hoofdstukken
                </h5>

                <h5
                  onClick={() => navigate(!isActive ? "#" :"/allQuestions")}
                  
                  className="active"
                  style={{
                    color: "#000",
                  }}
                >
                  Alle vragen
                </h5>
                <h5
                  onClick={() => navigate(!isActive ? "#" :"/Overjou")}
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
            <h2>Binnenkort aan de beurt</h2>
            <p>
Hier vind u alle levensvragen op één plek, netjes verdeeld per hoofdstuk. Kies waar u mee verder wilt.            </p>
          </div>

          <div className="chapters-div-ar">
            {loading ? (
              <div className="loader">
                <Lodersvg />
              </div>
            ) : chaptersdata && chaptersdata.length > 0 ? (
              chaptersdata?.map((chapter, i) => (
                <div key={i} className="mainchapter-box-long">
                  <h1 style={{ fontFamily: "Solway" }}>
                    {chapter?.chapterTitle?.split(": ")[0]}
                  </h1>

                  {chapter?.questions?.map((question, questionIndex) => (
                    <div className="chapter-div-ar ">
                      <h2 style={{ fontSize: "18px" }}>{question?.question}</h2>
                      <div className="chapter-btns-div-ar">
                        <button
                          onClick={() => {
                            handleSubmitViewQuestionNo(question, chapter);
                          }}
                        >
                          Beantwoord
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <LottiAnimation image={bla} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllQuestions;
