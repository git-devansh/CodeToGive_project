import React, { useState } from "react";

function MotivationTestAdmin(props) {
  const handleAddNew = (e) => {
    //devansh you aren't adding any new question in this funciton

    props.setQuestionList2([
      ...props.questionList2,
      { question: "", queNum: "" },
    ]);
    console.log(props.questionList2);
  };

  const handleQuestionChange = (event, index) => {
    const inputData = [...props.questionList2];
    inputData[index].question = event.target.value;
    props.setQuestionList2(inputData);
    // console.log(questionList);
  };

  const handleDelete = (index) => {
    const deleteValue = [...props.questionList2];
    deleteValue.splice(index, 1);
    props.setQuestionList2(deleteValue);
  };

  const validationOnSubmit = (questionList) => {
    for (var i = 0; i < questionList.length; ++i) {
      if (questionList[i].question === "") {
        return false;
      }
    }
    return true;
  };

  console.log(props.questionList2);

  const handleSubmit = (e) => {
    Array.from(props.questionList2).forEach(function (ele, i) {
      ele.queNum = i + 1;
    });

    if (
      validationOnSubmit(props.questionList2) &&
      props.questionList2.length !== 0
    ) {
      for (let i = 0; i < props.questionList2.length; i++) {
        fetch("http://localhost:5000/motivations/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: props.questionList2[i].question,
          }),
        });
      }
    }
  };
  //fuck we should do it as props
  return (
    <>
      {props.questionList2.length ? (
        props.questionList2.map((questionItem, index) => (
          <div className="socialsituationbox" key={index}>
            <h4 className="question-h3-text">Question {index + 1}</h4>
            <p>Add the question</p>
            <input
              key={index}
              type="text"
              name="question"
              className="textinput"
              placeholder="Example: Describe the image below"
              onChange={(e) => handleQuestionChange(e, index)}
              // defaultValue="Describe the image below"
              value={questionItem.question || ""}
            />
            <button
              className="remove-btn-myadmin noselect"
              onClick={() => handleDelete(index)}
            >
              <span className="text">Delete</span>
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          </div>
        ))
      ) : (
        <p className="no_question_myadmin_p">
          There are no questions. Click on + to add new questions.
        </p>
      )}
      <button
        onClick={() => handleAddNew()}
        className="icon-btn-myadmin add-btn-myadmin"
      >
        <div className="add-icon"></div>
        <div className="btn-txt">Add Question</div>
      </button>
      <br />
      <button className="save-myadmin-btn">
        <span
          onClick={(event) => handleSubmit(event)}
          className="button_top-myadmin"
        >
          {" "}
          Save
        </span>
      </button>
    </>
  );
}

export default MotivationTestAdmin;
