import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BiArrowBack,
  BiEdit,
  BiImageAdd,
  BiSave,
  BiSolidSend,
  BiTrash,
} from "react-icons/bi";
import { togglemenu } from "../Redux/Features/QuestionsSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl, socketurl } from "../baseUrl";
import "react-image-upload/dist/index.css";
// import VideoQr from "./Videoqr";
import AudioRecorder from "./texttospeech";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import backbtn from "../assets/backbtn.png";
import nextbtn from "../assets/nextbtn.png";
import axios from "axios";
import { saveStory, saveStoryEnchaned } from "../Redux/Features/storySlice";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import saveAnimation from "../assets/saveStories.json";

import { Tooltip } from "react-tooltip";
import ICON from "../assets/ani/wired-outline-54-photo-hover-mountains.json";
import ICON2 from "../assets/ani/wired-outline-19-magnifier-zoom-search-hover-spin.json";
import ICON4 from "../assets/ani/wired-outline-453-savings-pig-hover-pinch.json";
import ICON5 from "../assets/ani/wired-outline-49-plus-circle-hover-rotation.json";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import SaveStoriesModal from "./userchat-components/SaveStoriesModal";
import Lodersvg from "./hComponents/Lodersvg";
import done from "../assets/done.png";
import { showErrorToast, showSuccessToast } from "./Toaster/Toaster";
import { ReSubs } from "../context/ReSubsContext";
const UserChat = ({ questionText, chapterId, activeIndex }) => {
  const textareasRef = useRef([]);
  const imagesRef = useRef([]);
  const playerRef1 = useRef(null);
  const playerRef2 = useRef(null);
  const playerRef3 = useRef(null);
  const playerRef4 = useRef(null);
  const { questionId } = useParams();

  // const saveToLocalStorage = (data) => {
  //   localStorage.setItem("storyData", JSON.stringify(data));
  // };

  // // Function to load data from localStorage
  // const loadFromLocalStorage = () => {
  //   const storedData = localStorage.getItem("storyData");
  //   return storedData ? JSON.parse(storedData) : { textareas: [""], images: [] };
  // };

  // const [textareas, setTextareas] = useState(() => loadFromLocalStorage().textareas);
  // const [images, setImages] = useState(() => loadFromLocalStorage().images);
  const [textareas, setTextareas] = useState([""]);
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalcustom, setModalcustom] = useState(false);
  const [saveStories, setsaveStories] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [Loaderimg, setLoaderimg] = useState(false);
  const [StoriesLoader, setStoriesLoader] = useState(false);
  const [questionIds, setQuestionIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionId || "");
  const [currQuesText, setCurrQuesText] = useState("");
  const [Qrimg, setQrimg] = useState([]);

  const [title, settitle] = useState("Verhalen van mij");
  const [titles, setTitles] = useState([]); // To store titles for each media
  const [author, setauthor] = useState(" Wouter");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { isActive, setOpenToBlock } = ReSubs();

  const dispatch = useDispatch();
  const handleAddTextarea = () => {
    if (!isActive) {
      setOpenToBlock(true);
    return;
  }
    if (textareas[textareas.length - 1]?.trim() === "") return;

    setTextareas((prevTextareas) => [...prevTextareas, ""]);
    setImages((prevImages) => [...prevImages, null]); // Add a new empty slot for images
    setSelectedIndex(textareas.length); // Auto-select the newly added textarea

    setTimeout(() => {
      textareasRef.current[textareas.length]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleRemoveTextarea = (index) => {
    if (textareas.length > 1) {
      setTextareas((prevTextareas) =>
        prevTextareas.filter((_, i) => i !== index)
      );
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));

      if (selectedIndex === index) {
        setSelectedIndex(null);
      }
    } else {
      setTextareas([""]);
      setImages([null]);
      setSelectedIndex(0);
    }
  };
  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null; // Set the image at the specified index to null
      return newImages;
    });
  };
  const handleChange = (index, event) => {
    const newTextareas = [...textareas];
    newTextareas[index] = event.target.value;
    setTextareas(newTextareas);
  };

  // const handleImageUpload = async (event) => {
  //   console.log("Uploading file...");
  //   const file = event.target.files[0];
  //   if (!file || selectedIndex === null) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "twjpxlos");

  //   const isVideo = file.type.startsWith("video/");

  //   setLoaderimg(true);
  //   try {
  //     // Upload to Cloudinary
  //     const uploadUrl = isVideo
  //       ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
  //       : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

  //     const response = await axios.post(uploadUrl, formData);
  //     const fileUrl = response.data.secure_url;

  //     console.log("Uploaded file URL:", fileUrl);

  //     if (!isVideo) {
  //       // Directly set the image for images
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = fileUrl; // Directly set image
  //         return newImages;
  //       });
  //     } else {
  //       setQrimg((prev) => ({
  //         ...prev,
  //         [selectedIndex]: true,
  //       }));
  //       // Generate high-quality QR Code for videos
  //       const qrSize = 200; // Smaller QR size
  //       const qrResponse = await axios.get(
  //         `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
  //           fileUrl
  //         )}&margin=10`
  //       );

  //       console.log("Generated QR Code URL:", qrResponse.config.url);

  //       // Set QR code in the array
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = qrResponse.config.url; // Set QR code as image
  //         return newImages;
  //       });
  //     }

  //     setTimeout(() => {
  //       imagesRef.current[selectedIndex]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error uploading file or generating QR:", error);
  //   } finally {
  //     setLoaderimg(false);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file || selectedIndex === null) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        setImageUrl(img.src); // preview only
        setSelectedFile(file);
      };

      img.onerror = () => {
        showErrorToast("Unable to read the image.");
      };
    } else if (isVideo) {
      // Optional: You can preview video or just show a message
      setImageUrl(URL.createObjectURL(file)); // For preview if needed
      setSelectedFile(file);
    } else {
      showErrorToast("Unsupported file type. Please select image or video.");
    }
  };

  // const handleImageUpload = async (event) => {
  //   console.log("Uploading file...");
  //   const file = event.target.files[0];
  //   if (!file || selectedIndex === null) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "twjpxlos");

  //   const isVideo = file.type.startsWith("video/");

  //   setLoaderimg(true);
  //   try {
  //     // Upload to Cloudinary
  //     const uploadUrl = isVideo
  //       ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
  //       : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

  //     const response = await axios.post(uploadUrl, formData);
  //     const fileUrl = response.data.secure_url;

  //     console.log("Uploaded file URL:", fileUrl);

  //     if (!isVideo) {
  //       // Directly set the image for images
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = fileUrl; // Directly set image
  //         return newImages;
  //       });
  //     } else {
  //       setQrimg((prev) => ({
  //         ...prev,
  //         [selectedIndex]: true,
  //       }));
  //       // Generate high-quality QR Code for videos
  //       const qrSize = 200; // Smaller QR size
  //       const qrResponse = await axios.get(
  //         `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
  //           fileUrl
  //         )}&margin=10`
  //       );

  //       console.log("Generated QR Code URL:", qrResponse.config.url);

  //       // Overlay QR code onto the background image
  //       const backgroundImageUrl =
  //         "https://res.cloudinary.com/ddaif35tp/image/upload/v1745499887/ofyo0ggxlyplgbzdgonq.png";
  //       const qrCodeUrl = qrResponse.config.url;

  //       // Create a canvas to merge the images
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");

  //       // Load the background image
  //       const backgroundImg = new Image();
  //       backgroundImg.crossOrigin = "Anonymous"; // If the image is from a different domain
  //       backgroundImg.src = backgroundImageUrl;

  //       await new Promise((resolve) => {
  //         backgroundImg.onload = resolve;
  //       });

  //       // Set canvas size to match the background image
  //       canvas.width = backgroundImg.width;
  //       canvas.height = backgroundImg.height;

  //       // Draw the background image
  //       ctx.drawImage(backgroundImg, 0, 0);

  //       // Load the QR code image
  //       const qrImg = new Image();
  //       qrImg.crossOrigin = "Anonymous";
  //       qrImg.src = qrCodeUrl;

  //       await new Promise((resolve) => {
  //         qrImg.onload = resolve;
  //       });

  //       // Calculate the position and size for the QR code (adjust these values based on your background image)
  //       const qrWidth = 200; // Adjust based on your design
  //       const qrHeight = 200;
  //       // Calculate center positions
  //       const qrX = (canvas.width - qrSize) / 2.05;
  //       const qrY = (canvas.height - qrSize) / 1.5;

  //       // Draw QR code centered on canvas
  //       ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
  //       // Convert the canvas to a data URL
  //       const finalImageUrl = canvas.toDataURL("image/png");

  //       // Set the combined image in the array
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = finalImageUrl; // Set the merged image
  //         return newImages;
  //       });
  //     }

  //     setTimeout(() => {
  //       imagesRef.current[selectedIndex]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error uploading file or generating QR:", error);
  //   } finally {
  //     setLoaderimg(false);
  //   }
  // };
  const handleSave = async () => {
    if (!isActive) {
      setOpenToBlock(true);
      return;
    }
    if (!selectedFile || selectedIndex === null) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "twjpxlos");

    const isVideo = selectedFile.type.startsWith("video/");

    setLoaderimg(true);
    try {
      // Upload to Cloudinary
      const uploadUrl = `${baseUrl}/upload-file`
      // const uploadUrl = isVideo
        // ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
        // : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

      const response = await axios.post(uploadUrl, formData);
      const fileUrl = response.data.s3Url;

      if (!isVideo) {
        // Directly set the image for images
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[selectedIndex] = fileUrl; // Directly set image
          return newImages;
        });
      } else {
        setQrimg((prev) => ({
          ...prev,
          [selectedIndex]: true,
        }));
        // Generate high-quality QR Code for videos
        const qrSize = 200; // Smaller QR size
        const qrResponse = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
            fileUrl
          )}&margin=10`
        );

        // Overlay QR code onto the background image
        const backgroundImageUrl =
          "https://res.cloudinary.com/ddaif35tp/image/upload/v1745499887/ofyo0ggxlyplgbzdgonq.png";
        const qrCodeUrl = qrResponse.config.url;

        // Create a canvas to merge the images
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Load the background image
        const backgroundImg = new Image();
        backgroundImg.crossOrigin = "Anonymous"; // If the image is from a different domain
        backgroundImg.src = backgroundImageUrl;

        await new Promise((resolve) => {
          backgroundImg.onload = resolve;
        });

        // Set canvas size to match the background image
        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;

        // Draw the background image
        ctx.drawImage(backgroundImg, 0, 0);

        // Load the QR code image
        const qrImg = new Image();
        qrImg.crossOrigin = "Anonymous";
        qrImg.src = qrCodeUrl;

        await new Promise((resolve) => {
          qrImg.onload = resolve;
        });

        // Calculate the position and size for the QR code (adjust these values based on your background image)
        const qrWidth = 200; // Adjust based on your design
        const qrHeight = 200;
        // Calculate center positions
        const qrX = (canvas.width - qrSize) / 2.05;
        const qrY = (canvas.height - qrSize) / 1.5;

        // Draw QR code centered on canvas
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
        // Convert the canvas to a data URL
        const finalImageUrl = canvas.toDataURL("image/png");

        // Set the combined image in the array
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[selectedIndex] = finalImageUrl; // Set the merged image
          return newImages;
        });
      }
      setTitles((prevTitles) => {
        const newTitles = [...prevTitles];
        newTitles[selectedIndex] = title;
        return newTitles;
      });
      setTimeout(() => {
        imagesRef.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      console.error("Error uploading file or generating QR:", error);
    } finally {
      setImageUrl(null); // Clear the preview
      setSelectedFile(null); // Clear the selected file
      setModalcustom(false);
      setLoaderimg(false);
    }
  };

  const handleMouseEnter = (number) => {
    playerRef1.current?.playFromBeginning();
  };
  const handleMouseEnter2 = (number) => {
    playerRef2.current?.playFromBeginning();
  };
  const handleMouseEnter3 = (number) => {
    playerRef3.current?.playFromBeginning();
  };
  const handleMouseEnter4 = (number) => {
    playerRef4.current?.playFromBeginning();
  };

  const handleVoiceStop = (value) => {
    if (!isActive) {
      setOpenToBlock(true);
    return;
  }
    setTextareas((prev) => {
      if (selectedIndex === null || selectedIndex < 0) return prev; // Ensure a valid index is selected

      const newTextareas = [...prev];
      newTextareas[selectedIndex] =
        (newTextareas[selectedIndex] || "") + " " + value; // Append voice text
      return newTextareas;
    });
  };

  const handleInput = (e) => {
    e.target.style.height = "auto"; // Reset first
    e.target.style.height = `${Math.min(e.target.scrollHeight, 600)}px`; // Limit to 600px
    e.target.style.overflowY =
      e.target.scrollHeight > 600 ? "scroll" : "hidden"; // Add scroll if needed
  };

  const navigate = useNavigate();

  const location = useLocation();

  const isWeekQuestion = location?.state?.weekBase || false;
  const currentuserData = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = currentuserData?.inviteBy
    ? currentuserData?.inviteBy
    : currentuserData?._id;

  const [chatData, setChatData] = useState([]);
  const [chapDatas, setChapData] = useState();

  const findChapterTitle = (chapData) => {
    // Filter the array based on receiverId condition
    const filteredQuestions = chapData?.filter((q) => {
      return q?.receiverId !== currentuserData?.assistentId;
    });

    // console.log("Filtered Questions:", filteredQuestions);

    if (filteredQuestions?.length > 0) {
      // Get the last element from the filtered array
      const lastQuestion = filteredQuestions[filteredQuestions.length - 1];
      // console.log("Last Question:", lastQuestion);
      return lastQuestion?.message;
    } else if (questionText) {
      return questionText;
    } else {
      return "Question not found.";
    }
  };
  const handelData = async () => {
    try {
      const queryParams = new URLSearchParams({
        userId: myCurrId,
        questionId: currentQuestionId,
        receiverId: currentuserData?.assistentId,
      }).toString();

      const response = await fetch(`${baseUrl}/user?${queryParams}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("dd", data);
      setChatData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    handelData();
  }, [currentQuestionId]);

  useEffect(() => {
    const getChapterData = JSON.parse(localStorage.getItem("chapters"));
    setChapData(getChapterData);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/get-stories-by-chapterId/${myCurrId}/${location.state.chapterId}`
        );
        const story = response?.data?.data;

        const ids = story?.map((id) => id?._id);
        const filterIds = ids?.filter((_id) => _id !== questionId); // remove
        filterIds?.unshift(questionId); // add to start
        setQuestionIds(filterIds); // reason for filter is that we want that ques id first which we select
      } catch (error) {
        console.error("Error decompressing or parsing saved data:", error);
      }
    };
    if (isWeekQuestion) {
      // If it's a week-based question, use the questionIds from location state
      setQuestionIds(location?.state?.questionIds);
    } else {
      // Otherwise, fetch the questionIds from the server
      fetch();
    }
  }, []);

  useEffect(() => {
    if (questionIds.length > 0) {
      setCurrentQuestionId(questionIds[currentIndex]);
    }
  }, [currentIndex, questionIds]);

  const handleNext = () => {
    if (currentIndex < questionIds?.length - 1) {
      if(isActive){
      handleSubmit();
    }
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const fetchStoriesById = async (userId) => {
    try {
      setStoriesLoader(true);

      const paramId = questionIds?.length > 0 ? currentQuestionId : questionId;
      const response = await axios.get(
        `${baseUrl}/get-stories-by-id/${userId}/${paramId}`
      );
      const story = response.data.data;

      setTextareas(story.messages?.map((msg) => msg.message) || []);

      setCurrQuesText(response.data.question);
      setImages(story.messages?.map((msg) => msg.images) || []);
    } catch (error) {
      setStoriesLoader(false);
      console.error("Error decompressing or parsing saved data:", error);
    } finally {
      setStoriesLoader(false);
    }
  };

  useEffect(() => {
    fetchStoriesById(myCurrId);
  }, [myCurrId, currentQuestionId]);

  const handleSubmit = async () => {
    setLoader(true);

    // Last textarea khali hai to return kar do
    if (textareas[textareas.length - 1]?.trim() === "") {
      setLoader(false);
      return;
    }

    const formData = {
      userId: myCurrId,
      questionId: currentQuestionId,
      chapterId,
      messages: textareas?.map((text, index) => ({
        message: text,
        images: images[index] || [],
        videos: [],
        title: titles[index] || "", // Include the title for this media
      })),
    };

    try {
      const response = await axios.post(`${baseUrl}/stories`, formData);
      showSuccessToast("Verhaal opgeslagen", true);

      localStorage.removeItem("storyData");
      setsaveStories(true);
    } catch (error) {
      console.error("Error saving story:", error);
      showErrorToast(error.response?.data?.error || "Failed to save story");
    } finally {
      setLoader(false);
    }
  };

  const handleSpellCheck = async () => {
    if (selectedIndex === null || !textareas[selectedIndex]) return;

    try {
      const response = await axios.post(`${baseUrl}/spell-check`, {
        text: textareas[selectedIndex],
        userId: myCurrId,
      });

      const correctedText = response.data.correctedText;
      const updatedTexts = [...textareas];
      updatedTexts[selectedIndex] = correctedText;
      setTextareas(updatedTexts);
    } catch (error) {
      console.error("Spell check error:", error);
    }
  };

  // const handleSave = () => {
  //   handleSubmit();
  //   // setModalcustom(false);
  // };

  const Navigate_to_Stoires = () => {
    navigate("/ReviewBook");
    setsaveStories(false);
  };

  const ensuredTextareas = textareas.length === 0 ? [""] : textareas;

  const isLastQuestion =
    currentQuestionId === questionIds[questionIds.length - 1];

  return (
    <div className="rightbar-ar">
      <ToastContainer position="top-center" autoClose={2000} />

      {Loader ? (
        <div className="loader loader-overlay">
          <Lodersvg />
        </div>
      ) : (
        <div className="toggle-sidebar-ar">
          <div className="toggle-head-btn-ar">
            {/* <button
              onClick={() => navigate("/samplebook")}
              className="head-btn-ar"
            >
              Voorbeeldboek
            </button> */}
          </div>
        </div>
      )}

      <div className="right-below-ar">
        <div className="heading-chat-ar">
          <div className="add-back-btn-box">
            <div className="add-back-batn">
              <div className="arrow" onClick={handlePrevious}>
                {/* <BiArrowBack size={24} color="#F39C12" /> */}
                <img src={backbtn} alt="" />
              </div>
            </div>
            <div className="chap-heading-ar">
              <span>{currQuesText} </span>
            </div>

            <div className="  add-go-btn">
              <div className="arrow" onClick={handleNext}>
                {/* <BiArrowBack size={24} color="#F39C12" /> */}
                <img src={nextbtn} alt="" />
              </div>
            </div>
          </div>
          {/* style={{  height: textareas.length > 2 || (images && images.length >= 1) ? 'calc(100vh - 380px)' : '100%'}} */}
          <div className="chat-ar">
            <div className="input-outer-div">
              <div className="input-container">
                {ensuredTextareas?.map((text, index) => (
                  <div
                    key={index}
                    ref={(el) => (textareasRef.current[index] = el)}
                    className={`dynamic--textarea ${
                      selectedIndex === index ? "selected" : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      setSelectedIndex(index);
                      setHoveredIndex(null);
                    }}
                    style={{ position: "relative" }}
                  >
                    <textarea
                      className="message-div-ar"
                      placeholder="Vertel hier uw verhaal…"
                      value={text}
                      onChange={(e) => handleChange(index, e)}
                      // disabled={!(selectedIndex === index || index === 0 || textareas.length < 1)}
                      onInput={handleInput}
                      onFocus={handleInput}
                      style={{
                        width: "100%",
                        // height: "max-content",
                        maxHeight: "1000px",
                        minHeight: "200px",
                        resize: "none",
                      }}
                    />

                    {hoveredIndex === index && (
                      <div className="textarea-actions">
                        <button
                          onClick={() => {
                            setSelectedIndex(index);
                            setHoveredIndex(null);
                          }}
                          className="icon-button"
                          data-tooltip-id="edit-tooltip"
                          data-tooltip-content="Edit this section"
                        >
                          {/* <BiEdit
                            size={20}
                            color={selectedIndex === index ? "#4CAF50" : "#888"}
                          /> */}
                        </button>
                        <button
                          onClick={() => handleRemoveTextarea(index)}
                          className="icon-button"
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Verwijder dit gedeelte"
                        >
                          <BiTrash size={20} color="#FF5252" />
                        </button>
                      </div>
                    )}

                    {images[index] && images[index].length > 0 && (
                      <div
                        className="image-preview"
                        style={{ width: Qrimg[index] ? "100%" : "" }}
                      >
                        <img src={images[index]} alt="Uploaded" />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="delete-image-btn"
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Verwijder afbeelding"
                        >
                          <BiTrash size={16} color="#FFF" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={"Qustionchat-btn-box"}>
            {/* {activeIndex !== 0 &&  */}
            <>
              <ProgressBar
                className="asd"
                // progressWidth={'100%'}
                hideText
                score={progress}
              />
              <button
                // onClick={() => document.getElementById("image-upload").click()}
                onClick={() => {
                  setModalcustom(true);
                  if (!isActive) {
                    setOpenToBlock(true);
                    return;
                  }
                }}
                disabled={!isActive}
                // disabled={selectedIndex === null}
                data-tooltip-id="image-tooltip"
                data-tooltip-content="Upload foto’s of videos"
              >
                <div
                  onMouseEnter={handleMouseEnter}
                  style={{ cursor: "pointer" }}
                >
                  <Player ref={playerRef1} size={25} icon={ICON} />
                </div>
                {/* <BiImageAdd size={25} /> */}
                <span>{Loaderimg ? "Loading" : "Media toevoegen"}</span>
              </button>
              {/* <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                accept="image/*, video/*"
                onChange={handleImageUpload}
              /> */}

              <button
                disabled={!isActive}

                onClick={handleAddTextarea}
                data-tooltip-id="text-tooltip"
                data-tooltip-content="Tekstblok toevoegen"
              >
                <div onMouseEnter={handleMouseEnter2}>
                  <Player ref={playerRef2} size={25} icon={ICON5} />
                </div>
                {/* <BiEdit size={25} /> */}
                <span>Tekst toevoegen</span>
              </button>

              <button
              onClick={() => {
                if (!isActive) {
                  setOpenToBlock(true);
                return;
              }}}
              disabled={!isActive}
                data-tooltip-id="voice-tooltip"
                data-tooltip-content="Zelf inspreken"
              >
                <AudioRecorder onVoiceStop={handleVoiceStop} />

                {/* <span>Add voice</span> */}
              </button>

              <button
                disabled={!isActive}

                onClick={handleSpellCheck}
                data-tooltip-id="spell-tooltip"
                data-tooltip-content="Controleer spelling"
              >
                {/* <Spell_Icon /> */}
                <div onMouseEnter={handleMouseEnter3}>
                  <Player ref={playerRef3} size={25} icon={ICON2} />
                </div>
                <span>Spellingcontrole</span>
              </button>
            </>
            {/* } */}

            {textareas.length > 0 && (
              <button
              
                onClick={() => {
                  handleSubmit();
                }}
                // onClick={() => setModalcustom(true)}
                disabled={!textareas[textareas.length - 1]?.trim() || Loader||!isActive}
                data-tooltip-id="save-tooltip"
                data-tooltip-content="Sla uw verhaal op"
              >
                {/* <BiSave size={25} /> */}
                <div
                  onMouseEnter={handleMouseEnter4}
                  style={{ cursor: "pointer" }}
                >
                  <Player ref={playerRef4} size={25} icon={ICON4} />
                </div>
                <span>{Loader ? "Besparing..." : "Bewaar verhalen"}</span>
              </button>
            )}
          </div>
          <div className="next-per-box">
            <button
              style={{ width: "20%" }}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Vorige vraag
            </button>
            {isLastQuestion && !isWeekQuestion ? (
              <button
                style={{ width: "20%" }}
                onClick={() => navigate("/ReviewBook")}
              >
                Go to voorbeelboek
              </button>
            ) : (
              <button
                style={{ width: "20%" }}
                onClick={handleNext}
                disabled={
                  questionIds?.length === 0 ||
                  currentIndex === questionIds.length - 1
                }
              >
                Volgende vraag
              </button>
            )}
          </div>
        </div>
      </div>

      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
      <Tooltip id="image-tooltip" />
      <Tooltip id="text-tooltip" />
      <Tooltip id="voice-tooltip" />
      <Tooltip id="spell-tooltip" />
      <Tooltip id="save-tooltip" />

      <SaveStoriesModal
        modalcustom={modalcustom}
        setModalcustom={setModalcustom}
        saveAnimation={saveAnimation}
        saveStories={saveStories}
        Navigate_to_Stoires={Navigate_to_Stoires}
        handleSubmit={handleSubmit}
        Loader={Loader}
      />

      <Modal
        show={modalcustom}
        onHide={() => setModalcustom(false)}
        // backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="w-100">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100">
            Voeg foto, video en tekst toe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customize-container">
            <h4 className="modal-title">
              Voeg je foto, video en korte omschrijving toe
            </h4>
            <p className="modal-subtitle">
              Personaliseer met je eigen titel en afbeelding of video
            </p>

            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">Titel (max. 200 tekens)</label>
              <input
                type="text"
                className="form-control"
                name="title"
                maxLength="100"
                placeholder="Voeg omschrijving toe"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            {/* Author Input */}

            <div className="form-group">
              <label className="form-label">Media</label>

              <div
                className="upload-box"
                style={{ height: imageUrl ? "auto" : "150px" }}
              >
                <div className="upload-content">
                  <label
                    htmlFor="fileUpload"
                    className="upload-content"
                    style={{ cursor: "pointer" }}
                  >
                    {imageUrl ? (
                      selectedFile?.type.startsWith("image/") ? (
                        <img
                          src={imageUrl}
                          alt="Uploaded Preview"
                          className="preview-image"
                        />
                      ) : selectedFile?.type.startsWith("video/") ? (
                        <video
                          src={imageUrl}
                          controls
                          className="preview-video"
                        />
                      ) : null
                    ) : (
                      <div htmlFor="fileUpload">
                        <input
                          type="file"
                          className="upload-input"
                          onChange={handleImageUpload}
                          id="fileUpload"
                          hidden
                        />
                        <span className="upload-icon">📤</span>
                        <p className="upload-text">Afbeelding toevoegen</p>
                        <p className="upload-format">
                          Voeg een foto of video toe
                          <br />
                          (JPEG, PNG of MP4, max. 50 MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Move the button OUTSIDE the "upload-content" div */}
              <div className="upload-button-container">
                <input
                  type="file"
                  className="upload-input"
                  accept="image/*, video/*"
                  // accept="image/*"
                  onChange={handleImageUpload}
                  id="fileUpload"
                  hidden
                />
                <label htmlFor="fileUpload" className="browse-button">
                  Blader door bestanden
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="w-100 justify-content-between">
          <Button
            style={{
              background: "#ebbb5b",
              border: "none",
              width: "20%",
            }}
            onClick={handleSave}
          >
            Opslaan 
          </Button>
          <Button
            style={{
              background: "#ebbb5b",
              border: "none",
              width: "20%",
              color: "white",
            }}
            variant="outline-secondary"
            onClick={() => setModalcustom(false)}
          >
            Sluiten 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserChat;
