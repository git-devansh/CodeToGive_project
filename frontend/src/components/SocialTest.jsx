import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import Navbar from "./Navbar/Navbar";
const appId = "aff93c10-48d7-4d7b-9790-46f65f4875f1";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export const SocialTest = (props) => {
  const navigate = useNavigate();
  const [curDescription, setCurDescription] = useState("");
  const [tracker, setTracker] = useState(0);
  useEffect(() => {
    props.setDescriptions([]);
  }, []);
  useEffect(() => {
    resetTranscript();
  }, [tracker]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const submitDescription = () => {
    props.setDescriptions((prev) => [
      ...prev,
      {
        question: props.data[tracker].question,
        image: props.data[tracker].imageUrl,
        answer: curDescription,
      },
    ]);
    console.log(props.descriptions);
    setTracker((prev) => prev + 1);
    console.log(tracker);
    setCurDescription("");
  };
  console.log(props.data[1]);
  //go back to homepage after finishing the test (when tracker reaches to last image)
  if (tracker === props.data.length) {
    fetch("http://localhost:5000/create-invoice", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: props.descriptions,
      }),
    });
    props.setIsStart(true);
    navigate(`/${props.testLink}`);
  }
  return (
    <>
      <Navbar pagetype="Social Test" />
      <div className="container_SocialTest">
        <section className="section_SocialTest">
          <h4 className="question_num_SocialTest add_flex1">
            Question {tracker + 1}/{props.data.length}
          </h4>
          <h1 className="question_SocialTest add_flex1">
            {props.data[tracker].question}
          </h1>
          <div className="image_box_SocialTest">
            <img
              className="image_SocialTest add_flex1"
              alt="for the social situation"
              src={props.data[tracker].imageUrl}
            />
          </div>
          <textarea
            value={curDescription.length > 0 ? curDescription : transcript}
            onChange={(e) => setCurDescription(e.target.value)}
            className="textarea_multiline_SocialTest add_flex1"
            name="Text1"
            rows="8"
            placeholder="Describe yourself here..."
          ></textarea>
          <button
            className="button_style_SocialTest add_flex1"
            onClick={submitDescription}
          >
            Next
          </button>
          <button
            className="button_style_SocialTest add_flex1"
            onClick={SpeechRecognition.startListening}
          >
            Record
          </button>
        </section>
      </div>
    </>
  );
};
export default SocialTest;
