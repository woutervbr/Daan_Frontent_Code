import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import "../../src/PreviewBook.css"; // Add a CSS file for styling
import { textToSpeech } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementstep,
  decrementstep,
  setSelectedOption,
} from "../Redux/Features/QuestionsSlice";
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
import Simple_Story_Reader from "../Components/Simple_Story_Reader";
import newtree from "../../src/assets/newtree.png";
import question_line from "../assets/question_line.png";

const EnhanceBook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [OurStoryData, setOurStoryData] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const pageRefs = useRef([]);
  const flatMessagesRef = useRef([]);
  const [treeData, setTreeData] = useState([]);

  const [chapterTitles, setChapterTitles] = useState({}); // Store chapter titles by ID
  const [loading2, setLoading2] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null); // Track currently playing audio
  const audioRef = useRef(null); // Ref to store the current audio instance
  const topRef = useRef(null);
  const footerRef = useRef(null);
  const currentStep = useSelector((state) => state.questionCounter.activeStep);
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = currentUser?.inviteBy
    ? currentUser?.inviteBy
    : currentUser?._id;

  const selectedVoiceId = localStorage.getItem("selectedVoiceId");
  const [groupedData, setGroupedData] = useState({});
  let pageCounter = 1; // start at 1 for the intro page
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);
  // console.log({ selectedVoiceId });
  // Fetch book data from the API

  const groupDataByChaptersAndQuestions = (data) => {
    const groupedData = {};

    data?.forEach((story) => {
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
          questionText: story.questionId.question,
          messages: [],
        };
      }

      groupedData[chapterId].questions[questionId].messages.push(
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

      setGroupedData(groupDataByChaptersAndQuestions(data.data)); // Group the data
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  // Fetch chapter titles and store them in state
  useEffect(() => {
    const fetchChapterTitles = async () => {
      const titles = {};
      for (const story of bookData?.data || []) {
        if (!titles[story.chapterId]) {
          // const title = await getChapterName(story.chapterId);
          // titles[story.chapterId] = title;
        }
      }
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
    MyStoryData();
  }, []);

  useEffect(() => {
    if (audioRef.current && currentPlayingAudio !== currentStep) {
      audioRef.current.pause();
      setCurrentPlayingAudio(null);
    }
  }, [currentStep]);

  async function MyStoryData() {
    try {
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
      setOurStoryData(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  let globalMessageIndex = 0;

  useEffect(() => {
    if (
      !bookData ||
      !bookData.data ||
      !pageRefs.current.length ||
      !OurStoryData
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        const visibleEntry = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (visibleEntry) {
          const index = pageRefs.current.findIndex(
            (ref) => ref === visibleEntry.target
          );
          const currentVisibleStory = flatMessagesRef.current[index]; // { question, text, messageIndex }

          if (currentVisibleStory) {
            // Find a matching story in OurStoryData based on the question
            let matchingStory = null;
            let matchingMessage = null;

            for (const story of OurStoryData) {
              const chapterId = story?.chapterId?._id;
              const questionId = story?.questionId?._id;
              const storyQuestion = story?.questionId?.question;
              if (storyQuestion === currentVisibleStory.question) {
                // Use the messageIndex to select the corresponding message
                const messageIndex = currentVisibleStory.messageIndex;

                matchingMessage = story?.messages?.[messageIndex];
                if (matchingMessage) {
                  matchingStory = story;
                  break;
                }
              }
            }

            if (matchingStory && matchingMessage) {
              const newStory = {
                message: matchingMessage?.message, // Set to the original user-provided message
                text: currentVisibleStory.text, // Keep the AI-generated response as text
                originalQuestion: matchingStory?.questionId?.question, // Store the actual question
                questionId: matchingStory?.questionId?._id,
                chapterId: matchingStory?.chapterId?._id,
                images: matchingMessage?.images || [],
                videos: matchingMessage?.videos || [],
                originalStory: matchingStory,
                originalMessage: matchingMessage,
              };
              setCurrentStory(newStory);
            } else {
              // Fallback to currentVisibleStory if no match is found
              setCurrentStory({
                question: currentVisibleStory.text, // Use the AI-generated text as the question in the fallback
                text: currentVisibleStory.text,
                originalQuestion: currentVisibleStory.question,
                images: [],
                videos: [],
              });
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      pageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [bookData, OurStoryData]);

  const handleOptionSelect = (option) => {
    localStorage.setItem("storyPreference", option);
    dispatch(incrementstep(2));
    // Dispatch the selected option to Redux store
    dispatch(setSelectedOption(option)); // Redux action to update global state
  };
  let lastRenderedChapterId = null; // outside of map

  const [pages, setPages] = useState([]);
  const [chapterPages, setChapterPages] = useState({});
  const [chapterStartPages, setChapterStartPages] = useState({});

  const A5_HEIGHT_MM = isMobile ? 210 : 200;
  const PX_PER_MM = isMobile ? 2.8 : 3.1;

  const A5_HEIGHT_PX = A5_HEIGHT_MM * PX_PER_MM;
  const PADDING_PX = isMobile ? 50 : 80; // Equal padding on all sides
  const CONTENT_HEIGHT_PX = A5_HEIGHT_PX - PADDING_PX * 2;
  const PAGE_NUMBER_HEIGHT = 20;
  const MIN_BOTTOM_SPACE = PADDING_PX; // Minimum bottom padding
  const IMAGE_HEIGHT_PX = isMobile ? 250 : 200.2; // Fixed image height

  const calculateTextHeight = (text) => {
    const avgCharsPerLine = isMobile ? 30 : 100;
    const lineHeightPx = 21.5;
    const lines = Math.ceil(text.length / avgCharsPerLine);
    return lines * lineHeightPx;
  };

  const calculateImageHeight = (title = "") => {
    const titleHeight = title ? calculateTextHeight(title) + 16 : 0;
    return IMAGE_HEIGHT_PX + titleHeight;
  };

  const paginateContent = (chapter) => {
    const newPages = [];
    let currentPage = [];
    let currentHeight = 0;
    const showQuestionText = false;

    const findNaturalSplitPoint = (text, maxChars) => {
      if (text.length <= maxChars) return text.length;
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

      // Fallback: find the last space within the allowed character limit
      const lastSpace = text.lastIndexOf(" ", maxChars);
      if (lastSpace > 0) {
        return lastSpace + 1; // Split after the space
      }

      // If no space is found, split at maxChars (hard cut)
      return maxChars;
    };

    const startNewPageIfNeeded = () => {
      if (currentPage.length > 0) {
        newPages.push([...currentPage]);
        currentPage = [];
        currentHeight = 0;
      }
    };

    const handleTextOverflow = (text, forceNewPage = false) => {
      if (forceNewPage && currentPage.length > 0) {
        startNewPageIfNeeded();
      }

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

        // First try to place text before images if there's space
        if (remainingMessage) {
          const messageHeight = calculateTextHeight(remainingMessage);
          const imageHeight =
            images.length > 0
              ? calculateImageHeight(images.length === 1 ? title : "")
              : 0;

          // Check if we can fit both text and image
          if (
            currentHeight + messageHeight + imageHeight <=
            CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE
          ) {
            currentPage.push({
              type: "message",
              content: { message: remainingMessage },
            });
            currentHeight += messageHeight;
            remainingMessage = "";
          } else {
            remainingMessage = handleTextOverflow(remainingMessage);
          }
        }

        // Then handle images
        images.forEach((image, imgIdx) => {
          const imageHeight = calculateImageHeight(
            imgIdx === images.length - 1 ? title : ""
          );

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
              title: imgIdx === images.length - 1 ? title : "",
            },
          });
          currentHeight += imageHeight;

          // Try to add any remaining text after the image if space allows
          if (remainingMessage) {
            const messageHeight = calculateTextHeight(remainingMessage);
            if (
              currentHeight + messageHeight <=
              CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE
            ) {
              currentPage.push({
                type: "message",
                content: { message: remainingMessage },
              });
              currentHeight += messageHeight;
              remainingMessage = "";
            } else {
              remainingMessage = handleTextOverflow(remainingMessage, true);
            }
          }
        });

        if (remainingMessage) {
          remainingMessage = handleTextOverflow(remainingMessage, true);
        }
      });
    });

    if (currentPage.length > 0) {
      // Add spacer to maintain bottom padding if needed
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

  useEffect(() => {
    if (Object.keys(chapterPages).length === 0) return;

    const newFlatMessages = [];
    const newPageRefs = [];

    Object.entries(chapterPages).forEach(([chapterId, pages]) => {
      const chapter = groupedData[chapterId];
      if (!chapter) return;

      pages.forEach((pageContent) => {
        let questionText = "";
        let messageText = "";
        let messageIndex = -1; // Use -1 to indicate not found

        // Find the first question and message on the page to represent it
        for (const item of pageContent) {
          if (item.type === "questionText" && !questionText) {
            questionText = item.content;
          }
          if (item.type === "message" && !messageText) {
            messageText = item.content.message || "";
            // This part is tricky because we don't have a direct link back to the original message index
            // For now, we'll use the question to identify the context.
            break; // Found the first message, stop searching
          }
        }

        // Find the original question from the chapter data
        const originalQuestion = Object.values(chapter.questions).find(
          (q) =>
            pageContent.some(
              (item) =>
                item.type === "questionText" &&
                item.content.includes(q.questionText)
            ) ||
            pageContent.some(
              (item) =>
                item.type === "message" &&
                q.messages.some((m) => m.message.includes(item.content.message))
            )
        );

        newFlatMessages.push({
          question: originalQuestion
            ? originalQuestion.questionText
            : "Chapter Introduction",
          text: messageText,
          messageIndex: 0, // Placeholder, as the direct index is not available with pagination
        });
        newPageRefs.push(React.createRef());
      });
    });

    flatMessagesRef.current = newFlatMessages;
    pageRefs.current = newPageRefs.map((ref) => ref.current);
  }, [chapterPages, groupedData]);

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
              {/* <div className="a5-page2" ref={footerRef}>
                <h2 className="page-title">Enhanced Book</h2>
                <h3 className="page-subtitle">
                  "Every great story starts with a single page. This is yours."
                </h3>
                <p className="page-content">
                  Welcome to a journey where imagination knows no limits, and
                  every word holds a world of possibilities. As you turn these
                  pages, prepare to embark on an adventure that will challenge
                  your thoughts, stir your emotions, and leave an imprint on
                  your soul.
                </p>
                <p className="page-content">
                  Take a deep breath, open your mind, and let the story unfold…
                </p>
                <div className="page-footer">Chapter 1 • Your Life</div>
              </div> */}
              <div className="new-sec-tital">
                <h2>Herschreven versie</h2>
                <p>
                Uw antwoorden zijn herschreven tot een warm en doorlopend levensverhaal, inclusief uw foto’s en filmpjes via QR-code.
                  
                </p>
                <p style={{ lineHeight:"0.5"}}><strong >
                Kies rechts welke versie u wilt gebruiken om verder te gaan.
                  </strong></p>
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
                        <span>{chapterStartPages[chapterId]  +1  || "?"}</span>
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
                      <img className="chapter-image" src={chapter?.chapterImage} alt="chapter" />
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
                            ref={(el) => {
                              // This logic needs to be more robust if chapters can re-render
                              // For now, we find the overall page index to assign the ref
                              let overallPageIndex = 0;
                              Object.keys(chapterPages).forEach((chId) => {
                                if (chId < chapterId) {
                                  overallPageIndex += (chapterPages[chId] || [])
                                    .length;
                                }
                              });
                              overallPageIndex += pageIndex;
                              if (pageRefs.current && el) {
                                pageRefs.current[overallPageIndex] = el;
                              }
                            }}
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

              {/* {bookData?.data?.map((story, storyIndex) => {
                const chapterId = story.chapterId;
                // const chapter = chapterTitles[chapterId];
                const chapter = groupedData[chapterId?._id];

                const showChapterHeading = chapterId !== lastRenderedChapterId;
                if (showChapterHeading) {
                  lastRenderedChapterId = chapterId;
                }

                return (
                  <div key={story._id}>
                    <div  className="a5-page">
                      <h1 className="mock-heading">{chapter.chapterTitle}</h1>
                      {chapter.chapterTitle !== "Stamboom" && (
                        <img src={chapter?.chapterImage} />
                      )}

                      {chapter.chapterTitle === "Stamboom" && (
                        <div className="family-name-box">
                          <img
                            src={
                              chapter.chapterTitle === "Stamboom"
                                ? newtree
                                : chapter?.chapterImage
                            }
                            alt={chapter?.chapterImage}
                            width={"100%"}
                            height={"100%"}
                          />
                          <div className="family-name-list">
                            {treeData?.map((name, i) => (
                              <h6 className={`n-${i + 1}`}>{name}</h6>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {story?.messages?.map((message, messageIndex) => {
                      const currentIndex = globalMessageIndex++;
                      flatMessagesRef.current[currentIndex] = {
                        question: story?.questionId?.question,
                        text: message?.message,
                        messageIndex,
                      };

                      // Only render chapter title when it hasn't been rendered yet for this chapterId

                      return (
                        <div
                          key={message?._id}
                          className="a5-page"
                          ref={(el) => (pageRefs.current[currentIndex] = el)}
                        >
                          Message
                          {message.message && (
                            <div className="text-content">
                              <p>{message.message}</p>
                            </div>
                          )}
                          Images
                          {message?.images?.length > 0 && (
                            <div className="image-content">
                              {message.images.map((image, imageIndex) => (
                                <img
                                  key={imageIndex}
                                  src={image}
                                  alt={`Image ${imageIndex + 1}`}
                                  className="message-image"
                                />
                              ))}
                            </div>
                          )}
                          Videos
                          {message?.videos?.length > 0 && (
                            <div className="video-content">
                              {message.videos.map((video, videoIndex) => (
                                <div key={videoIndex} className="video-wrapper">
                                  <a
                                    href={video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Watch Video {videoIndex + 1}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })} */}

              <Scroll_Top topRef={topRef} footerRef={footerRef} />
            </div>
          </div>

          <div className="simple-story-box">
            <div className="modal-Preference-box">
              <div className="Preference-box-tital">
                <h2>Kies uw versie</h2>
                <p>Waar wilt u mee verdergaan?</p>
              </div>
              <div className="Preference-box-btn">
                <button onClick={() => handleOptionSelect("ownStories")}>
                  Uw originele verhalen
                </button>
                <button onClick={() => handleOptionSelect("enhancedStories")}>
                  De herschreven versie
                </button>
              </div>
            </div>

            <div className="simple-story-wrapper">
              <Simple_Story_Reader
                questionId={currentStory?.questionId}
                chapterId={currentStory?.chapterId}
                questionText={currentStory?.originalQuestion}
                text={currentStory?.message}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhanceBook;
