// import React, { useEffect, useState } from "react";

// const A5Page = ({ chapter ,pageCounter}) => {
//   const [pages, setPages] = useState([]);
//   const A5_HEIGHT = 210; // Fixed height of 210mm per page
//   const PADDING = 80; // 80px top + bottom padding
//   const PX_TO_MM = 3.78; // Approximate conversion: 1mm ≈ 3.78px
//   const AVAILABLE_HEIGHT = A5_HEIGHT - PADDING / PX_TO_MM; // Available height for content

//   // Estimate content height (in mm)
//   const estimateContentHeight = (content, isQuestionText = false) => {
//     let height = 0;

//     // Text height: Assume 1000 chars ≈ 100mm
//     if (isQuestionText) {
//       height += (content.length / 1000) * 100;
//     } else {
//       const message = content.message || "";
//       height += (message.length / 1000) * 100;

//       // Image height: Assume 100mm per image
//       if (content.images?.length) {
//         height += content.images.length * 100;
//       }

//       // Video height: Assume 20mm per video link
//       if (content.videos?.length) {
//         height += content.videos.length * 20;
//       }
//     }

//     return height;
//   };

//   // Split text if it exceeds remaining page height
//   const splitText = (text, remainingHeight) => {
//     const charsPerMm = 1000 / 100; // 10 chars per mm
//     const maxChars = Math.floor(remainingHeight * charsPerMm);
//     if (text.length <= maxChars) return { text, remainder: "" };

//     return {
//       text: text.slice(0, maxChars),
//       remainder: text.slice(maxChars),
//     };
//   };

//   useEffect(() => {
//     const groupedPages = [];
//     let currentPage = [];
//     let currentHeight = 0;

//     Object.keys(chapter.questions).forEach((questionId) => {
//       const question = chapter.questions[questionId];
//       const showQuestionText =
//         localStorage.getItem("storyPreference") !== "enhancedStories";

//       question.messages.forEach((message, messageIndex) => {
//         // Handle question text for the first message
//         if (messageIndex === 0 && showQuestionText) {
//           const questionTextHeight = estimateContentHeight(question.questionText, true);
//           if (currentHeight + questionTextHeight > AVAILABLE_HEIGHT) {
//             if (currentPage.length > 0) {
//               groupedPages.push(currentPage);
//             }
//             currentPage = [
//               {
//                 type: "questionText",
//                 content: question.questionText,
//                 showQuestionText: true,
//               },
//             ];
//             currentHeight = questionTextHeight;
//           } else {
//             currentPage.push({
//               type: "questionText",
//               content: question.questionText,
//               showQuestionText: true,
//             });
//             currentHeight += questionTextHeight;
//           }
//         }

//         // Process the entire message
//         let remainingMessage = message.message || "";
//         let remainingImages = [...(message.images || [])];
//         let remainingVideos = [...(message.videos || [])];

//         while (remainingMessage || remainingImages.length > 0 || remainingVideos.length > 0) {
//           let contentToAdd = { message: "", images: [], videos: [], title: message.title };
//           let contentHeight = 0;

//           // Add text
//           if (remainingMessage) {
//             const textHeight = (remainingMessage.length / 1000) * 100;
//             if (currentHeight + textHeight <= AVAILABLE_HEIGHT) {
//               contentToAdd.message = remainingMessage;
//               remainingMessage = "";
//               contentHeight += textHeight;
//             } else {
//               const remainingHeight = AVAILABLE_HEIGHT - currentHeight;
//               const { text, remainder } = splitText(remainingMessage, remainingHeight);
//               contentToAdd.message = text;
//               remainingMessage = remainder;
//               contentHeight += (text.length / 1000) * 100;
//             }
//           }

//           // Add images
//           while (remainingImages.length > 0 && currentHeight + contentHeight + 100 <= AVAILABLE_HEIGHT) {
//             contentToAdd.images.push(remainingImages[0]);
//             remainingImages = remainingImages.slice(1);
//             contentHeight += 100;
//           }

//           // Add videos
//           while (remainingVideos.length > 0 && currentHeight + contentHeight + 20 <= AVAILABLE_HEIGHT) {
//             contentToAdd.videos.push(remainingVideos[0]);
//             remainingVideos = remainingVideos.slice(1);
//             contentHeight += 20;
//           }

