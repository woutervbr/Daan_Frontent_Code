//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
  setGiveAnswer,
} from "../Redux/Features/QuestionsSlice";
import {
  addQuestionsToChapter,
  getChapter,
  getChapterById,
  getChapterH,
  getUserChapter,
  getUserChapterbyid,
} from "../Redux/Features/UserSlice";
import { Button, Modal } from "react-bootstrap";
import book from "../assets/book.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Header from "./Header";
import Lodersvg from "./hComponents/Lodersvg";
import Lottie from "lottie-react";
import bla from "../assets/Animation1739376208261.json";
import LottiAnimation from "./LottiAnimation";
import AddQuestionModal from "./hComponents/AddModal";
import { showErrorToast, showSuccessToast } from "./Toaster/Toaster";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { ReSubs } from "../context/ReSubsContext";
import RenewModal from "./RenewModal/RenewModal";

const Chapters = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chaptersdata, setChaptersdata] = useState([]);
  const [chapterId, setchapterId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [modalView, setModalView] = useState("initial"); // 'initial' or 'addQuestion'
  const [newQuestionText, setNewQuestionText] = useState("");
  const [currentChapter, setCurrentChapter] = useState(null);
  const [chapterName, setChapterName] = useState("");
  const { isActive, setOpenToBlock } = ReSubs();
  const [open, setOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = currentUser?.inviteBy
    ? currentUser?.inviteBy
    : currentUser?._id;
  const [deleteData, setDeleteData] = useState({
    questionId: "",
    userId: myCurrId,
  });

  const [questionText, setQuestionText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
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

  const toggleExpand = (index) => {
    const isClosing = activeIndex === index;
    setActiveIndex(isClosing ? null : index);
  };

  const handelCancle = () => {
    setOpen(false);
  };
  const handeleOpen = () => {
    setOpen(true);
  };

  const handleSubmitViewQuestionNo = async (question, chapter) => {
    await localStorage.removeItem("chapters");
    await localStorage.setItem("chapters", JSON.stringify(chapter));
    navigate(`/chat-module/${question?._id}`, {
      state: {
        chapterId: chapter?._id,
        questionText: question?.question,
        activeIndex: activeIndex,
        chapterData2: chapter,
      },
    });
  };
  const handleQuestionSubmit = async () => {
    if (!questionText.trim()) {
      showErrorToast("Please enter a question!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/add-question-user`, {
        userId,
        chapterId: currentChapter?._id,
        question: questionText,
      });
      if (response.status === 200) {
        showSuccessToast(response?.data?.message);
        setOpen(false);
        setQuestionText("");
        handleSubmit(); // Refresh the chapters data
      } else {
        throw new Error("Failed to add question");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("An error occurred while adding the question.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await dispatch(getChapterH(userId));
      const filterOutStamboom = result?.payload?.chapters.filter(
        (doc) => doc.chapterTitle !== "Stamboom"
      );
      setChaptersdata(filterOutStamboom);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handledeleteQuestion = async (questionId, chapterId) => {
    if (!isActive) {
      setOpenToBlock(true);
      return;
    }
    setDeleteData((prev) => ({ ...prev, questionId, chapterId }));
    setShow(true);
  };

  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        {/* {blockModal && (
          <RenewModal
            setShow={setBlockModal}
            show={blockModal}
            setIsAddCopies={false}
            isAddCopies={false}
            forBlock={true}
            title="Uw Abonnement Is Verlopen"
            descp="Wij delen u beleefd mede dat uw huidige abonnement is afgelopen. Indien u gebruik wenst te blijven maken van onze diensten zonder onderbreking, verzoeken wij u vriendelijk een nieuw abonnement af te sluiten."
          />
        )} */}
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
                <h5 onClick={() => navigate("/dashboard")}>
                  een voorproefje van mijn boek
                </h5>
                <h5
                  className="active"
                  onClick={() => navigate(`/chapter/${myCurrId}`)}
                  style={{ color: "#000" }}
                >
                  Hoofdstukken
                </h5>
                <h5 onClick={() => navigate("/allQuestions")}>Alle vragen</h5>
                <h5 onClick={() => navigate("/Overjou")}>Mijn familie</h5>
                {/* <h5 onClick={() => navigate(`/chapterai/${currentUser?._id}`)}>
                  With Ai Questions
                </h5> */}
              </div>
            </div>
          </div>

          <div className="   add-box-volgende">
            <h2>De volgende vragen</h2>
            <p>
              Hier ziet u de vragen die binnenkort aan bod komen. U kunt ze
              alvast beantwoorden, verwijderen of zelf vragen toevoegen.
            </p>
          </div>

          <div className="chapters-div-ar">
            {/* <ToastContainer position="top-center" autoClose={1000} /> */}

            {loading ? (
              <div className="loader">
                <Lodersvg />
              </div>
            ) : chaptersdata && chaptersdata.length > 0 ? (
              chaptersdata.map((chapter, index) => {
                const isEnabled = true;

                return (
                  <div
                    key={index}
                    className={`chapter-div-ar-more ${
                      activeIndex === index ? "expanded" : ""
                    }`}
                  >
                    <div
                      className={
                        isEnabled ? "chapter-div-ar" : "chapter-div-ar-disabled"
                      }
                      onClick={() => toggleExpand(index)}
                    >
                      <h2>{chapter.chapterTitle}</h2>
                      <div className="main-box-list">
                        {chapter.chapterTitle !== "Stamboom" && (
                          <div className="para-btn-box2">
                            <button
                              onClick={() => {
                                setCurrentChapter(chapter);
                                setChapterName(chapter.chapterTitle);
                                handeleOpen();
                              }}
                            >
                              Voeg een vraag toe
                            </button>
                          </div>
                        )}
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
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                                fill="#808080"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                                fill="#808080"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {activeIndex === index && (
                      <div
                        className={
                          isEnabled
                            ? "chapter-content"
                            : "chapter-content-disabled"
                        }
                      >
                        {chapter?.questions?.map((question, questionIndex) => {
                          return (
                            <div key={questionIndex} className="question-item">
                              <div className="main-para-box">
                                <span>Vraag {questionIndex + 1}</span>{" "}
                                <p> {question?.question} </p>
                              </div>
                              <div
                                className={`para-btn-box ${
                                  question?.answered ? "answer-comp" : ""
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    handleSubmitViewQuestionNo(
                                      question,
                                      chapter
                                    )
                                  }
                                >
                                  {question?.answered
                                    ? "Beantwoord"
                                    : "Antwoord"}
                                </button>
                                <button
                                  style={{ backgroundColor: "#F7B7A3" }}
                                  onClick={() =>
                                    handledeleteQuestion(
                                      question?._id,
                                      chapter?._id
                                    )
                                  }
                                >
                                  Verwijder
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
              <LottiAnimation image={bla} />
            )}
          </div>
        </div>
      </section>
      {show && (
        <ConfirmModal
          setOpenModal={setShow}
          openModal={show}
          deleteData={deleteData}
          handleSubmit={handleSubmit}
        />
      )}
      <AddQuestionModal
        open={open}
        handelCancle={handelCancle}
        handleQuestionSubmit={handleQuestionSubmit}
        questionText={questionText}
        setQuestionText={setQuestionText}
        chapterId={currentChapter}
        chapterName={chapterName}
      />
    </>
  );
};

export default Chapters;
