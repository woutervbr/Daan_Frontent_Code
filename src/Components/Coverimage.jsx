import React, { useContext, useEffect, useRef, useState } from "react";
// import html2canvas from "html2canvas";

import html2canvas from "html2canvas-pro";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { CloudinaryUpload } from "../cloudinaryupload/CloudinaryUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  incrementstep,
  decrementstep,
} from "../Redux/Features/QuestionsSlice";
import Select from "react-select";
import "../../src/book.css";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Imgecoverpopup from "../pages/Imgecoverpopup";
import ArrowLeftIcon from "../svgsIcons/ArrowLeftIcon";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import { Bin_Icon, Cover_Tick_Icon } from "../svgsIcons/basit_svgs";
import axios from "axios";
import Cover1 from "../assets/b3.png";
import Cover2 from "../assets/b4.png";
import Cover3 from "../assets/b2.png";
import Cover4 from "../assets/b1.png";
import Cover5 from "../assets/b6.png";
import Cover6 from "../assets/b5.png";
import Cover7 from "../assets/b9.png";
import Cover8 from "../assets/b8.png";
import Cover9 from "../assets/b7.png";
import Logo from "../assets/logo.png";
import { baseUrl } from "../baseUrl";
import A5ImageCropper from "./A5ImageCropper/A5ImageCropper";
import { showErrorToast, showSuccessToast } from "./Toaster/Toaster";
import Lodersvg from "./hComponents/Lodersvg";
const LogoWhite =
  "https://res.cloudinary.com/ddaif35tp/image/upload/v1745424290/lkrdywwmd3l8rcdpe5e6.png";

const googleFonts = [
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Lato", label: "Lato" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Raleway", label: "Raleway" },
  { value: "Nunito", label: "Nunito" },
  { value: "fantasy", label: "fantasy" },
  { value: "math", label: "math" },
];

const googleFontSize = [
  { value: 10, label: "10" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 22, label: "22" },
  { value: 24, label: "24" },
  { value: 26, label: "26" },
];

