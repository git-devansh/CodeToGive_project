import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

let dataTest4 = [
  {
    queNum: 1,
    question:
      "iffff is a long established fact that a reader will be distracted by the readable content of a page",
  },
  {
    queNum: 2,
    question:
      "It is a long established fact that a reader will be distracted by the readable content of a page",
  },
];

function MotivationTest(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.setMotivations([]); //clears everytime we do a new test
  }, []);

  const handleOnFieldChange = (e, index) => {
    dataTest4[index].answer = e.target.value;
    console.log(e.target.value);
    props.setMotivations((prev) => [
      ...prev,
      { question: dataTest4[index].question, answer: e.target.value },
    ]);
  };

  const handleSubmit = () => {
    props.setIsStart2(true);
    navigate(`/${props.testLink}`);
  };

  return (
    <>
      <Navbar pagetype="Motivation Test" />
      <div className="motivation_conatiner_style">
        <section className="motivation__testcard_style">
          <h4>Please read the instructions and answer the below questions.</h4>
          <p className="instructions_test4_style">
            There are 45 statements, all connected to work. The applicant must
            indicate on a 1-5 scale, how important they find each statement as
            it relates to themselves.
          </p>
          {dataTest4.map((test4Item, index) => (
            <fieldset
              name={index}
              value={index}
              key={test4Item.queNum}
              className="fieldset_question_style"
              onChange={(e) => handleOnFieldChange(e, index)}
            >
              <legend className="question_motivation_test">
                Q{test4Item.queNum}) {test4Item.question}
              </legend>
              <p>
                <input name={`level${index}`} type="radio" value="1" />
                <label htmlFor="1">1</label>
              </p>
              <p>
                <input name={`level${index}`} type="radio" value="2" />
                <label htmlFor="2">2</label>
              </p>
              <p>
                <input name={`level${index}`} type="radio" value="3" />
                <label htmlFor="3">3</label>
              </p>
              <p>
                <input name={`level${index}`} type="radio" value="4" />
                <label htmlFor="4">4</label>
              </p>
              <p>
                <input name={`level${index}`} type="radio" value="5" />
                <label htmlFor="5">5</label>
              </p>
            </fieldset>
          ))}
          <button
            className="button_style_SocialTest add_flex1"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
      </div>
    </>
  );
}

export default MotivationTest;
