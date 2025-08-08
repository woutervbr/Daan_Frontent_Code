import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import "../../src/PreviewBook.css"; // Add a CSS file for styling
import { textToSpeech } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { incrementstep, decrementstep } from "../Redux/Features/QuestionsSlice";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import Lodersvg from "../Components/hComponents/Lodersvg";
import ArrowLeftIcon from "../svgsIcons/ArrowLeftIcon";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json"; // Play icon
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import Scroll_Top from "../Components/Scroll_Top";
import MyDocument from "../Components/MyDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentEnhace from "../Components/MyDocumentEnhace";
import SendEnhanceBookToPrint from "../Components/SendEnhanceBookToPrint";
import newtree from "../../src/assets/newtree.png";
import A5Page from "../Components/A5Page";

import question_line from "../assets/question_line.png";

const MAX_PAGE_HEIGHT_PX = 793; // 210mm in px

const calculatePageRanges = (groupedData) => {
  let currentPage = 3; // Starting after the cover pages (2 pages) + Inhoudsopgave (1 page)
  const pageRanges = {};

  // Add Inhoudsopgave page
  pageRanges["toc"] = { start: 1, end: 1 };

  // Add initial pages (cover pages)
  pageRanges["cover"] = { start: 2, end: 2 };

  // Calculate for each chapter
  Object.keys(groupedData).forEach((chapterId) => {
    const chapter = groupedData[chapterId];
    const startPage = currentPage + 1; // +1 because we haven't added this chapter yet

    // Count pages for this chapter:
    // 1 for the chapter title page
    let chapterPages = 1;

    // Add pages for each question's messages
    Object.keys(chapter.questions).forEach((questionId) => {
      const question = chapter.questions[questionId];
      chapterPages += question.messages.length; // Each message is on its own page
    });

    pageRanges[chapterId] = {
      chapterTitle: chapter.chapterTitle,
      start: startPage,
      end: startPage + chapterPages - 1,
    };

    currentPage += chapterPages;
  });

  return pageRanges;
};

const calculateAllPages = (groupedData) => {
  let currentPage = 3; // After cover (1) and TOC (2)
  const chapterPageMap = {};

  Object.keys(groupedData).forEach((chapterId, index) => {
    const chapter = groupedData[chapterId];
    const isFirstChapter = index === 0;

    // For first chapter (Stamboom), we have an extra page
    const chapterStartPage = isFirstChapter ? 3 : currentPage;

    chapterPageMap[chapterId] = {
      title: chapter.chapterTitle,
      startPage: chapterStartPage,
      pages: [],
    };

    // Count pages for this chapter:
    // 1 for chapter title + image
    if (!isFirstChapter) {
      currentPage += 1;
    }

    // Add pages for each question's messages
    Object.keys(chapter.questions).forEach((questionId) => {
      chapterPageMap[chapterId].pages.push({
        type: "content",
        count: chapter.questions[questionId].messages.length,
      });
      currentPage += chapter.questions[questionId].messages.length;
    });
  });

  return chapterPageMap;
};