//           // Add the content to the current page
//           if (contentToAdd.message || contentToAdd.images.length > 0 || contentToAdd.videos.length > 0) {
//             currentPage.push({
//               type: "message",
//               content: contentToAdd,
//               showQuestionText: false,
//             });
//             currentHeight += contentHeight;
//           }

//           // If there's remaining content, start a new page
//           if (remainingMessage || remainingImages.length > 0 || remainingVideos.length > 0) {
//             if (currentPage.length > 0) {
//               groupedPages.push(currentPage);
//             }
//             currentPage = [];
//             currentHeight = 0;
//           }
//         }
//       });
//     });

//     // Push the last page if it has content
//     if (currentPage.length > 0) {
//       groupedPages.push(currentPage);
//     }
//     setPages(groupedPages);
//   }, [chapter]);

//   return (
//     <div>
//       {pages.map((pageContent, pageIndex) => (
//         <div
//           key={pageIndex}
//           className="a5-page"
//           style={{
//             width: "188mm",
//             height: "210mm",
//             padding: "80px 40px",
//             backgroundColor: "white",
//             boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//             marginBottom: "20px",
//             pageBreakAfter: "always",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//             overflow: "hidden",
//           }}
//         >
//           {pageContent.map((item, idx) => (
//             <div key={`${pageIndex}-${idx}`}>
//               {item.type === "questionText" && item.showQuestionText && (
//                 <div className="question-text">
//                   <p style={{ fontWeight: "bold", textAlign: "center" }}>
//                     {item.content}
//                   </p>
//                 </div>
//               )}
//               {item.type === "message" && (
//                 <>
//                   {item.content.message && (
//                     <div className="text-content">
//                       <p>{item.content.message}</p>
//                     </div>
//                   )}
//                   {item.content.images?.length > 0 && (
//                     <div className="image-content">
//                       {item.content.images.map((image, imageIndex) => (
//                         <div key={imageIndex}>
//                           <img
//                             src={image}
//                             alt={`Image ${imageIndex + 1}`}
//                             className="message-image"
//                           />
//                           {item.content?.title && (
//                             <p style={{ textAlign: "center" }}>{item.content.title}</p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {item.content.videos?.length > 0 && (
//                     <div className="video-content">
//                       {item.content.videos.map((video, videoIndex) => (
//                         <div key={videoIndex} className="video-wrapper">
//                           <a href={video} target="_blank" rel="noopener noreferrer">
//                             Watch Video {videoIndex + 1}
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))}
//           <p className="page-name">
//             Pagina <span>{pageCounter.current++}</span>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default A5Page;



import React, { useState, useEffect } from 'react';

