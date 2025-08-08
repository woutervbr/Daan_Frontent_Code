import React, { useEffect, useRef, useState } from "react";
import voice from "../assets/voice.png";
import attach from "../assets/attachfile.png";

import Chapters from "../Chapters";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import {
  decrement,
  decrementChapter,
  increment,
  incrementChapter,
  incrementQuestionLimit,
  NavigateQuestionNo,
  resetIncrement,
  resetIncrementNextBtn,
  resetQuestionLimit,
  togglemenu,
} from "../Redux/Features/QuestionsSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl, socketurl } from "../baseUrl";
import { UserChapterQuestionChat } from "../Redux/Features/UserSlice";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import VideoQr from "./Videoqr";
 
const Chat1 = ({ Data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [yes, setyes] = useState(false);

  const socketRef = useRef(null);
  const [user_id, setuserId] = useState("ts111");

  const [Messages, setMessages] = useState([]);
  const [prompt, setprompt] = useState("");

  const QuestionLimitNumber = useSelector(
    (state) => state.questionCounter.questionLimit
  );

  const QuestionNumber = useSelector((state) => state.questionCounter.value);

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );
  const [questionChapterId, setquestionChapterId] = useState(
    `C${ChapterNumber}Q${QuestionNumber}`
  );

  useEffect(() => {
    socketRef.current = io(socketurl);

    socketRef.current.on("get_previous_messages", (previous_messages) => {
      // setMessages((prevmessages)=>[...prevmessages,incomingmessage])

      // console.log("previousmessages",previous_messages)

      setMessages(previous_messages);
      // console.log(previous_messages,Messages)
    });

    socketRef.current.on("chat_message", (incomingmessage) => {
      setMessages((previous_messages) => [
        ...previous_messages,
        incomingmessage,
      ]);
    });

    socketRef.current.on("save_question_answer", (incomingmessage) => {
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      setMessages(incomingmessage);
    });

    socketRef.current.on("save_gpt_answer", (incomingmessage) => {
      setMessages(incomingmessage);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
    });


    socketRef.current.on("save_gpt_answerimg", (incomingmessage) => {
      setMessages(incomingmessage);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
    });

    // socketRef.current.on('save_question_answer',(incomingmessage)=>{

    //    setyes(!yes)

    // })

    // socketRef.current.on('save_gpt_answer',(incomingmessage)=>{

    //   setyes(!yes)

    // })

    return () => {
      socketRef.current.off("chat_message");
      socketRef.current?.off("previous_messages");
      socketRef.current?.off("save_gpt_answer");
      socketRef.current?.off("save_gpt_answerimg");

      socketRef.current?.off("save_question_answer");
      socketRef?.current.disconnect();
    };
  }, []);

  useEffect(() => {

    const user_id = localStorage.getItem("userId");

    // setuserId('674780aab89e88c59257488d');
    if (user_id && questionChapterId) {
      socketRef.current.emit("get_previous_messages", {
        user_id,
        questionChapterId,
      });

      // dispatch(UserChapterQuestionChat({ user_id, questionChapterId }))
    }
  }, [user_id, questionChapterId]);

  // useEffect(() => {
  //   console.log("CHECK FINAL CHAP", ChapterNumber)
  //   if (ChapterNumber+1 > 10) {
  //     console.log("vk")
  //     navigate("/samplebook");
  //     dispatch(resetIncrement());
  //   }
  // }, [yes]);

  const submitHandleIncrement = () => {
    setyes(!yes);

    dispatch(increment());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber + 1}`);

    if (QuestionNumber == 9) {
      dispatch(incrementChapter());
      dispatch(resetIncrementNextBtn());
    }
  };

  const submitHandleDecrement = () => {
    setyes(!yes);
    dispatch(decrement());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber - 1}`);
    if (QuestionNumber == 0) {
      dispatch(decrementChapter());
      // dispatch(resetIncrement())
    }
  };

  const handleSubmitViewQuestionNo = (no) => {

    dispatch(NavigateQuestionNo(no));
  };

  const sendMessage = () => {
    const Message = {
      user_id,
      gpt_id,
      message: prompt,
    };

    // if(prompt.length>0)
    // {
    socketRef.current.emit("chat_message", Message);
    setprompt("");

    // }
    // else{
    //     alert('Please Enter Input')
    // }
  };



  async function getImageFileObject(imageFile) {
    const file = imageFile.file;

    if (file instanceof Blob || file instanceof File) {

      const uploadPreset = "tixx1a8u"


      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);


        const response = await fetch(`${baseUrl}/upload-file`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        // setprompt(data.url)


        handleSendMessageImg(data.s3Url)

      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      console.error("Invalid image file object");
    }

  }

  // console.log(Data.Questions,"DATA QUESTIONS")

  //   const ChatData=useSelector((state)=>state.auth.UserChapterStoryData)

  // console.log(QuestionLimitNumber,"QUESTION LIMIT NO",Messages,ChatData)

  // const handleCheck =()=>{
  //   console.log("TS HANDLE")
  //   dispatch(UserChapterQuestionChat({ user_id, questionChapterId }))
  //   if(ChatData.length>3){

  //     console.log("here")
  //     handleSendGptMessage()
  //   }
  //   else{
  //     handleSendMessage()
  //     console.log("else")
  //   }

  // }

  const handleSendMessage = () => {
     

    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
    };

    socketRef.current.emit("save_question_answer", Message);
    setprompt("");
    dispatch(incrementQuestionLimit());

    if (QuestionLimitNumber > 4) {
      dispatch(resetQuestionLimit());
    }
  };



  const handleSendMessageImg = (url) => {
     

    const userId = localStorage.getItem("userId");
    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: url,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: url,
      LimitNo: QuestionLimitNumber,
    };



    socketRef.current.emit("save_gpt_answerimg", Message);
    setprompt("");
   
  };

  const handleSendGptMessage = () => {
     
    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
    };

    if (socketRef.current) {
      socketRef.current.emit("save_gpt_answer", Message);
      setprompt("");
      dispatch(incrementQuestionLimit());

      if (QuestionLimitNumber > 4) {
        dispatch(resetQuestionLimit());
      }
    }
  };

  return (
    <div className="rightbar-ar">
      <div className="toggle-sidebar-ar">
        <label class="hamburger">
          <input id="checkbox" type="checkbox" onClick={toggleMenu} />
          <svg viewBox="0 0 32 32">
            <path
              class="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
        </label>
        <div className="toggle-head-btn-ar">
          {" "}
          <button className="head-btn-ar active-heading-btn">
           
Op vragen
          </button>
          {/* <button
            onClick={() => navigate("/samplebook")}
            className="head-btn-ar"
          >
          
Voorbeeldboek
          </button> */}
        </div>
      </div>
      {/* <h1>
        QuestioNo:{QuestionNumber}
        ChapterNo:{ChapterNumber}
      </h1> */}
      <div className="right-hs-ar">
        {/* <button>H1 {QuestionNumber}</button>
        <button>H2</button>
        <button>H3</button>
        <button>H4</button>
        <button>H5</button>
        <button>H6</button>
        <button>H7</button>
        <button>H8</button>
        <button>H9   {ChapterNumber}</button>
        <button onClick={submitHandleIncrement}>H10</button> */}

        {Array(10)
          .fill(0)
          .map((e, i) => (
            <button key={i} onClick={() => handleSubmitViewQuestionNo(i)}>
              H{i + 1}
            </button>
          ))}
      </div>
      <div className="right-below-ar">
        <div className="heading-chat-ar">
          <div className="chap-heading-ar">
            {Data.Questions[QuestionNumber]}
          </div>
          <div className="chat-ar">
            {/* <div className="inner-chat-ar">   {Messages &&
              Messages.map((message, index) => (
                <div key={index} className="user-chat-ar">
                  <div
                    className="user-chat-ar-div"
                    style={
                      message.type === "Question"
                        ? { marginLeft: "0px" }
                        : { marginRight: "0px", backgroundColor: "#FAD7A0" }
                    }
                  >
                    {message.message}
                  </div>
                </div>
              ))}</div> */}

          <div className="inner-chat-ar">
            {Messages &&
              Messages.map((message, index) => (
                <div key={index} className="user-chat-ar">
                  <div
                    className="user-chat-ar-div"
                    style={
                      message.type === "Question"
                        ? { marginLeft: "0px" }
                        : { marginRight: "0px", backgroundColor: "#FAD7A0" }
                    }
                  >
                    {/\.(jpeg|jpg|gif|png|webp|svg)$/.test(message.message) ? (
                      <img

                      className="chatimage"
                        src={message.message}
                        alt="Message Image"
                        style={{ maxWidth: "300px" , minWidth:"300px" , borderRadius:"15px", height: "auto" }}
                      />
                    ) : (
                      message.message
                    )}
                  </div>
                </div>
              ))}
          </div>

         
            <div className="input-outer-div">
              <input
                type="text"
                className="message-div-ar"
                placeholder="Vertel hier uw verhaal…"
                value={prompt}
                onChange={(e) => setprompt(e.target.value)}
              />
                                 
              <div className="voice-img-div">


              <div className="voice-img" style={{position:"relative"}}>
                  <img src={attach} alt="" />
                  <ImageUploader
                                      onFileAdded={(img) => getImageFileObject(img)}
                                      
                                    />
                </div>
            
                <div className="voice-img">
                  <img src={voice} alt="" />
                </div>


           
                {Messages.length < 3 && (
                  <button
                    className="chat-send-btn-ar"
                    onClick={() => handleSendMessage()}
                  >
                    <BiSolidSend />
                  </button>
                )}

                {Messages.length >= 3 && (
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    className="chat-send-btn-ar"
                    onClick={() => handleSendGptMessage()}
                  >
                    {/* <span> Ask AI</span> */}

                    <BiSolidSend />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="btns-div-ar">
          <button className="chat-blow-btn-ar" onClick={submitHandleDecrement}>

          Vorige vraag
          </button>
          <button className="chat-blow-btn-ar">
          Afbeeldingen uploaden</button>
          <button className="chat-blow-btn-ar">
          Nee Ai</button>
          <VideoQr Data={Data} />

          {questionChapterId != "C8Q9" && (
            <button
              className="chat-blow-btn-ar"
              onClick={submitHandleIncrement}
            >
            
Volgende vragen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat1;