const EnhanceFinalizeBook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);

  const [chapterTitles, setChapterTitles] = useState({}); // Store chapter titles by ID
  const [loading2, setLoading2] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null); // Track currently playing audio
  const [groupedData, setGroupedData] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [chapterPages, setChapterPages] = useState({});
  const [chapterPageData, setChapterPageData] = useState({});
  const [chapterStartPages, setChapterStartPages] = useState({});

  const audioRef = useRef(null); // Ref to store the current audio instance
  const topRef = useRef(null);
  const footerRef = useRef(null);
  const currentStep = useSelector((state) => state.questionCounter.activeStep);
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = currentUser?.inviteBy
    ? currentUser?.inviteBy
    : currentUser?._id;

  const coverImage = localStorage.getItem("image");
  const writtenBy = localStorage.getItem("author");

  const selectedVoiceId = localStorage.getItem("selectedVoiceId");
  let pageCounter = 1; // outside JSX, right before return or inside the render
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);
  // Fetch book data from the API

  const blockRef = useRef(null);
  const [splitImage, setSplitImage] = useState(false);
  const [showImageInNextPageOnly, setShowImageInNextPageOnly] = useState(false);

  useEffect(() => {
    if (blockRef.current) {
      const height = blockRef.current.getBoundingClientRect().height;
      if (height > MAX_PAGE_HEIGHT_PX) {
        setSplitImage(true);
        setShowImageInNextPageOnly(true); // image should be in next page only
      }
    }
  }, []);

  const isValidCoverImage = coverImage && coverImage.trim() !== "";
  const finalImage = isValidCoverImage
    ? coverImage
    : "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png";

  useEffect(() => {
    if (!isValidCoverImage) {
      localStorage.setItem(
        "image",
        "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png"
      );
    }
  }, [isValidCoverImage]);

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

      if (!groupedData[chapterId]) {
        groupedData[chapterId] = { questions: {} };
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

  async function postData() {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-stories-enchaced`, {
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
      setBookData(data); // Assuming the API response has a `chapters` key
      setTreeData(data?.treeData?.storyData);
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
  const pageRanges = calculatePageRanges(groupedData);

  // Filter out non-chapter entries and sort chapters
  const chapters = Object.entries(pageRanges)
    ?.filter(([key]) => key !== "toc" && key !== "cover")
    ?.map(([chapterId, data]) => ({
      chapterId,
      ...data,
    }));
  // Fetch chapter titles and store them in state
  useEffect(() => {
    const fetchChapterTitles = async () => {
      const titles = {};
      // for (const story of bookData?.data || []) {
      //   if (!titles[story.chapterId]) {
      //     const title = await getChapterName(story.chapterId);
      //     titles[story.chapterId] = title;
      //   }
      // }
      setChapterTitles(titles);
    };

    if (bookData?.data) {
      fetchChapterTitles();
    }
  }, [bookData]);

  // const getChapterName = async (id) => {
  //   try {
  //     const response = await fetch(`${baseUrl}/get-stories-id/${id}`, {
  //       method: "GET",
  //     });
  //     const data = await response.json();
  //     return data?.data?.chapterTitle;
  //   } catch (error) {
  //     console.log(error);
  //     return "Unknown Chapter";
  //   }
  // };

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
        `${baseUrl}/text_to_speach_convert?voiceid=${selectedVoiceId}`,
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
      console.log(error);
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
          bookData.data
            .find((story) =>
              story.messages.find((msg) => msg._id === messageId)
            )
            .messages.find((msg) => msg._id === messageId).message,
          messageId
        );
      }
    }
  };

  useEffect(() => {
    postData();
  }, []);

  useEffect(() => {
    if (audioRef.current && currentPlayingAudio !== currentStep) {
      audioRef.current.pause();
      setCurrentPlayingAudio(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (groupedData && chapters) {
      localStorage.setItem("groupedData", JSON.stringify(groupedData));
      localStorage.setItem("chaptersPDF", JSON.stringify(chapters));
    }
  }, [groupedData, chapters]);

  const [pages, setPages] = useState([]);
     
   
  const A5_HEIGHT_MM = isMobile ? 210 : 200;
  const PX_PER_MM = isMobile ? 2.8 : 3.1;

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
          const showQuestionText = false;
      
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
        <div className="enhance-section">
          <div className="preview-book">
            <div className="navigation--site">
              <button
                className="animated-button"
                onClick={() => dispatch(decrementstep())}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Terug naar Bekijk verhalen</span>
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
                onClick={() => dispatch(incrementstep(2))}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Move to Laatste controle</span>
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
            <div className="a5-container" ref={topRef}>
              {/* <div className="a5-page2 extara-padding" ref={footerRef}> */}
                <img src={finalImage} className="cover-new-img" />
              {/* </div> */}
              <div className="a5-page2">
                <p className="new-contact">
                  Geschreven door <span>{writtenBy}</span>
                </p>

                <p className="page-name ">
                  Pagina <span>{pageCounter++}</span>
                </p>

                {/* <div className="page-footer">Chapter 1 • Your Life</div> */}
              </div>
              <div className="a5-page2">
                <h2 className="page-title">Inhoudsopgave</h2>
                <ul>
                  {Object.keys(groupedData).map((chapterId, index) => {
                    const keys = Object.keys(chapterStartPages);
                    const lastChapterId = keys[keys.length - 1];
                    const lastPage = chapterStartPages[lastChapterId];

                    return (
                      <li key={index} className="list-box-flex">
                        <span>{groupedData[chapterId].chapterTitle}</span>
                        <span>{chapterStartPages[chapterId] + 2 || "?"}</span>
                      </li>
                    );
                  })}
                </ul>

                <p className="page-name">
                  Pagina <span>{pageCounter++}</span> {/* TOC page usually 1 */}
                </p>
              </div>
              {Object.keys(groupedData).map((chapterId, index) => {
                const chapter = groupedData[chapterId];
                const pageInfo = chapterPageData[chapterId] || {};
                const isFirstChapter = index === 0;
                let isFirstMessage = true; // 👈 Move here so it persists across pages within chapter
                return (
                  <div key={index}>
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

                    <div key={index} className="a5-page">
                      <h1 className="mock-heading">{chapter.chapterTitle}</h1>

                      <img className="chapter-image" src={chapter?.chapterImage} />

                      <p className="page-name">
                        Pagina <span>{pageCounter}</span>
                      </p>
                      <span style={{ display: "none" }}>{pageCounter++}</span>
                    </div>

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
                                                        if (isFirstMessage && paraIdx === 0 && para.length > 0) {
                                                          const firstChar = para.charAt(0).toUpperCase();
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
                                                              width:isMobile ? "227px" : "auto",
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
                                                              fontFamily: "Crimson Text",
                                                              position: "relative",
                                                            textAlign: "justify",
                                                            width:isMobile ? "227px" : "auto",
                                                            }}
                                                          >
                                                            {para}
                                                          </p>
                                                        );
                                                      })}
                                                
                                                      {/* Render images below text */}
                                                      {item.content.images?.map((image, imgIdx) => (
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
                                                      ))}
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
          </div>
        </div>
      )}
    </>
  );
};

export default EnhanceFinalizeBook;
