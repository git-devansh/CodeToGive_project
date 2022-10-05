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
  useEffect(() => {
    props.setDescriptions([]);
  }, []);

  const navigate = useNavigate();

  const [curDescription, setCurDescription] = useState("");

  const [tracker, setTracker] = useState(0);

  const pics = [
    "https://www.ragerlawoffices.com/wp-content/uploads/2017/06/Is-my-boss-yelling-at-me-a-hostile-work-environment.jpg",
    "https://www.jobs.ca/content/uploads/2019/09/exhausted-employees.jpg",
    "https://us.res.keymedia.com/files/image/iStock-employee-lunch-break-930x558.jpg",
  ];

  const submitDescription = () => {
    props.setDescriptions((prev) => [...prev, curDescription]);
    console.log(props.descriptions);
    setTracker((prev) => prev + 1);
    console.log(tracker);
    setCurDescription("");
  };

  useEffect(() => {
    if (tracker === pics.length) {
      props.setIsStart(true);
      navigate(-1);
    }
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

  return (
    <>
      <Navbar pagetype="Social Test" />
      <div className="container_SocialTest">
        <section className="section_SocialTest">
          <h4 className="question_num_SocialTest add_flex1">Question 1/10</h4>
          <h1 className="question_SocialTest add_flex1">Describe the image</h1>
          <div className="image_box_SocialTest">
            <img
              className="image_SocialTest add_flex1"
              src={pics[tracker]}
              alt="for the social situation"
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
