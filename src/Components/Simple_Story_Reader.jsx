import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserChat from './UserChat';

const Simple_Story_Reader = ({ chapterId, questionId ,questionText, text }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/chat-module/${questionId}`, {
      state: { questionText: questionText, chapterId: chapterId }
    });
    
  };


  return (
    <section className="Simple_Story_Reader">
      <div className="Simple_Story-main">
      <h1>{questionText || "Vergelijk uw verhalen"}</h1>
        <h5>{text || "Bekijk uw originele antwoorden naast de herschreven versie. Zo ziet u precies wat is aangepast en houdt u altijd de regie over uw eigen verhaal."}</h5>
        {chapterId &&
        <button onClick={handleEditClick} >Verhaal bewerken</button>
      }
      </div>
    </section>
  )
}

export default Simple_Story_Reader