const A5Page = ({ chapter, pageCounter }) => {
  const [pages, setPages] = useState([]);
  const A5_HEIGHT_MM = 230;
  const PX_PER_MM = 3.78;
  const A5_HEIGHT_PX = A5_HEIGHT_MM * PX_PER_MM;
  const PADDING_PX = 50; // Equal padding on all sides
  const CONTENT_HEIGHT_PX = A5_HEIGHT_PX - PADDING_PX * 2;
  const PAGE_NUMBER_HEIGHT = 20;
  const MIN_BOTTOM_SPACE = PADDING_PX; // Minimum bottom padding

  const calculateTextHeight = (text) => {
    const avgCharsPerLine = 80;
    const lineHeightPx = 21.5;
    const lines = Math.ceil(text.length / avgCharsPerLine);
    return lines * lineHeightPx;
  };

  const calculateImageHeight = (title = "") => {
    const baseHeight = 100 * PX_PER_MM;
    const titleHeight = title ? calculateTextHeight(title) + 16 : 0;
    return Math.min(baseHeight + titleHeight, CONTENT_HEIGHT_PX * 0.8);
  };

  const paginateContent = () => {
    const newPages = [];
    let currentPage = [];
    let currentHeight = 0;
    const showQuestionText = localStorage.getItem("storyPreference") !== "enhancedStories";

    const findNaturalSplitPoint = (text, maxChars) => {
      if (text.length <= maxChars) return text.length;
      const breakPoints = [
        { char: '\n\n', minPos: 0.5 },
        { char: '. ', minPos: 0.7 },
        { char: '! ', minPos: 0.7 },
        { char: '? ', minPos: 0.7 },
        { char: ', ', minPos: 0.7 },
        { char: '; ', minPos: 0.7 },
        { char: ' ', minPos: 0.7 }
      ];
      for (const bp of breakPoints) {
        const splitPoint = text.lastIndexOf(bp.char, maxChars);
        if (splitPoint > maxChars * bp.minPos) return splitPoint + bp.char.length;
      }
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
        const remainingSpace = CONTENT_HEIGHT_PX - currentHeight - MIN_BOTTOM_SPACE;
        if (remainingSpace <= 0) {
          startNewPageIfNeeded();
          continue;
        }

        const textHeight = calculateTextHeight(remainingText);
        if (textHeight <= remainingSpace) {
          currentPage.push({ type: "message", content: { message: remainingText } });
          currentHeight += textHeight;
          return "";
        }

        const charsPerPixel = remainingText.length / textHeight;
        const charsThatFit = Math.floor(remainingSpace * charsPerPixel);
        const splitPoint = findNaturalSplitPoint(remainingText, charsThatFit);
        const textToAdd = remainingText.substring(0, splitPoint).trim();

        if (textToAdd) {
          currentPage.push({ type: "message", content: { message: textToAdd } });
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
          if (currentHeight + questionHeight > CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE) {
            startNewPageIfNeeded();
          }

          const textToAdd = remainingQuestion.length <= 200 
            ? remainingQuestion 
            : remainingQuestion.substring(0, findNaturalSplitPoint(remainingQuestion, 200));

          currentPage.push({ type: "questionText", content: textToAdd });
          currentHeight += calculateTextHeight(textToAdd);
          remainingQuestion = remainingQuestion.substring(textToAdd.length).trim();
          if (remainingQuestion) startNewPageIfNeeded();
        }
      }

      question.messages.forEach((message) => {
        let remainingMessage = message.message || "";
        const images = [...(message.images || [])];
        const title = message.title || "";

        if (remainingMessage) {
          remainingMessage = handleTextOverflow(remainingMessage);
        }

        images.forEach((image, imgIdx) => {
          const imageHeight = calculateImageHeight(imgIdx === images.length - 1 ? title : "");
          
          if (currentHeight + imageHeight > CONTENT_HEIGHT_PX - MIN_BOTTOM_SPACE) {
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

          if (remainingMessage) {
            remainingMessage = handleTextOverflow(remainingMessage, true);
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
          content: { height: remainingSpace }
        });
      }
      newPages.push(currentPage);
    }

    setPages(newPages);
  };

  useEffect(() => {
    paginateContent();
  }, [chapter]);

  return (
    <div>
      {pages.map((pageContent, pageIndex) => (
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
          {/* Page number */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              width: "85%",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            Pagina <span style={{ fontWeight: 700 }}>{pageCounter + pageIndex}</span>
          </div>

          {/* Main content area */}
          <div style={{ 
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            {pageContent.map((item, idx) => (
              <div key={`${pageIndex}-${idx}`} style={{ flexShrink: 0 }}>
                {item.type === "questionText" && (
                  <p style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "18px",
                    marginBottom: "16px",
                  }}>
                    {item.content}
                  </p>
                )}

                {item.type === "message" && (
                  <>
                    {item.content.message && (
                      <p style={{
                        fontSize: "15px",
                        lineHeight: "1.5",
                        textAlign: "justify",
                        hyphens: "auto",
                        marginBottom: "16px",
                      }}>
                        {item.content.message}
                      </p>
                    )}

                    {item.content.images?.map((image, imgIdx) => (
                      <div key={imgIdx} style={{
                        margin: "16px 0",
                        textAlign: "center",
                        pageBreakInside: "avoid",
                      }}>
                        <img
                          src={image}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            maxHeight: "95mm",
                            objectFit: "contain",
                          }}
                        />
                        {item.content.title && (
                          <p style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            marginTop: "8px",
                          }}>
                            {item.content.title}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {item.type === "spacer" && (
                  <div style={{ height: `${item.content.height}px` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A5Page;
