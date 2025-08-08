import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import question_line from "../assets/question_line.png";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helvetica/Helvetica.ttf" },
    {
      src: "https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
Font.register({
  family: "Libre Baskerville",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/librebaskerville/LibreBaskerville-Regular.ttf",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/librebaskerville/LibreBaskerville-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/librebaskerville/LibreBaskerville-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Crimson Text",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/crimsontext/CrimsonText-Regular.ttf",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/crimsontext/CrimsonText-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/crimsontext/CrimsonText-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.5,
    backgroundColor: "#FFF",
  },
  page2: {
    padding: 60,
    fontSize: 10,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.5,
    backgroundColor: "#FFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 35,
    marginBottom: 15,
    color: "#000",
    fontFamily: "Libre Baskerville",
  },
  subheading: {
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 15,
    color: "#666",
  },
  // paragraph: {
  //   width: "100%",
  //   fontSize: 10,
  //   textAlign: "center",
  //   marginVertical: 5,
  //   color: "#333",
  //    position: absolute;
  // top: 10px;
  // right: 0px;
  // text-align: center;
  // width: 100%;
  // font-size: 20px;
  // },
  paragraph: {
    width: "100%",
    position: "absolute",
    top: "0px", // Set to 0 to remove top padding/margin
    right: "0px",

    marginVertical: 5,
    fontSize: "10px",
    textAlign: "center",
  },

  messages: {
    width: "100%",
    fontSize: 10,
    textAlign: "left",
    color: "#333",
    fontFamily: "Crimson Text",
  },
  dropCap: {
    fontSize: 22, // Adjust to visually match 2 lines
    lineHeight: 1.2,
    fontFamily: "Crimson Text",
    marginRight: 2,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  tocHeading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#000",
    fontFamily: "Libre Baskerville",
  },
  tocFamilyTreeHeading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
    color: "#000",
    fontFamily: "Libre Baskerville",
  },
  tocList: {
    marginLeft: 15,
    marginBottom: 8,
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tocTitle: {
    fontSize: 10,
    color: "#333",
  },
  tocPage: {
    fontSize: 10,
    color: "#666",
  },
  image: {
    width: "100%",
    maxWidth: 380,
    height: "auto",
    objectFit: "contain",
    alignSelf: "center",
  },
  questionLine: {
    width: "60%",
    objectFit: "contain",
    height: "36px",
    alignSelf: "center",
  },
  contentImages: {
    width: "100%",
    maxWidth: 380,
    height: "auto",
    objectFit: "contain",
    alignSelf: "center",
  },
  imageContainer: {
    width: "100%",
    maxHeight: 400,
    alignItems: "center",
    marginVertical: 10,
  },
  ChapterimageContainer: {
    width: "100%",
    maxHeight: 500,
    alignItems: "center",
    marginVertical: 30,
  },
  questionText: {
    fontSize: 12,
    fontWeight: 1500,
    color: "#000",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Libre Baskerville",
    fontStyle: "italic",
  },
  pageNumber: {
    position: "absolute",
    top: 575,
    fontSize: 8,
    left: 0,
    right: 0,
    paddingRight: "15px",
    textAlign: "right",
    color: "#777",
    width: "100%",
  },
  treeContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  treeLevel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
  },
  treeBox: {
    border: "1px solid #CCC",
    borderRadius: 5,
    padding: 6,
    margin: 3,
    minWidth: 70,
    height: 50,
    textAlign: "center",
    fontSize: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#000",
    alignItems: "center",
  },
});