const CoverImage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalcustom, setModalcustom] = useState(false);
  const [selectedImages, setselectedImages] = useState(
    localStorage.getItem("image")
  );
  const [styles, setStyles] = useState({
    background: "#f9f3e5",
    color: "#000",
  });
  const [selectedLayout, setSelectedLayout] = useState("image-top");
  const currUser = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);
  const ismenuopen = useSelector((state) => state.questionCounter.menuopen);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [showfonts, setShowfonts] = useState(false);
  const [SelectedCover, setSelectedCover] = useState("");
  const [title, settitle] = useState(() => {
    return localStorage.getItem("title") || "Verhalen van mij";
  });

  const [author, setauthor] = useState(currUser.name);
  const [sidecover, setsidecover] = useState("Verhalen van mij");
  const [para, setPara] = useState("Add a tag line for this book");
  const [BackCover, setBackCover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [IsLogo, setIsLogo] = useState(false);
  const [clasToHide, setClassToHide] = useState(false);
  const [extraClass, setExtraClass] = useState(false);
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const [imageUrl, setImageUrl] = useState(null); // Original image
  const [cropped, setCropped] = useState(null); // Cropped image
  const [showCropper, setShowCropper] = useState(false); // Toggle cropper UI
  const [loading, setloading] = useState(false);
  const covertype = localStorage.getItem("covertype") || 1;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);

  const handleResetCropper = () => {
    setCropped(null);
  };

  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", author);
  }, [title, author]);

  const handleSave = () => {
    if (cropped) {
      setImageUrl(cropped); // update original image to cropped version for next editing
      localStorage.setItem("savedImage", cropped);
      localStorage.setItem("title", title);

      // Wait for DOM to update before capturing
      setTimeout(() => {
        handleCaptureAndUpload();
        setModalcustom(false);
      }, 100); // 100ms is usually enough
    } else {
      showErrorToast("Geen afbeelding geselecteerd");
    }
  };

  const handleCaptureAndUpload = async () => {

     window.scrollTo(0, 0);
    const element = document.querySelector(".bookcoverdiv");

    if (!element) {
      console.error("Book cover element not found!");

      showErrorToast("Book cover element not found!");

      return;
    }

    // Temporarily scale the element itself for better rendering
    const originalTransform = element.style.transform;
    setloading(true);
    try {
      await document.fonts.ready;

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // Try reducing scale from 3 to 2
        allowTaint: false, // Try setting to false
        backgroundColor: "#ffffff", // Set explicit background instead of null
        removeContainer: false, // Try setting to false
        scrollX: 0,
        scrollY: 0,
        width: element.offsetWidth, // Use offsetWidth instead of scrollWidth
        height: element.offsetHeight, // Use offsetHeight instead of scrollHeight
        logging: true, // Enable logging for debugging
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedElement = clonedDoc.querySelector(".bookcoverdiv");
          if (clonedElement) {
            // Force font family explicitly
            clonedElement.style.fontFamily = "Arial, sans-serif";
          }
        },
      });

      // Revert element transform after capture
      element.style.transform = originalTransform;

      // Convert canvas to image
      const imageData = canvas.toDataURL("image/png");

      const blob = await fetch(imageData).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob,"cover.png"); // Use a fixed name for the cover image
      formData.append("upload_preset", "twjpxlos"); // Change to your actual preset
      const response = await axios.post(
        `${baseUrl}/upload-file`, // Change Cloud name
        formData
      );  

      if (response.data.s3Url) {
        const uploadedImageUrl = response.data.s3Url;
        const publicId = response.data?.public_id || "";

        localStorage.setItem("imagePublicId", publicId);
        localStorage.setItem("image", uploadedImageUrl);

        const dispatch = useDispatch();
        dispatch(changeStatus());

        showSuccessToast("Book cover saved successfully!");
      }
    } catch (error) {
      console.error("Error capturing or uploading:", error);
      // toast.error("Failed to upload book cover.");
    } finally {
      // Always reset transform even if there's an error
      element.style.transform = originalTransform;
      setloading(false);
    }
  };
  const handleSaveTemplate = () => {
    localStorage.setItem("savedImage", imageUrl);
    localStorage.setItem("savedImage", imageUrl);
 localStorage.setItem("image", imageUrl || isCustom);

    localStorage.setItem("title", title);
    handleCaptureAndUpload();


    showSuccessToast("Sjabloon succesvol opgeslagen!");
    setModalShow(false);
  };

  console.log(selectedImages, "selectedImages");
  
  const images = [
    {
      id: 1,
      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png",
      background: "#f9f3e5",
      color: "#000",
      layout: "text-top",
      cover: Cover1,
      objectposition: "bottom",
      objectfit: "cover",
      authorposition: "relative",
      authormargin: "0px",
      authorbackground: "#f39c12",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "36vh",
      imagemargintop: "40px",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
      lineheight: 2,
    },

    //2
    {
      id: 2,

      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048657/waikk0vkrhmsuduy7dhc.png",
      background: "#a9a11a",
      color: "#000",
      layout: "image-top",
      cover: Cover2,
      objectposition: "top",
      objectfit: "cover",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "74%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
      lineheight: 0,
    },
    // {
    //   src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1742207726/z7kivtq0b2vnbkzkt3qu.png",
    //   background: "#f0dde3",
    //   color: "#000",
    //   layout: "text-top",
    //   cover: Cover3,
    //   objectposition: 'bottom',
    //   authorposition: '',
    //   authormargin: '0px',
    //   authorbackground: "",
    //   authorcolor: "#000",
    //   bookpara: '',
    //   booktextposition: '',
    //   width: '',
    //   bookcoverdivimageheight: '73%',
    //   imagemargintop: '',
    //   bookcoverdivimageposition: '',
    //   bookcoverdivimagepositionright: '',
    //   bookcoverdivimagewidth: '',
    //   logo: Logo,
    //   logoPosition: 'relative',s
    //   logoMargin: '',

    // },
    // 3
    {
      id: 3,

      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048555/y3ih8qs7t4qaw9exehok.png",
      background: "#fce2b8",
      color: "#000",
      layout: "image-top",
      cover: Cover5,
      objectposition: "top",
      objectfit: "cover",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "#f39c12",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "77%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
      lineheight: 0,
    },
    // green 4
    {
      id: 4,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365653/feoeez3zrql1u4auotge.png",
      background: "#297C69",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "relative",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
      lineheight: 0,

      usernameText: isMobile ? "17.3em" : "18em",

    },
    // darkblue 5
    {
      id: 5,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365654/g3rdajhkzfx4w1yu4jvw.png",
      background: "#091F3E",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",

      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
      authorposition: "relative",
      lineheight: 0,

      usernameText: isMobile ? "17.3em" : "18em",


    },
    // lightblue 6
    {
      id: 6,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365655/gejanyesqw3ose9tv3qu.png",
      background: "#B8C7D9",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",

      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
      authorposition: "relative",
      lineheight: 0,

           usernameText: isMobile ? "17.3em" : "18em",

    },
    // purple 7
    {
      id: 7,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365699/dopip0klsbpj9s0kvlba.png",
      background: "#783778",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",

      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
      authorposition: "relative",
      lineheight: 0,

      usernameText: isMobile ? "17.3em" : "18em",


    },
    // 8
    {
      id: 8,

      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048596/emwvicggaln1lrezyukn.png",
      background: "#e3b1d2",
      color: "#FFF",
      layout: "image-top",
      cover: Cover6,
      objectposition: "top",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "#000",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "75%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoTop: isMobile?"-74%":"-75%",
      imagePosition: "relative",
      imagePlace: isMobile ? "34px" : "48px",
      lineheight: 1,
    },
    // 9
    {
      id: 9,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1745586937/pnnjjwqv2jjliqpri0ku.png",
      background: "#654321",
      color: "#FFF",
      layout: "image-top",
      cover: Cover7,
      objectposition: "top",
      objectfit: "cover",
      authorposition: "relative",
      authormargin: "230px 0px 0px 0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "absolute",
      booktextposition: "10em",
      width: "50%",
      bookcoverdivimageheight: "100%",
      imagemargintop: "",
      bookcoverdivimageposition: "absolute",
      bookcoverdivimagepositionright: "0",
      bookcoverdivimagewidth: "40%",
      logo: LogoWhite,
      logoPosition: "absolute",
      logoMargin: "0px 10px",
      hideclass: true,
      extraFeilds: true,
      para: "",
      extraParaPosition: "absolute",
      extraParaTop: "100px",
      extraParaMaxWidth: "100%",
      extraParaLeft: "20px",
      lineheight: 0,
      h1width: "56%",
    },
    //10
    {
      id: 10,

      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1745586936/pefvrotjpnvi2haikvq8.png",
      background: "#660033",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "relative",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "58%",
      imagemargintop: "",
      bookcoverdivimageposition: "relative",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
      extraFeilds: true,
      para: "",
      usernameText: isMobile ? "16em" : "18em",
      lineheight: 0,
      h1width: "55%",
    },
  ];

  const handleImageClick = (
    background,
    color,
    objectposition,
    objectfit,
    authorposition,
    authormargin,
    authorbackground,
    authorcolor,
    bookpara,
    booktextposition,
    width,
    bookcoverdivimageheight,
    imagemargintop,
    bookcoverdivimageposition,
    bookcoverdivimagepositionright,
    bookcoverdivimagewidth,
    layout,
    cover,
    src,
    logo,
    logoPosition,
    logoMargin,
    hideclass,
    extraFeilds,
    para,
    extraParaPosition,
    extraParaTop,
    extraParaMaxWidth,
    extraParaLeft,
    id,
    usernameText,
    logoTop,
    imagePosition,
    imagePlace,
    lineheight,
    h1width
  ) => {
    setStyles({
      background,
      color,
      objectposition,
      objectfit,
      authorposition,
      authormargin,
      authorbackground,
      authorcolor,
      bookpara,
      booktextposition,
      width,
      bookcoverdivimageheight,
      imagemargintop,
      bookcoverdivimageposition,
      bookcoverdivimagepositionright,
      bookcoverdivimagewidth,
      logoPosition,
      logoMargin,
      hideclass,
      extraFeilds,
      para,
      extraParaPosition,
      extraParaTop,
      extraParaMaxWidth,
      extraParaLeft,
      usernameText: usernameText ? usernameText : "",
      logoTop: logoTop ? logoTop : "",
      imagePosition: imagePosition ? imagePosition : "",
      imagePlace: imagePlace ? imagePlace : "",
      lineheight: lineheight,
      h1width: h1width ? h1width : "100%",
    });
    setSelectedLayout(layout);
    setSelectedCover(cover);
    setIsCustom(src);
    setIsLogo(logo);
    // setExtraClass(extraFeilds ? extraFeilds : false);
    setExtraClass(false);
    setClassToHide(hideclass ? hideclass : false);
    localStorage.setItem("covertype", id);
  };

  // // auto Select the First Template when Comes to Focus
  useEffect(() => {
    // Automatically select the first template when modal is shown
    const firstTemplate = images[0];
    if (selectedImages && covertype) {
      const findobj = images?.find((obj) => obj.id == covertype);

      setStyles({
        background: findobj?.background,
        color: findobj?.color,
        lineHeight: findobj?.lineheight,
        objectposition: findobj?.objectposition,
        objectfit: findobj?.objectfit,
        authorposition: findobj?.authorposition,
        authormargin: findobj?.authormargin,
        authorbackground: findobj?.authorbackground,
        authorcolor: findobj?.authorcolor,
        bookpara: findobj?.bookpara,
        booktextposition: findobj?.booktextposition,
        width: findobj?.width,
        bookcoverdivimageheight: findobj?.bookcoverdivimageheight,
        imagemargintop: findobj?.imagemargintop,
        bookcoverdivimageposition: findobj?.bookcoverdivimageposition,
        bookcoverdivimagepositionright: findobj?.bookcoverdivimagepositionright,
        bookcoverdivimagewidth: findobj?.bookcoverdivimagewidth,
        logoPosition: findobj?.logoPosition,
        logoMargin: findobj?.logoMargin,
        hideclass: findobj?.hideclass,
        extraFeilds: findobj?.extraFeilds,
        para: findobj?.para,
        extraParaPosition: findobj?.extraParaPosition,
        extraParaTop: findobj?.extraParaTop,
        extraParaMaxWidth: findobj?.extraParaMaxWidth,
        extraParaLeft: findobj?.extraParaLeft,
        usernameText: findobj?.usernameText ?? "",
        logoTop: findobj?.logoTop ?? "",
        imagePosition: findobj?.imagePosition ?? "",
        imagePlace: findobj?.imagePlace ?? "",
        h1width: findobj?.h1width ?? "100%",
      });

      setIsLogo(findobj?.logo);
      setIsCustom(selectedImages);
    } else {
      handleImageClick(
        firstTemplate.background,
        firstTemplate.color,
        firstTemplate.objectposition,
        firstTemplate.objectfit,
        firstTemplate.authorposition,
        firstTemplate.authormargin,
        firstTemplate.authorbackground,
        firstTemplate.authorcolor,
        firstTemplate.bookpara,
        firstTemplate.booktextposition,
        firstTemplate.width,
        firstTemplate.bookcoverdivimageheight,
        firstTemplate.imagemargintop,
        firstTemplate.bookcoverdivimageposition,
        firstTemplate.bookcoverdivimagepositionright,
        firstTemplate.bookcoverdivimagewidth,
        firstTemplate.layout,
        firstTemplate.cover,
        firstTemplate.src,
        firstTemplate.logo,
        firstTemplate.logoPosition,
        firstTemplate.logoMargin,
        firstTemplate.hideclass,
        firstTemplate.extraFeilds,
        firstTemplate.para,
        firstTemplate.extraParaPosition,
        firstTemplate.extraParaTop,
        firstTemplate.extraParaMaxWidth,
        firstTemplate.extraParaLeft
      );
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImageUrl(img.src); // Save original image
      setCropped(null); // Reset cropped preview
      setShowCropper(true);
    };

    img.onerror = () => {
      showErrorToast("Unable to read the image.");
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCoverImage = async (e) => {
    e.preventDefault();
    try {
      const files = Array.from(e.target.files);

      for (const file of files) {
        const image = await CloudinaryUpload(file);
        if (image) {
          localStorage.setItem("image", image);
          dispatch(changeStatus());
        }
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };
  const loadFont = (fontName) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const [showPopup, setShowPopup] = useState(false);
  // Function to toggle popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const onValue = (value) => {
    setauthor(value.author);
    settitle(value.title);

    setselectedImages(value.cover_image);
  };

  const handleImageDelete = () => {
    setImageUrl(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      {loading ? (
        <div className="loader loader-overlay">
          <Lodersvg />
        </div>
      ) : (
        <>
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
              <span className="text">Terug naar Verbeter boek</span>
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
              onClick={() => dispatch(incrementstep(3))}
            >
              <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Ga naar Verzending</span>
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

          <div className="alignments">
            <div className="leftPanel">
              <div className="more-box-list">
                <div className="Choose-Template-box">
                  <h2>Kies uw omslag </h2>
                  <p>Bepaal hoe de voorkant van uw boek eruitziet.</p>
                </div>

                {/* <div className="two-button-box">
          <button onClick={togglePopup}>
            Omslag bewerken</button>
        </div> */}
              </div>
              <Container>
                <div className="template--select--main">
                  <div className="template--select">
                    <span>
                      <Cover_Tick_Icon />
                      <h5>1. Kies uw voorkant </h5>
                    </span>
                    <button onClick={() => setModalShow(true)}>Bewerken</button>
                  </div>
                  <div className="template--select">
                    <span>
                      <Cover_Tick_Icon />
                      <h5>2. Pas foto, naam en titel aan </h5>
                    </span>
                    <button onClick={() => setModalcustom(true)}>
                      Bewerken
                    </button>
                  </div>

                  <div className="back--cover">
                    {BackCover ? (
                      <button onClick={() => setBackCover(false)}>
                        Bekijk de voorpagina
                      </button>
                    ) : (
                      <button onClick={() => setBackCover(true)}>
                        Bekijk de achterkant
                      </button>
                    )}
                  </div>
                </div>
              </Container>
            </div>

            <div className="rightpanel">
              <div
                className="postion-box-book-cover"
                style={{ background: styles.background }}
              >
                <div className="one-more-box">
                  <div className="book-cover-tital-rout">
                    <h2
                      style={{
                        color: styles.color,
                        // background: styles.background,
                      }}
                    >
                      {title || "Verhalen van mij"}
                    </h2>
                  </div>
                  <img src={IsLogo || Logo} alt="" />
                </div>
              </div>

              <div
                className={`${clasToHide ? "flex-remove" : ""} bookcoverdiv`}
                style={{
                  background: styles.background,
                  width: !imageUrl ? "35vh" : "35vh",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {imageUrl && isHovered && (
                  <div className="deleteimg" onClick={handleImageDelete}>
                    <Bin_Icon />
                  </div>
                )}
                {!BackCover ? (
                  !imageUrl ? (
                    // If imageUrl is null, show only the selected image from images array
                    <img
                      src={
                        isCustom
                          ? isCustom
                          : "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png"
                      }
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      alt="Book Cover"
                    />
                  ) : selectedLayout === "image-top" ? (
                    <>
                      <img
                        src={
                          imageUrl
                            ? imageUrl
                            : SelectedCover
                            ? SelectedCover
                            : Cover1
                        }
                        style={{
                          objectPosition: styles.objectposition,
                          objectFit: styles.objectfit,
                          height: styles.bookcoverdivimageheight,
                          position:
                            styles.bookcoverdivimageposition ||
                            styles.imagePosition,
                          right: styles.bookcoverdivimagepositionright,
                          width: styles.bookcoverdivimagewidth,
                          top: styles.imagePlace,
                        }}
                        alt="Book Cover"
                      />
                      <div
                        className="book-cover-para-logo"
                        style={{
                          position: styles.logoPosition,
                          margin: styles.logoMargin,
                          top: styles.logoTop,
                        }}
                      >
                        <img src={IsLogo || Logo} alt="" />
                      </div>
                      <div
                        className="book-cover-para"
                        style={{
                          position: styles.bookpara,
                          top: styles.booktextposition,
                          width: styles.h1width,
                        }}
                      >
                        <h1 style={{ color: styles.color }}>
                          {title || "Verhalen van mij"}
                        </h1>
                        {/* yehe heeeee */}
                        {extraClass && (
                          <h5
                            style={{
                              color: styles.color,
                              position: styles.extraParaPosition,
                              top: styles.extraParaTop,
                              maxWidth: styles.extraParaMaxWidth,
                              left: styles.extraParaLeft,
                            }}
                          >
                            {para}
                          </h5>
                        )}
                      </div>
                      <div
                        className="book-cover-para"
                        style={{
                          position: styles.bookpara,
                          top: styles.booktextposition,
                          width: styles.width,
                        }}
                      >
                        <p
                          style={{
                            position: styles.authorposition,
                            margin: styles.authormargin,
                            background: styles.authorbackground,
                            color: styles.authorcolor,
                            top: styles.usernameText,
                          }}
                        >
                          {author}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="book-cover-para-logo"
                        style={{
                          position: styles.logoPosition,
                          margin: styles.logoMargin,
                        }}
                      >
                        <img src={IsLogo || Logo} alt="" />
                      </div>
                      <div
                        className="book-cover-para"
                        style={{
                          position: styles.bookpara,
                          top: styles.booktextposition,
                          width: isMobile ? "" : "300px",
                        }}
                      >
                        <h1 style={{ color: styles.color }}>
                          {title || "Verhalen van mij"}
                        </h1>
                      </div>
                      <div
                        className="book-cover-para"
                        style={{
                          position: styles.bookpara,
                          top: styles.booktextposition,
                          width: styles.width,
                          lineHeight: styles.lineheight,
                        }}
                      >
                        <p
                          style={{
                            color: styles.authorcolor,
                            position: styles.authorposition,
                            margin: styles.authormargin,
                            background: styles.authorbackground,
                            top: styles.usernameText,
                          }}
                        >
                          {author}
                        </p>
                      </div>
                      <img
                        src={
                          imageUrl
                            ? imageUrl
                            : SelectedCover
                            ? SelectedCover
                            : Cover1
                        }
                        style={{
                          objectPosition: styles.objectposition,
                          objectFit: styles.objectfit,
                          height: styles.bookcoverdivimageheight,
                          position: styles.bookcoverdivimageposition,
                          right: styles.bookcoverdivimagepositionright,
                          width: styles.bookcoverdivimagewidth,
                        }}
                        alt="Book Cover"
                      />
                      {extraClass && (
                        <h6
                          style={{
                            color: styles.color,
                          }}
                          className="book-cover-para"
                        >
                          {para}
                        </h6>
                      )}
                    </>
                  )
                ) : (
                  <div className="back--cover">
                    <p style={{ color: styles.color, background: "white" }}>
                      {/* Gemaakt door {author} */}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={togglePopup}></div>
          <div className="Add-New-Family-Member-popup-box">
            <Imgecoverpopup onValue={onValue} />
            <button className="clous-btn" onClick={togglePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.5 0C14.5632 0 0 14.5632 0 32.5C0 50.4367 14.5632 65 32.5 65C50.4367 65 65 50.4367 65 32.5C65 14.5632 50.4367 0 32.5 0ZM27.9013 32.5L18.7103 23.3057C17.4427 22.0382 17.4427 19.9778 18.7103 18.7103C19.9778 17.4427 22.0382 17.4427 23.3057 18.7103L32.5 27.9045L41.691 18.7103C42.9585 17.4427 45.019 17.4427 46.2865 18.7103C47.5573 19.9778 47.5573 22.0382 46.2865 23.3057L37.0955 32.5L46.2865 41.691C47.5573 42.9585 47.5573 45.019 46.2865 46.2865C45.019 47.5573 42.9585 47.5573 41.691 46.2865L32.5 37.0955L23.3057 46.2865C22.0382 47.5573 19.9778 47.5573 18.7103 46.2865C17.4427 45.019 17.4427 42.9585 18.7103 41.691L27.9013 32.5Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="w-100">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100">
            Kies uw omslag
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Selecteer een ontwerp voor de voorkant van uw boek.</h6>
          <div className="main-row-box">
            {images?.map((image, index) => (
              <div className="new-div-box" key={index}>
                <Image
                  src={image.src}
                  thumbnail
                  onClick={() =>
                    handleImageClick(
                      image.background,
                      image.color,
                      image.objectposition,
                      image.objectfit,
                      image.authorposition,
                      image.authormargin,
                      image.authorbackground,
                      image.authorcolor,
                      image.bookpara,
                      image.booktextposition,
                      image.width,
                      image.bookcoverdivimageheight,
                      image.imagemargintop,
                      image.bookcoverdivimageposition,
                      image.bookcoverdivimagepositionright,
                      image.bookcoverdivimagewidth,
                      image.layout,
                      image.cover,
                      image.src,
                      image.logo,
                      image.logoPosition,
                      image.logoMargin,
                      image.hideclass,
                      image.extraFeilds,
                      image.para,
                      image.extraParaPosition,
                      image.extraParaTop,
                      image.extraParaMaxWidth,
                      image.extraParaLeft,
                      image.id,
                      image.usernameText,
                      image.logoTop,
                      image.imagePosition,
                      image.imagePlace,
                      image.lineheight,
                      image.h1width
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer className="w-100 justify-content-between">
          <Button
            style={{
              background: "#ebbb5b",
              border: "none",
              width: "20%",
            }}
            onClick={handleSaveTemplate}
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
            variant="secondary"
            onClick={() => setModalShow(false)}
          >
            Sluiten
          </Button>
        </Modal.Footer>
      </Modal>

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
            Voeg foto, en tekst toe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customize-container">
            <h4 className="modal-title"> Voeg je foto en naam toe</h4>
            <p className="modal-subtitle">
              Personaliseer jouw boek met een eigen titel en omslagafbeelding
            </p>

            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">Titel (max. 20 tekens)</label>
              <input
                type="text"
                className="form-control"
                name="title"
                maxLength="20"
                placeholder=" Verhalen van mij"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            {/* Author Input */}
            <div className="form-group">
              <label className="form-label">Auteur</label>
              <input
                type="text"
                className="form-control"
                maxLength="30"
                name="author"
                placeholder="Wouter"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
              />
            </div>
            {extraClass && (
              <div className="form-group">
                <label className="form-label">Paragraph</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="40"
                  name="author"
                  placeholder="Enter your paragraph"
                  value={para}
                  onChange={(e) => setPara(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Media</label>

              <div
                className="upload-box"
                style={{ height: imageUrl ? "auto" : "150px" }}
              >
                <div className="upload-content">
                  <label
                    // htmlFor="fileUpload"
                    className="upload-content"
                    style={{ cursor: "pointer" }}
                  >
                    {imageUrl ? (
                      <>
                        <A5ImageCropper
                          imageSrc={imageUrl}
                          onCropDone={(croppedImage) => {
                            setCropped(croppedImage);
                            setShowCropper(false);
                          }}
                        />

                        {/* {cropped && <img src={cropped} alt="Cropped A5" />} */}
                      </>
                    ) : (
                      <div htmlFor="fileUpload">
                        <input
                          type="file"
                          className="upload-input"
                          accept="image/*"
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
                  accept=""
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
    </>
  );
};

export default CoverImage;
