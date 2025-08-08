import React, { useState } from "react";
import { Button, Modal, Card, Input, message } from "antd";
import Lottie from "lottie-react";
import image from "../../assets/Lottie.json";
import image2 from "../../assets/Animation -1741195038350.json";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import note1 from "../../assets/note1.png";
import note2 from "../../assets/note2.png";
import { ReSubs } from "../../context/ReSubsContext";
const AddQuestionModal = ({
  open,
  handelCancle,
  handleQuestionSubmit,
  questionText,
  setQuestionText,
  chapterId,
  chapterName
}) => {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const { isActive,setOpenToBlock } = ReSubs();
  
  const navigate = useNavigate();
  const handleAddQuestionClick = () => {
    setIsAddingQuestion(true);
  };

  const handleExploreQuestion = () => {
    navigate("/exploreQuestion", {
      state: { chapterId: chapterId._id, chapterName: chapterName },
    });
  };
  return (
    <Modal
      title={<div style={{ textAlign: "center", fontWeight: "bold", fontSize: '20px', fontFamily: " 'Solway', serif" }}>Voeg een vraag toe</div>}
      open={open}
      onCancel={handelCancle}
      footer={null}
      centered
      width={600}
      backgroun= '#FFFAF0'
      bodyStyle={{ backgroundColor: "#FFFAF0" }}
      style={{ backgroundColor: '#FFFAF0' }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* First Card */}
        <Card
          hoverable
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            background: '#FFFAF0'
          }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ width: "30%" }}  className="icon-box-new">
            {/* <Lottie animationData={image} loop={true} /> */}
            <img src={note2} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "70%",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }} className="Eigen">
              <PlusCircleOutlined style={{ marginRight: "8px" }} />
             Eigen vraag toevoegen
            </div>
            <div style={{ color: "#666" }} className="Wilt">
              Wilt u zelf een vraag toevoegen? Dat kan heel eenvoudig.

            </div>
            {isAddingQuestion ? (
              <>
                <Input.TextArea
                  rows={4}
                  placeholder="Typ hier uw vraag
"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  style={{ marginTop: "10px" }}
                />
                <Button
                disabled={!isActive}
                  className="ModalAddQuestion"
                  onClick={handleQuestionSubmit}
                  style={{ marginTop: "10px", width: "50  %" }}
                >
       Vraag toevoegen

                </Button>
              </>
            ) : (
              <Button
              disabled={!isActive}

                className="ModalAddQuestion"
                onClick={handleAddQuestionClick}
                style={{ marginTop: "10px", width: "50%" }}
              >
                Vraag toevoegen

              </Button>
            )}
          </div>
        </Card>

        {/* Second Card */}
        <Card
          hoverable
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            background: '#FFFAF0'
          }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ width: "30%" }} className="icon-box-new">
            {/* <Lottie animationData={image2} loop={true} /> */}
            <img src={note1} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "70%",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }} className="Eigen ">
              <SearchOutlined style={{ marginRight: "8px" }} />
             Bekijk nieuwe vragen

            </div>
            <div style={{ color: "#666" }}>
         Op zoek naar inspiratie? Ontdek onze vragenbibliotheek

            </div>
            <Button
            disabled={!isActive}
               className="ModalAddQuestion"
              type="default"
              style={{ marginTop: "10px", width: "50%", padding: "20px" }}
              onClick={handleExploreQuestion}
            >
              Bekijk vragen
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
