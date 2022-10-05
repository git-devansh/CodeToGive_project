import React, { useState } from "react";

function SocialSituations() {
  const [questionList, setQuestionList] = useState([
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
  ]);

  const handleAddNew = () => {
    setQuestionList([...questionList, { question: "", imageData: "" }]);
    console.log(questionList);
  };

  const onInputFileChange = (event, index) => {
    const inputData = [...questionList];
    inputData[index].imageData = event.target.files[0];
    setQuestionList(inputData);
    console.log(questionList);
  };

  const handleQuestionChange = (event, index) => {
    const inputData = [...questionList];
    inputData[index].question = event.target.value;
    setQuestionList(inputData);
    // console.log(questionList);
  };

  const handleDelete = (index) => {
    const deleteValue = [...questionList];
    deleteValue.splice(index, 1);
    setQuestionList(deleteValue);
  };

  const handleSubmit = (e) => {
    if (validationOnSubmit(questionList) && questionList.length !== 0) {
      fetch("http://localhost:5000/questions/delete-all-quesitons", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        const formData = new FormData();
        const url = "https://api.cloudinary.com/v1_1/dmzkkz5jf/image/upload";

        for (let i = 0; i < questionList.length; i++) {
          let file = questionList[i].imageData;
          formData.append("file", file);
          formData.append("upload_preset", "hackathonupload");

          fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data.url);

              fetch("http://localhost:5000/questions/add", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  question: questionList[i].question,
                  imageUrl: data.url,
                }),
              });
            });
        }
      });
    }
  };

  const validationOnSubmit = (questionList) => {
    for (var i = 0; i < questionList.length; ++i) {
      if (questionList[i].question === "" || questionList[i].imageData === "") {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      {questionList.length ? (
        questionList.map((questionItem, index) => (
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
            <input type="file" onChange={(e) => onInputFileChange(e, index)} />
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

export default SocialSituations;
