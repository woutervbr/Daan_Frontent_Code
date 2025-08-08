import React, { useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const SendBookToPrint = () => {
  const [treeImageUrl, setTreeImageUrl] = useState(null);
  const [groupedData, setgroupedData] = useState(() => {
    const stored = localStorage.getItem("groupedData");
    return stored ? JSON.parse(stored) : null;
  });
  const [chaptersPDF, setchaptersPDF] = useState(() => {
    const stored = localStorage.getItem("chaptersPDF");
    return stored ? JSON.parse(stored) : null;
  });
  const writtenBy = localStorage.getItem("title");
  const coverImage = localStorage.getItem("image");
  const [chapterPageNumbers, setChapterPageNumbers] = useState({});

      const getFamilytreeImage = async () => {
        const currentUser = JSON.parse(localStorage.getItem("currentuser"));
        const myCurrId = currentUser?.inviteBy
          ? currentUser?.inviteBy
          : currentUser?._id;

        try {
          const response = await axios.get(`${baseUrl}/tree-image/${myCurrId}`);
          const { alreadyUpload } = response.data;
          if (alreadyUpload && alreadyUpload.image) {
            setTreeImageUrl(alreadyUpload.image);
          }
        } catch (error) {
          console.error(
            "Error checking existing image:",
            error.response?.data || error.message
          );
        }
      };

  useEffect(() => {
    getFamilytreeImage();
  }, []);

  // First pass to collect page numbers
  const collectPageNumbers = async () => {
    const tempChapterPageNumbers = {};
    const handlePageRender = (chapterId, pageNumber) => {
      if (chapterId && !tempChapterPageNumbers[chapterId]) {
        tempChapterPageNumbers[chapterId] = pageNumber;
      }
    };

    // Render the document to a buffer to collect page numbers
    const doc = (
      <MyDocument
        groupedData={groupedData}
        coverImage={coverImage}
        writtenBy={writtenBy}
        chapters={chaptersPDF}
        FamiltreeImg={treeImageUrl}
        onPageRender={handlePageRender}
      />
    );

    try {
      // Render to a buffer (this triggers the onPageRender callback)
      await pdf(doc).toBuffer();
      setChapterPageNumbers(tempChapterPageNumbers);
    } catch (error) {
      console.error("Error collecting page numbers:", error);
    }
  };

  useEffect(() => {
    if (groupedData && coverImage && writtenBy && chaptersPDF && treeImageUrl) {
      collectPageNumbers();
    }
  }, [groupedData, coverImage, writtenBy, chaptersPDF, treeImageUrl]);
  
  return (
    <div className="View-final-pdf">
      <h2>View Your final book in pdf format.</h2>
      <span>
        <p>Click to Download the pdf</p>
        {Object.keys(chapterPageNumbers).length > 0 && (
          <PDFDownloadLink
            document={
              <MyDocument
                groupedData={groupedData}
                coverImage={coverImage}
                writtenBy={writtenBy}
                chapters={chaptersPDF}
                FamiltreeImg={treeImageUrl}
                chapterPageNumbers={chapterPageNumbers}
              />
            }
            fileName="storybook.pdf"
            style={{ textDecoration: "none" }}
          >
          {({ blob, url, loading, error }) => (
          <button disabled={loading}>
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
          </PDFDownloadLink>
        )}
      </span>
     </div>
    // <></>
  );
};

export default SendBookToPrint;
