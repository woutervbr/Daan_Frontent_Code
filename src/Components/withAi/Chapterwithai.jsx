//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
  setGiveAnswer,
} from "../../Redux/Features/QuestionsSlice";
import {
  addQuestionsToChapter,
  getChapter,
  getChapterById,
  getChapterH,
  getUserChapter,
  getUserChapterbyid,
} from "../../Redux/Features/UserSlice";
import { Button, Modal } from "react-bootstrap";
import book from "../../assets/book.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import Header from ".././Header";
import Lodersvg from ".././hComponents/Lodersvg";

const Chapterwithai = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chaptersdata, setChaptersdata] = useState([]);
  const [chapterId, setchapterId] = useState([]);
  const [loading, setLoading] = useState();
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = currentUser?.inviteBy ? currentUser?.inviteBy : currentUser?._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  useEffect(() => {
    handleSubmit();
    // handleGettUserChapter();
  }, []);

  const toggleExpand = (index) => {
    const isClosing = activeIndex === index;
    setActiveIndex(isClosing ? null : index);
  };

  const handleSubmitViewQuestionNo = async (question, chapter) => {
    await localStorage.removeItem("chapters")
    await localStorage.setItem("chapters", JSON.stringify(chapter))
    navigate(`/chat-moduleai/${question?._id}`, {
      state: {
        chatperId: chapter?._id,
        questionText: question,
        chapterData2: chapter,
      },
    });
  };

  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   const result = await dispatch(getChapterH(userId));

  //   setChaptersdata(result?.payload.chapters);
  // };

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true before making the API call

    try {
      const result = await dispatch(getChapterH(userId));

      setChaptersdata(result?.payload?.chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleGettUserChapter = async (e) => {
    const result = await dispatch(getChapterById(userDetails?._id));
    setchapterId(result?.payload?.chapters);
    // setChaptersdata(result?.payload.chapters);
  };

  const handleClose = () => setModalShow(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const [activeComponent, setActiveComponent] = useState("questionOfWeek");

  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
          <h3>Welkom bij uw toekomstige boek</h3>
            <h4>Je hebt X verhalen geschreven van de 52.</h4>
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
                  style={
                    {
                      // color: activeComponent === "allQuestions" ? "#000" : "",
                    }
                  }
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
          </div>

          <div className="chapters-div-ar">
            {/* <ToastContainer position="top-center" autoClose={1000} /> */}

            {loading ? (
                 <div className="loader"><Lodersvg/></div>
            ) : chaptersdata && chaptersdata.length > 0 ? (
              chaptersdata.map((chapter, index) => {

                const isEnabled = true;

                return (
                  <div
                    key={index}
                    className={`chapter-div-ar-more ${activeIndex === index ? "expanded" : ""
                      }`}
                  >
                    <div
                      className={isEnabled ? "chapter-div-ar" : "chapter-div-ar-disabled"}
                      onClick={() => toggleExpand(index)}
                    >
                      <h2>- {chapter?.chapterTitle}</h2>

                      <div className="main-box-list">
                        <button
                          className="Answer-drop"
                          onClick={() => toggleExpand(index)}
                        >
                          {activeIndex === index ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              transform="rotate(180)"
                            >
                              <g clipPath="url(#clip0_97_404)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                                  fill="#808080"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_97_404">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_97_404)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                                  fill="#808080"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_97_404">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {activeIndex === index && (
                      <div
                        className={
                          isEnabled ? "chapter-content" : "chapter-content-disabled"
                        }
                      >
                        {chapter?.questions?.map((question, questionIndex) => {
                          return (
                            <div key={questionIndex} className="question-item">
                              <div className="main-para-box">
                                <span>Question.{questionIndex + 1}</span>{" "}
                                <p> {question?.question} </p>
                              </div>
                              <div className="para-btn-box">
                                <button
                                  onClick={() =>
                                    handleSubmitViewQuestionNo(question, chapter)
                                  }
                                >
                                  Answer
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="error-message">Error: No chapters available!</p>
            )}
          
          </div>
        </div>
      </section>
    </>
  );
};

export default Chapterwithai;
