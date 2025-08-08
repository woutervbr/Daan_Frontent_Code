import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Successfulpic from "../assets/Successful.png";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import MyDocument from "../Components/MyDocument";
import { ReSubs } from "../context/ReSubsContext";

const Successful = () => {
  const [status, setstatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfLocation, setPdfLocation] = useState(false);
  const [pdfUrl, setPdfURl] = useState(null);
  const [treeImageUrl, setTreeImageUrl] = useState(null);
  const [chapterPageNumbers, setChapterPageNumbers] = useState({});

  const [paidStatus, SetPaidStatus] = useState({
    status: "",
    message: "",
  });
  const params = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mobilleId = queryParams.get("mobilleId");
  const orderId = queryParams.get("orderId");
  const orderComp = queryParams.get("orderComp");

  const groupedData = JSON.parse(localStorage.getItem("groupedData")) || null;
  const chaptersPDF = JSON.parse(localStorage.getItem("chaptersPDF")) || null;
  const writtenBy = localStorage.getItem("title");
  const selectedImages = localStorage.getItem("image");
  const { setIsActive, isActive, setOpenToBlock } = ReSubs();

  useEffect(() => {
    if (!isActive || isActive) {
      setOpenToBlock(false);
    }
  }, []);
  const getFamilytreeImage = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    const myCurrId = currentUser?.inviteBy
      ? currentUser?.inviteBy
      : currentUser?._id;

    // Check if the image URL already exists on the backend
    try {
      const response = await axios.get(`${baseUrl}/tree-image/${myCurrId}`);
      const { alreadyUpload } = response.data;
      if (alreadyUpload && alreadyUpload.image) {
        setTreeImageUrl(alreadyUpload.image);
        return alreadyUpload.image;
      }
    } catch (error) {
      console.error(
        "Error checking existing image:",
        error.response?.data || error.message
      );
    }
  };

  // Function to collect page numbers
  const collectPageNumbers = async () => {
    const tempChapterPageNumbers = {};
    const handlePageRender = (chapterId, pageNumber) => {
      if (chapterId && !tempChapterPageNumbers[chapterId]) {
        tempChapterPageNumbers[chapterId] = pageNumber;
      }
    };

    const doc = (
      <MyDocument
        groupedData={groupedData}
        coverImage={selectedImages}
        writtenBy={writtenBy}
        chapters={chaptersPDF}
        FamiltreeImg={treeImageUrl}
        onPageRender={handlePageRender}
      />
    );

    try {
      await pdf(doc).toBuffer();
      setChapterPageNumbers(tempChapterPageNumbers);
    } catch (error) {
      console.error("Error collecting page numbers:", error);
    }
  };

  // Function to send the book to print (moved from SendBookToPrint)
  const handleSendToPrint = async () => {
    setPdfLocation(true);
    try {
      await collectPageNumbers();

      // Generate the PDF blob
      const blob = await pdf(
        <MyDocument
          groupedData={groupedData}
          coverImage={selectedImages}
          writtenBy={writtenBy}
          chapters={chaptersPDF}
          FamiltreeImg={treeImageUrl}
          chapterPageNumbers={chapterPageNumbers}
        />
      ).toBlob();

      // Upload the PDF to Cloudinary
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", blob, "book.pdf");

      formDataCloudinary.append("upload_preset", "n1qpwtzo");
      const cloudinaryResponse = await axios.post(
        `${baseUrl}/upload-file`,
        formDataCloudinary
      );

      // const pdfFileUrl = cloudinaryResponse.data.secure_url;

      // const pdfFileUrl = 'https://res.cloudinary.com/ddaif35tp/image/upload/v1744122784/xqz32fueac2pd18ovwbb.pdf';

      const pdfFileUrl = cloudinaryResponse.data?.s3Url; // or .secure_url if from Cloudinary
      setPdfURl(pdfFileUrl);
      // Send the PDF URL and cover image URL to the backend
      const res = await axios.post(`${baseUrl}/send-to-print`, {
        pdfFileUrl,
        coverImageUrl: selectedImages,
        orderId: orderId,
      });
      const userDetails = res?.data?.user;
      setIsActive(Boolean(userDetails?.isActive));

      localStorage.setItem("currentuser", JSON.stringify(userDetails));
    } catch (err) {
      console.error("Error sending book to print:", err);
    } finally {
      setPdfLocation(false);
    }
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/payment-success?id=${mobilleId}&orderId=${orderId}`
      );
      const data = response.data;
      setstatus(data?.paid);
      setLoading(false);
      SetPaidStatus({ status: data?.paidStatus, message: data?.message });
      handleSendToPrint();
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("covertype");
      localStorage.removeItem("image");
      setLoading(false);
      localStorage.removeItem("cartId");
    }
  };

  useEffect(() => {
    if (pdfUrl && pdfLocation === false) {
      navigate("/dashboard");
    }
  }, [pdfLocation]);

  // useEffect(() => {
  //    getFamilytreeImage();
  //   fetch();
  // }, []);

  useEffect(() => {
    const handleSequentialCalls = async () => {
      try {
        // First, call getFamilytreeImage and wait for it to complete
        await getFamilytreeImage();

        // Only proceed to fetch if getFamilytreeImage succeeds
        if (orderComp && orderComp == "true") {
          handleSendToPrint();
          setstatus(true);
          SetPaidStatus({ status: "paid" });
          setLoading(false);
        } else {
          await fetch();
        }
      } catch (error) {
        console.error("Error in sequential calls:", error);
      }
    };

    const timer = setTimeout(() => {
      handleSequentialCalls();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="Successful">
        <div className="Successful-main">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {status && <img src={Successfulpic} alt="" />}
              {orderComp == "true" ? (
                <h2>Order Placed Successful</h2>
              ) : (
                <h2>
                  {status ? "Betaling geslaagd" : "Betaling niet geslaagd"}
                </h2>
              )}
              <br />
              {/* {pdfLocation && (
                <div className="loader-pdf">
                  <p>Pdf Printing...</p>
                </div>
              )} */}
              <p>{paidStatus.status !== "paid" ? paidStatus.message : ""}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Successful;
