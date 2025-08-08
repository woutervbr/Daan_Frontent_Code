import React, { useEffect, useState } from "react";
import { getChapterH, getUserChapterbyid } from "../Redux/Features/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
} from "../Redux/Features/QuestionsSlice";
import Header from "./Header";
import Overjoucomponet from "./Overjoucomponet";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { ReSubs } from "../context/ReSubsContext";



const Overjou = () => {

  const chapters = [
    {
      num: "01",
    },
    {
      num: "02",
    },
    {
      num: "03",
    },
    {
      num: "04",
    },
    {
      num: "05",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = userDetails?.inviteBy ? userDetails?.inviteBy : userDetails?._id;
 const [states,setStates] = useState({
    storyCount:0,
    totalQues:0
  })
  const [loading, setLoading] = useState();

  const [chaptersdata, setChaptersdata] = useState([]);
  useEffect(() => {
    handleSubmit();
  }, []);

  // const handleSubmit = async (e) => {

  //   const user_id = localStorage.getItem("userId");

  //   const result = await dispatch(getUserChapter(user_id));

  //   console.log(result.payload, "Ussssssk");
  //   setChaptersdata(result.payload.chapters?.staticquestions)
  // }


    useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .post(`${baseUrl}/dashboard`, {
          userId: myCurrId,
        })
        .then((res) => {
          setStates(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
   
    const user_id = localStorage.getItem("userId");
    setLoading(true);

    try {
      const result = await dispatch(getChapterH(myCurrId));

      if (result?.payload.chapters) {
        // If the result has chapters
        setChaptersdata(result?.payload.chapters); // Set the chapters data correctly
      } else {
        console.error("No chapters foundssss:", result);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const setChapters = (chapters) => {
    dispatch(setChangeChapter(chapters));

    navigate("/chat");
  };
  const handleSubmitViewQuestionNo = async (question, chapter) => {
    const chapDto = JSON.parse(localStorage.getItem(chapters));
    if (chapDto) {
      localStorage.removeItem("chapters");
    }
    localStorage.setItem("chapters", JSON.stringify(chapter));
    navigate(`/chat-module/${question?._id}`, {
      state: {
        chatperId: chapter?._id,
        questionText: question,
        chapterData2: chapter,
      },
    });
  };

  const [activeComponent, setActiveComponent] = useState("questionOfWeek");

  const handleHeadingClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
           <h3>Welkom bij uw toekomstige boek </h3>
            <h4>Je hebt {states.storyCount} verhalen geschreven van de {states.totalQues}.</h4>
            {/* <h4>Je hebt {states.storyCount} verhalen geschreven van de 52.</h4> */}
            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  
                  onClick={() => navigate("/dashboard")}
                 
                >
                  een voorproefje van mijn boek
                </h5>
                <h5
                  onClick={() =>  navigate(!isActive ? "#" :`/chapter/${myCurrId}`)}
                  style={
                    {
                      // color: activeComponent === "chapter" ? "#000" : "",
                    }
                  }
                >
                  Hoofdstukken
                </h5>

                <h5
                  onClick={() => navigate(!isActive ? "#" :"/allQuestions")}
                  style={
                    {
                      // color: activeComponent === "allQuestions" ? "#000" : "",
                    }
                  }
                >
                  Alle vragen
                </h5>
                <h5
                  onClick={() => navigate(!isActive ? "#" :"/Overjou")}
                  className="active"
                  style={{
                    color: "#000",
                  }}
                >
                  Mijn familie
                </h5>
                {/* <h5
                  onClick={() => navigate(`/chapterai/${parsedData?._id}`)}
                >
                  With Ai Questions
                </h5> */}
              </div>
              {activeComponent === "allQuestions" && (
                <div className="add-chapter-btn">Voeg nog een vraag toe</div>
              )}
            </div>
            {/* {activeComponent === "questionOfWeek" && <Questionoftheweek />}
          {activeComponent === "chapter" && <Chaptersfuture />}
  
          {activeComponent === "allQuestions" && <AllQuestions />} */}
          </div>

          <div className="chapters-div-ar">
          <Overjoucomponet/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overjou;
