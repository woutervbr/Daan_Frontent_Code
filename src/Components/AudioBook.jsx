import React, { useState, useRef } from "react";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json";
import sideimg from "../../src/assets/memoryimg.png";
import sound from "../../src/assets/sound.png";
import arrowImg from "../../src/assets/arrowImg.png";

import { baseUrl } from "../baseUrl";

const AudioBook = () => {
  const [loading2, setLoading2] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const audioRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const text = `Elke zondag bakte mijn moeder appeltaart. De geur van kaneel en warme appels brengt me nog altijd terug naar die tijd.`;

  const handlePausePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      handleTextToSpeech();
    }
  };

  const handleTextToSpeech = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setLoading2(true);
      const response = await fetch(
        `${baseUrl}/text_to_speach_convert?voiceid=${selectedVoice}`,
        {
          method: "POST",
          body: JSON.stringify({ text: text }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audioRef.current = audio;
        setIsPlaying(true);
        audio.play();

        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };

        setLoading2(false);
      } else {
        setLoading2(false);
        console.error("Error: ", data.error);
      }
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };

  const maleVoices = [
    { id: "Ryan NL", name: "Peter" },
    { id: "Florian NL", name: "Marcelo" },
    { id: "Remy NL", name: "Richard" },
  ];

  const femaleVoices = [
    { id: "Vivienne NL", name: "Monica" },
    { id: "Ava NL", name: "Linda" }, // Corrected to female ID
    { id: "Seraphina NL", name: "Ingrid" },
  ];

  return (
    <div className="new-sec">
      <div className="new-sec-tital">
        <h2>
Uw verhaal, ingesproken als luisterboek</h2>
        <p>
Wilt u uw levensverhaal niet alleen lezen, maar ook beluisteren? Dat kan.
Wij zetten uw geschreven boek om in een professioneel ingesproken luisterboek, met een stem die u zelf kiest.

        </p>
      </div>

      <div className="new-box">
        <div className="new-box-img">
          <img src={sideimg} alt="" />
        </div>

        <div className="new-layout">
          <div className="new-layout-box">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {selectedGender !== null && (
                <span
                  onClick={() => {
                    setSelectedGender(null);
                    setSelectedVoice(null); // optional
                  }}
                  className="back-icon-box"
                >
                  <img src={arrowImg} alt="Back" />
                </span>
              )}
              <h2 style={{ margin: 0 }}>
                {selectedGender === null
                  ? "Kies een stem"
                  : selectedGender === "Male"
                  ? "SELECTEER MANNELIJKE STEM"
                  : "SELECTEER VROUWENSTEM"}
              </h2>
            </div>

            <div className="new-layout-btn-box">
              {selectedGender === null ? (
                <>
                  <button onClick={() => setSelectedGender("Male")}>
  Mannelijk
                  </button>
                  <button onClick={() => setSelectedGender("Female")}>
                    Vrouwelijk
                  </button>
                </>
              ) : selectedGender === "Male" ? (
                <>
                  {maleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      style={{
                        backgroundColor:
                          selectedVoice === voice.id
                            ? "#f39c12"
                            : "transparent",
                      }}
                    >
                      {voice.name}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {femaleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      style={{
                        backgroundColor:
                          selectedVoice === voice.id
                            ? "#f39c12"
                            : "transparent",
                      }}
                    >
                      {voice.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="new-layout-box">
            <h2>Druk op het luidsprekertje om te luisteren</h2>
            <div className="new-layout-para-box">
              {!loading2 ? (
                <div
                 className="new-flex-box"
                  onClick={handlePausePlay}
                >
                  {true ? (
                    // <Player size={45} icon={ICON} />
                    <img src={sound} alt="" />
                  ) : (
                    <div style={{ width: "30px" }}>
                      <Lottie animationData={pause} loop={false} />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ width: "100px" }}>
                  <Lottie animationData={animation} loop={true} />
                </div>
              )}
              <p>
                Elke zondag bakte mijn moeder appeltaart. De geur van kaneel en warme appels brengt me nog altijd terug naar die tijd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioBook;