const MyDocument = ({
  groupedData,
  coverImage,
  writtenBy,
  chapters,
  FamiltreeImg,
  onPageRender,
  chapterPageNumbers,
}) => {
  const prefenses = localStorage.getItem("storyPreference");
  const isValidCoverImage = coverImage && coverImage.trim() !== "";
  const finalImage = isValidCoverImage
    ? coverImage
    : "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png";

  return (    
    <Document>
      {/* Cover Page */}
      <Page size="A5">
        <Image style={styles.coverImage} src={finalImage} />
      </Page>

      {/* Author Page */}
      <Page size="A5" style={styles.page}>
        <Text style={styles.paragraph}>
          Geschreven door{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {writtenBy}
          </Text>
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `Pagina ${pageNumber}`}
          fixed
        />
      </Page>

      {/* Table of Contents */}
      <Page size="A5" style={styles.page}>
        <Text style={styles.tocHeading}>Inhoudsopgave</Text>
        <View style={styles.tocList}>
          {chapters.map((chapter) => {
            if (!chapter.chapterTitle) return null;

            const startPage =
              chapterPageNumbers && chapterPageNumbers[chapter.chapterId]
                ? chapterPageNumbers[chapter.chapterId]
                : "-";

            return (
              <View key={chapter.chapterId} style={styles.tocItem}>
                <Text style={styles.tocTitle}>{chapter.chapterTitle}</Text>
                <Text style={styles.tocPage}>{startPage}</Text>
              </View>
            );
          })}
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `Pagina ${pageNumber}`}
          fixed
        />
      </Page>

      {/* Family Tree Page */}
      {FamiltreeImg && (
        <Page size="A5" style={styles.page}>
          <Text style={styles.tocFamilyTreeHeading}>Mijn familie</Text>
          <Image style={styles.image} src={FamiltreeImg} />
          <Text
            style={styles.pageNumber}
            render={({ pageNumber }) => `Pagina ${pageNumber}`}
            fixed
          />
        </Page>
      )}

      {/* Chapters */}
      {Object.keys(groupedData).map((chapterId) => {
        const chapter = groupedData[chapterId];
        let isFirstMessageOfChapter = true;

        return (
          <React.Fragment key={chapterId}>
            {/* Chapter Title and Image Page */}
            <Page size="A5" style={styles.page}>
              <Text style={styles.heading}>{chapter.chapterTitle}</Text>
              {chapter.chapterTitle !== "Stamboom" && chapter.chapterImage && (
                <View style={styles.ChapterimageContainer} wrap={false}>
                  <Image style={styles.image} src={chapter.chapterImage} />
                </View>
              )}
              <Text
                style={styles.pageNumber}
                render={({ pageNumber }) => {
                  if (onPageRender) {
                    onPageRender(chapterId, pageNumber);
                  }
                  return `Pagina ${pageNumber}`;
                }}
                fixed
              />
            </Page>

            {/* Chapter Content */}
            <Page size="A5" style={styles.page2} wrap>
              {Object.keys(chapter.questions).map((questionId) => {
                const question = chapter.questions[questionId];
                if (!question.messages || question.messages.length === 0)
                  return null;
                const showQuestionText =
                  prefenses === "enhancedStories" ? false : true;
                return (
                  <View key={questionId} wrap={true}>
                    {question.messages.map((message, messageIndex) => (
                      <View key={message._id}>
                        {messageIndex === 0 && showQuestionText && (
                          <View style={{ alignItems: "center", marginBottom: 7 }}>
                            <Text style={styles.questionText}>
                              {question.questionText}
                            </Text>
                            <Image
                              style={styles.questionLine}
                              src={question_line}
                            />
                          </View>
                        )}
                        <View wrap={true}>
                          {message.message &&
                            (() => {
                              const firstLetter = message.message.charAt(0);
                              const rest = message.message.slice(1);

                              // 👇 Apply drop cap only on first message of chapter
                              if (isFirstMessageOfChapter) {
                                isFirstMessageOfChapter = false; // Mark as used
                                return (
                                  <Text style={styles.messages}>
                                    <Text style={styles.dropCap}>
                                      {firstLetter}
                                    </Text>
                                    {rest}
                                  </Text>
                                );
                              }

                              // Normal rendering for other messages
                              return (
                                <Text style={styles.messages}>
                                  {message.message}
                                </Text>
                              );
                            })()}
                        </View>
                        {message.images?.length > 0 && (
                          <View style={styles.imageContainer} wrap={false}>
                            {message.images.map((image, imageIndex) => (
                              <View key={imageIndex} wrap={false}>
                                <Image style={styles.image} src={image} />
                              </View>
                            ))}
                          </View>
                        )}
                        {message.images?.length > 0 && message.title && (
                          <View wrap={true}>
                            <Text
                              style={{
                                fontStyle: "italic",
                                textAlign: "center",
                                fontSize: 10,
                              }}
                            >
                              {message.title}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                );
              })}
              <Text
                style={styles.pageNumber}
                render={({ pageNumber }) => `Pagina ${pageNumber}`}
                fixed
              />
            </Page>
          </React.Fragment>
        );
      })}
    </Document>
  );
};

export default MyDocument;
