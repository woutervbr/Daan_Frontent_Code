import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";
import "../../src/PreviewBook.css"; // Add a CSS file for styling
import { textToSpeech } from "../utils";
import Lodersvg from "./hComponents/Lodersvg";
import { useDispatch, useSelector } from "react-redux";
import { incrementstep, decrementstep } from "../Redux/Features/QuestionsSlice";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json"; // Play icon
import LottiAnimation from "./LottiAnimation";
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import PriviewBookModal from "./hComponents/PriviewBookModal";
import Scroll_Top from "./Scroll_Top";
import MyDocument from "./MyDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SendBookToPrint from "./SendBookToPrint";
import newtree from "../../src/assets/newtree.png";
import axios from "axios";
import question_line from "../assets/question_line.png";
import { ReSubs } from "../context/ReSubsContext";

const PreviewBook = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const playerRef1 = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [treeImageUrl, setTreeImageUrl] = useState(null);

  const [audioData, setAudioData] = useState(null);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null); // Track currently playing audio
  const audioRef = useRef(null); // Ref to store the current audio instance
  const topRef = useRef(null);
  const footerRef = useRef(null);
  const currUser = JSON.parse(localStorage.getItem("currentuser"));
  let pageCounter = 1; // start at 1 for the intro page
  const writtenBy = localStorage.getItem("author") || currUser?.name || "";
  const [isMobile, setIsMobile] = useState(false);
  const { setTreeImage, treeImage } = ReSubs();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);

  const handleTextToSpeech = async (text, messageId) => {
    try {
      // If an audio is already playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setCurrentPlayingAudio(null); // Reset the currently playing audio
      }

      setLoading2(true);
      const response = await fetch(
        `${baseUrl}/text_to_speach_convert?voiceid=knUWHodoipmgsRaryK5T`,
        {
          method: "POST",
          body: JSON.stringify({ text: text }), // Send dynamic text from input
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audioRef.current = audio; // Store the audio instance
        setCurrentPlayingAudio(messageId); // Set the currently playing audio ID
        audio.play();

        // Handle audio end event
        audio.onended = () => {
          setCurrentPlayingAudio(null); // Reset when audio ends
          audioRef.current = null;
        };

        setLoading2(false);
      } else {
        setLoading2(false);
        console.error("Error: ", data.error);
      }
    } catch (error) {
      setLoading2(false);
    }
  };

  
 
 
  const handlePausePlay = (messageId) => {
    if (audioRef.current) {
      if (currentPlayingAudio === messageId) {
        // If the clicked audio is already playing, pause it
        audioRef.current.pause();
        setCurrentPlayingAudio(null);
      } else {
        // If a different audio is clicked, stop the current one and play the new one
        audioRef.current.pause();
        audioRef.current = null;
        setCurrentPlayingAudio(null);
        handleTextToSpeech(
          groupedData[chapterId].questions[questionId].messages.find(
            (msg) => msg._id === messageId
          ).message,
          messageId
        );
      }
    }
  };

  useEffect(() => {
    if (audioData) {
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audio.play();
    }
  }, [audioData]);

  const currentUser = JSON.parse(localStorage.getItem("currentuser"));

  const bookRef = useRef(null);
  const myCurrId = currentUser?.inviteBy
    ? currentUser?.inviteBy
    : currentUser?._id;

  // Fetch book data from the API
  async function postData() {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: myCurrId,
        }),
      });
      const data = await response.json();
      setLoading(false);
      setTreeData(data?.treeData?.storyData);
      setBookData(data.data); // Assuming the API response has a `data` key
      const filterData = data.data?.filter((doc) => {
        const isStamboom = doc?.chapterId?.chapterTitle === "Stamboom";
        const hasMessages = doc?.messages?.length > 0;

        return isStamboom || hasMessages;
      });

      setGroupedData(groupDataByChaptersAndQuestions(filterData)); // Group the data
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  const handleMouseEnter = () => {
    playerRef1.current?.playFromBeginning();
  };

  useEffect(() => {
    postData();
  }, []);

  const groupDataByChaptersAndQuestions = (data) => {
    const groupedData = {};

    data.forEach((story) => {
      const chapterId = story?.chapterId?._id;
      const questionId = story?.questionId?._id;

      if (!groupedData[chapterId]) {
        groupedData[chapterId] = {
          chapterTitle: story?.chapterId?.chapterTitle,
          chapterImage: story?.chapterId?.chapterImage,
          questions: {},
        };
      }

      if (!groupedData[chapterId].questions[questionId]) {
        groupedData[chapterId].questions[questionId] = {
          questionText: story?.questionId?.question,
          messages: [],
        };
      }

      groupedData[chapterId]?.questions[questionId]?.messages?.push(
        ...story.messages
      );
    });

    return groupedData;
  };
  const handelNext = () => {
    setOpen(true);
    // dispatch(incrementstep())
  };
  const handleNextPage = () => {
    setOpen(false);
    dispatch(incrementstep(1));
  };
  const handelCancle = () => {
    setOpen(false);
    dispatch(incrementstep(2));
  };

  const captureAndUpload = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    const myCurrId = currentUser?.inviteBy ? currentUser?.inviteBy : currentUser?._id;
  
    try {
      const response = await axios.get(`${baseUrl}/tree-image/${myCurrId}`);
      const { alreadyUpload } = response.data;
      if (alreadyUpload && alreadyUpload.image) {
        setTreeImageUrl(alreadyUpload.image);
        setTreeImage(alreadyUpload.image);
        return alreadyUpload.image;
      }
    } catch (error) {
      console.error("Error checking existing image:", error.response?.data || error.message);
    }
  
    if (!footerRef.current) return;
  
    const element = footerRef.current;
  
    // Store original styles
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflow;
  
    try {
      // Expand the div to show all content
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "visible";
  
      // Wait for layout to reflow
      await new Promise((resolve) => setTimeout(resolve, 100));
  
      // Capture full expanded div
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
      });
  
      // Convert to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });
  
      const formData = new FormData();
      formData.append("file", blob,"familytree.png");
      formData.append("upload_preset", "twjpxlos");
  
      const cloudinaryResponse = await axios.post(`${baseUrl}/upload-file`, formData);
      const secureUrl = cloudinaryResponse.data.s3Url;
  
      await axios.post(`${baseUrl}/tree-image`, {
        userId: myCurrId,
        image: secureUrl,
      });
  
      setTreeImageUrl(secureUrl);
      setTreeImage(secureUrl);
      return secureUrl;
    } catch (error) {
      console.error("Error capturing or uploading image:", error.response?.data || error.message);
    } finally {
      // Restore original styles
      element.style.height = originalHeight;
      element.style.overflow = originalOverflow;
    }
  };
  

  useEffect(() => {
    // Ensure the DOM is rendered before capturing
    const timer = setTimeout(() => {
      (async () => {
        await captureAndUpload();
      })();
    }, 1000); // 1-second delay to allow DOM to render

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [treeData]);

  const [pages, setPages] = useState([]);
  const [chapterPages, setChapterPages] = useState({});
  const [chapterStartPages, setChapterStartPages] = useState({});

  const A5_HEIGHT_MM = isMobile ? 210 : 200;
  const PX_PER_MM = isMobile ? 2.5 : 3.1;
  const A5_HEIGHT_PX = A5_HEIGHT_MM * PX_PER_MM;
  const PADDING_PX = isMobile ? 50 : 80; // Equal padding on all sides
  const CONTENT_HEIGHT_PX = A5_HEIGHT_PX - PADDING_PX * 2;
  const PAGE_NUMBER_HEIGHT = 20;
  const MIN_BOTTOM_SPACE = PADDING_PX; // Minimum bottom padding
  const IMAGE_HEIGHT_PX = isMobile ? 250 : 200.2; // Fixed image height

  const calculateTextHeight = (text) => {
    const avgCharsPerLine = isMobile ? 30 : 80;
    const lineHeightPx = 18.5;
    const lines = Math.ceil(text.length / avgCharsPerLine);
    return lines * lineHeightPx;
  };

  const calculateImageHeight = (title = "") => {
    const titleHeight = title ? calculateTextHeight(title) + 20 : 0;
    return IMAGE_HEIGHT_PX + titleHeight;
  };

  const capitalizeFirst = (text) => {
    if (!text || text.length === 0) return text;
    const first = text.charAt(0).toUpperCase();
    const rest = text.slice(1);
    return first + rest;
  };

  const paginateContent = (chapter) => {
    const newPages = [];
    let currentPage = [];
    let currentHeight = 0;
    const showQuestionText = true;

    const findNaturalSplitPoint = (text, maxChars) => {
      const breakPoints = [
        { char: "\n\n", minPos: 0.8 },
        { char: ". ", minPos: 0.8 },
        { char: "! ", minPos: 0.8 },
        { char: "? ", minPos: 0.8 },
        { char: ", ", minPos: 0.8 },
        { char: "; ", minPos: 0.8 },
      ];
      for (const bp of breakPoints) {
        const splitPoint = text.lastIndexOf(bp.char, maxChars);
        if (splitPoint > maxChars * bp.minPos) {
          return splitPoint + bp.char.length;
        }
      }
      const lastSpace = text.lastIndexOf(" ", maxChars);
      return lastSpace > 0 ? lastSpace + 1 : maxChars;
    };

    const startNewPageIfNeeded = () => {
      if (currentPage.length > 0) {
        newPages.push([...currentPage]);
        currentPage = [];
        currentHeight = 0;
      }
    };

    const handleTextOverflow = (text, forceNewPage = false) => {
      if (forceNewPage && currentPage.length > 0) startNewPageIfNeeded();
      let remainingText = text;

      while (remainingText) {
        const remainingSpace =
          CONTENT_HEIGHT_PX - currentHeight - MIN_BOTTOM_SPACE;
        if (remainingSpace <= 0) {
          startNewPageIfNeeded();
          continue;
        }

        const textHeight = calculateTextHeight(remainingText);
        if (textHeight <= remainingSpace) {
          currentPage.push({
            type: "message",
            content: { message: remainingText },
          });
          currentHeight += textHeight;
          return "";
        }

        const charsPerPixel = remainingText.length / textHeight;
        const charsThatFit = Math.floor(remainingSpace * charsPerPixel);
        const splitPoint = findNaturalSplitPoint(remainingText, charsThatFit);
        const textToAdd = remainingText.substring(0, splitPoint).trim();

        if (textToAdd) {
          currentPage.push({
            type: "message",
            content: { message: textToAdd },
          });
          currentHeight += calculateTextHeight(textToAdd);
        }

        startNewPageIfNeeded();
        remainingText = remainingText.substring(splitPoint).trim();
      }

      return "";
    };

    Object.values(chapter.questions).forEach((question) => {
      let isFirstMessageInBlock = true;

      if (showQuestionText) {
        let remainingQuestion = question.questionText;
        while (remainingQuestion) {
          const questionHeight = calculateTextHeight(remainingQuestion);
          if (
            currentHeight + questionHeight >
            CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE
          ) {
            startNewPageIfNeeded();
          }

          const textToAdd =
            remainingQuestion.length <= 200
              ? remainingQuestion
              : remainingQuestion.substring(
                  0,
                  findNaturalSplitPoint(remainingQuestion, 200)
                );

          currentPage.push({ type: "questionText", content: textToAdd });
          currentHeight += calculateTextHeight(textToAdd);
          remainingQuestion = remainingQuestion
            .substring(textToAdd.length)
            .trim();

          if (remainingQuestion) startNewPageIfNeeded();
        }
      }

      question.messages.forEach((message) => {
        let remainingMessage = message.message || "";
        const images = [...(message.images || [])];
        const title = message.title || "";

        // Try to render message first
        if (remainingMessage) {
          const messageHeight = calculateTextHeight(remainingMessage);
          const imageHeight =
            images.length > 0
              ? calculateImageHeight(images.length === 1 ? title : "")
              : 0;

          if (
            currentHeight + messageHeight + imageHeight <=
            CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE
          ) {
            currentPage.push({
              type: "message",
              content: {
                message: isFirstMessageInBlock
                  ? capitalizeFirst(remainingMessage)
                  : remainingMessage,
              },
            });
            currentHeight += messageHeight;
            remainingMessage = "";
          } else {
            remainingMessage = handleTextOverflow(
              isFirstMessageInBlock
                ? capitalizeFirst(remainingMessage)
                : remainingMessage
            );
          }

          isFirstMessageInBlock = false;
        }

        // Render images one by one
        // Render images one by one
        images.forEach((image, imgIdx) => {
          const thisTitle = imgIdx === images.length - 1 ? title : "";
          const imageHeight = calculateImageHeight(thisTitle);

          // Not enough space? Start a new page
          if (
            currentHeight + imageHeight >
            CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE
          ) {
            startNewPageIfNeeded();
          }

          currentPage.push({
            type: "message",
            content: {
              images: [image],
              title: thisTitle,
            },
          });

          currentHeight += imageHeight;
        });

        if (remainingMessage) {
          handleTextOverflow(remainingMessage, true);
        }
      });
    });

    if (currentPage.length > 0) {
      const remainingSpace = CONTENT_HEIGHT_PX - currentHeight;
      if (remainingSpace > 0) {
        currentPage.push({
          type: "spacer",
          content: { height: remainingSpace },
        });
      }
      newPages.push(currentPage);
    }

    return newPages;
  };

  useEffect(() => {
    const pagesByChapter = {};

    Object.entries(groupedData).forEach(([chapterId, chapter]) => {
      pagesByChapter[chapterId] = paginateContent(chapter);
    });

    setChapterPages(pagesByChapter);
  }, [groupedData]);

  useEffect(() => {
    let pageCounterLocal = 1; // start page count from 1 (intro page)

    const startPages = {};

    // Intro page counted once
    pageCounterLocal++;

    // Calculate start pages for each chapter
    Object.keys(groupedData).forEach((chapterId) => {
      startPages[chapterId] = pageCounterLocal; // chapter title page number
      pageCounterLocal++; // chapter title page

      // Add chapter content pages count
      const pagesCount = chapterPages[chapterId]?.length || 0;
      pageCounterLocal += pagesCount;
    });

    setChapterStartPages(startPages);
    // setPageCounter(pageCounterLocal); // total pages (optional, if you want total)
  }, [groupedData, chapterPages]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <Lodersvg />
        </div>
      ) : (
        <div className="preview-book">
          <div className="navigation--site">
            <button
              className="animated-button"
              onClick={handelNext}
              disabled={!bookData || bookData.length <= 0}
            >
              <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Ga naar Verbeterboek</span>
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

          <div className="a5-container" ref={bookRef}>
            <div ref={topRef}></div>
            {/* <div className="a5-page2" ref={footerRef}>
              <h2 className="page-title">A New Beginning</h2>
              <h3 className="page-subtitle">
                "Every great story starts with a single page. This is yours."
              </h3>
              <p className="page-content">
                Welcome to a journey where imagination knows no limits, and
                every word holds a world of possibilities. As you turn these
                pages, prepare to embark on an adventure that will challenge
                your thoughts, stir your emotions, and leave an imprint on your
                soul.
              </p>
              <p className="page-content">
                Take a deep breath, open your mind, and let the story unfold…
              </p>
              <div className="page-footer">Chapter 1 • Your Life</div>
            </div> */}
            <div className="new-sec-tital">
              <h2>Originele versie</h2>
              <p>
                In deze versie ziet u al uw antwoorden, samen met de originele
                vragen. Alles staat overzichtelijk onder elkaar – precies zoals
                u het heeft ingevuld, inclusief foto’s en filmpjes via QR-code.
              </p>
            </div>
            <div className="a5-page2">
              <h2 className="page-title">Inhoudsopgave</h2>
              <ul>
                {Object.keys(groupedData).map((chapterId, index) => {
                  const keys = Object.keys(chapterStartPages);
                  const lastChapterId = keys[keys.length - 1];
                  const lastPage = chapterStartPages[lastChapterId];

                  localStorage.setItem("totalPages", lastPage + 2 || 1);
                  return (
                    <li key={index} className="list-box-flex">
                      <span>{groupedData[chapterId].chapterTitle}</span>
                      <span>{chapterStartPages[chapterId] || "?"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {Object.keys(groupedData).map((chapterId, index) => {
              const chapter = groupedData[chapterId];
              const isFirstChapter = index === 0;
              let lastWasQuestion = true;
              let isFirstMessage = true; // 👈 Move here so it persists across pages within chapter
              return (
                <div key={index}>
                  {/* Intro Page (only once) */}
                  {isFirstChapter && (
                    <div className="a5-page">
                      <h1 className="mock-heading">Mijn familie</h1>
                      <div className="tree" ref={footerRef}>
                        <ul>
                          <li className="no-top1">
                            <ul>
                              <li>
                                <div className="box">
                                  {treeData?.dadGrandfather}
                                </div>
                              </li>
                              <li>
                                <div className="box">
                                  {treeData?.dadGrandMother}
                                </div>
                              </li>
                              <li>
                                <div className="box">
                                  {treeData?.momGrandfather}
                                </div>
                              </li>
                              <li>
                                <div className="box">
                                  {treeData?.momGrandMother}
                                </div>
                              </li>
                            </ul>
                          </li>

                          <li className="no-top2 extra">
                            <ul>
                              {treeData?.grandfather && (
                                <li>
                                  <div className="box">
                                    {treeData?.grandfather}
                                  </div>
                                </li>
                              )}
                              {treeData?.grandMother && (
                                <li>
                                  <div className="box">
                                    {treeData?.grandMother}
                                  </div>
                                </li>
                              )}
                            </ul>
                          </li>

                          <li className="no-top2 extra2">
                            <ul>
                              <li>
                                <div className="box">{treeData?.father}</div>
                              </li>
                              <li>
                                <div className="box">{treeData?.mother}</div>
                              </li>
                              {treeData?.uncle1 && (
                                <li>
                                  <div className="box">{treeData?.uncle1}</div>
                                </li>
                              )}
                              {treeData?.aunt1 && (
                                <li>
                                  <div className="box">{treeData?.aunt1}</div>
                                </li>
                              )}
                              {treeData?.uncle2 && (
                                <li>
                                  <div className="box">{treeData?.uncle2}</div>
                                </li>
                              )}
                              {treeData?.aunt2 && (
                                <li>
                                  <div className="box">{treeData?.aunt2}</div>
                                </li>
                              )}
                            </ul>
                          </li>

                          <li className="no-top2">
                            <ul>
                              {treeData?.brothers.map((brother, index) => (
                                <li>
                                  <div
                                    key={index}
                                    className="box"
                                    style={{ margin: "0px 5px 5px 5px" }}
                                  >
                                    {brother}
                                  </div>
                                </li>
                              ))}
                              {treeData?.sisters.map((sister, index) => (
                                <li>
                                  <div
                                    key={index}
                                    className="box"
                                    style={{ margin: "0px 5px 5px 5px" }}
                                  >
                                    {sister}
                                  </div>
                                </li>
                              ))}
                              <li>
                                <div className="box">{treeData?.me}</div>
                              </li>
                              <li>
                                <div className="box">{treeData?.wife}</div>
                              </li>
                            </ul>
                          </li>

                          <li className="no-top2  howe-box">
                            <ul>
                              {treeData?.children.map((child, index) => (
                                <li>
                                  <div
                                    key={index}
                                    className="box"
                                    style={{ margin: "0px 5px 0px 0px" }}
                                  >
                                    {child}
                                  </div>
                                </li>
                              ))}

                              {treeData?.cousins.map((cousin, index) => (
                                <li>
                                  <div
                                    key={index}
                                    className="box"
                                    style={{ margin: "0px 5px 5px 5px" }}
                                  >
                                    {cousin}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <p className="page-name">
                        Pagina <span>{pageCounter}</span>
                      </p>
                      <span style={{ display: "none" }}>{pageCounter++}</span>
                    </div>
                  )}

                  {/* Chapter Title Page */}
                  <div className="a5-page">
                    <h1 className="mock-heading">{chapter.chapterTitle}</h1>
                    <img
                      className="chapter-image"
                      src={chapter?.chapterImage}
                      alt="chapter"
                    />
                    <p className="page-name">
                      Pagina <span>{pageCounter}</span>
                    </p>
                    <span style={{ display: "none" }}>{pageCounter++}</span>
                  </div>

                  {/* Chapter Content Pages */}
                  {(chapterPages[chapterId] || []).map(
                    (pageContent, pageIndex) => {
                      return (
                        <div
                          key={pageIndex}
                          className="a5-page"
                          style={{
                            width: "188mm",
                            height: "225mm",
                            padding: `${PADDING_PX}px`,
                            backgroundColor: "white",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            marginBottom: "20px",
                            pageBreakAfter: "always",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "20px",
                              width: isMobile ? "79%" : "86%",
                              textAlign: "right",
                              fontSize: "12px",
                            }}
                          >
                            Pagina{" "}
                            <span style={{ fontWeight: 700 }}>
                              {pageCounter}
                            </span>
                          </div>

                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {pageContent.map((item, idx) => {
                              if (item.type === "questionText") {
                                return (
                                  <p
                                    key={`${pageIndex}-${idx}`}
                                    style={{
                                      fontWeight: "bold",
                                      textAlign: "center",
                                      fontSize: "18px",
                                      margin: "0px 0px",
                                      fontStyle: "italic",
                                      fontFamily: "Libre Baskerville",
                                    }}
                                  >
                                    {item.content}
                                    <img
                                      style={{
                                        width: "60%",
                                        objectFit: "contain",
                                        height: "36px",
                                      }}
                                      src={question_line}
                                      alt="question-line"
                                    />
                                  </p>
                                );
                              }

                              if (item.type === "message") {
                                const text = item.content.message || "";
                                const paragraphs = text.split(/\n{2,}/); // Split on double line breaks

                                return (
                                  <div key={`${pageIndex}-${idx}`}>
                                    {paragraphs.map((para, paraIdx) => {
                                      // First paragraph of first message — apply big letter styling
                                      if (
                                        isFirstMessage &&
                                        paraIdx === 0 &&
                                        para.length > 0
                                      ) {
                                        const firstChar = para
                                          .charAt(0)
                                          .toUpperCase();
                                        const rest = para.slice(1);

                                        isFirstMessage = false; // ✅ Only once per chapter

                                        return (
                                          <p
                                            key={`${pageIndex}-${idx}-${paraIdx}`}
                                            style={{
                                              fontSize: isMobile ? "14px" : "16px",
                                              lineHeight: "1.5",
                                              hyphens: "auto",
                                              marginBottom: "16px",
                                              fontFamily: "Crimson Text",
                                              position: "relative",
                                            textAlign: "justify",

                                            }}
                                          >
                                            <span
                                              style={{
                                                fontSize: "35px",
                                                lineHeight: "1",
                                                marginRight: "4px",

                                                fontWeight: "bold",
                                              }}
                                            >
                                              {firstChar}
                                            </span>
                                            {rest}
                                          </p>
                                        );
                                      }

                                      // Normal paragraphs
                                      return (
                                        <p
                                          key={`${pageIndex}-${idx}-${paraIdx}`}
                                          style={{
                                            fontSize: isMobile ? "14px" : "16px",

                                            lineHeight: "1.5",
                                            hyphens: "auto",
                                            marginBottom: "16px",
                                            textAlign: "justify",
                                            fontFamily: "Crimson Text",
                                            position: "relative",
                                          }}
                                        >
                                          {para}
                                        </p>
                                      );
                                    })}

                                    {/* Render images below text */}
                                    {item.content.images?.map(
                                      (image, imgIdx) => (
                                        <div
                                          key={imgIdx}
                                          style={{
                                            margin: "16px 0",
                                            textAlign: "center",
                                            pageBreakInside: "avoid",
                                          }}
                                        >
                                          <img
                                            src={image}
                                            alt=""
                                            style={{
                                              maxWidth: "100%",
                                              height: `320.2px`,
                                              objectFit: "contain",
                                            }}
                                          />
                                          {item.content.title && (
                                            <p
                                              style={{
                                                textAlign: "center",
                                                fontStyle: "italic",
                                                marginTop: "8px",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {item.content.title}
                                            </p>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                );
                              }

                              return null; // fallback
                            })}
                          </div>

                          <span style={{ display: "none" }}>
                            {pageCounter++}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}

            <Scroll_Top
              topRef={topRef}
              footerRef={footerRef}
              dynamicClass={"fixedUpBtn"}
            />
          </div>

          {/* <SendBookToPrint /> */}
        </div>
      )}

      <PriviewBookModal
        open={open}
        handelCancle={handelCancle}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default PreviewBook;
