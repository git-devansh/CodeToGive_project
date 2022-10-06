import "./App.css";
import { useState, useEffect } from "react";
import AdminPage from "./components/AdminPage/AdminPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SocialTest from "./components/SocialTest";
import MotivationTest from "./components/MotivationTest/MotivationTest";
import NoPageFound from "./components/Utils/NoPageFound";
import Direction from "./components/HomePage/Direction";

function App() {
  const [data, setData] = useState([]); //data of questions and images from DB
  const [descriptions, setDescriptions] = useState([
    { question: "", image: "", answer: "" },
  ]); //answers of social test
  const [motivations, setMotivations] = useState([
    { quesiton: "", answer: "" },
  ]); //answers of motivation test
  const [isStart, setIsStart] = useState(false);
  const [isStart2, setIsStart2] = useState(false);
  const [testLink, setTestLink] = useState();

  console.log("SOCIAL TEST RESULTS");
  console.log(descriptions);

  console.log("MOTIVATION TEST RESULTS");
  console.log(motivations);

  // const JSON_Formated = () => {
  //   if(descriptions.length < 1 && descriptions[0].question === "" && descriptions[1].image === ""){
  //     return
  //   }
  // };

  useEffect(() => {
    if (isStart || isStart2) {
      const listDescriptionsQuestion = descriptions.map((i) => i.question);
      const listDescriptionsImagesUrl = descriptions.map((i) => i.imageUrl);
      const listDescriptionsAnswer = descriptions.map((i) => i.answer);
      const listMotivationsQuestion = motivations.map((i) => i.question);
      const listMotivationsAnswer = motivations.map((i) => i.answer);

      console.log(listMotivationsAnswer);

      fetch("http://localhost:5000/answerByUniqueId/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId: "12345",
          social: {
            question: listDescriptionsQuestion,
            imageUrl: listDescriptionsImagesUrl,
            answer: listDescriptionsAnswer,
          },
          motivation: {
            question: listMotivationsQuestion,
            answer: listMotivationsAnswer,
          },
        }),
      }).then((response) => {
        console.log(response);
        window.alert(response.status);
      });
    }
  }, [isStart, isStart2]);

  useEffect(() => {
    fetch("http://localhost:5000/questions/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route exact path="/:uniqueId" element={<Direction />} /> */}
        <Route
          exact
          path="/:uniqueId"
          element={
            <HomePage
              setTestLink={setTestLink}
              isStart={isStart}
              isStart2={isStart2}
            />
          }
        />
        <Route
          path="/:uniqueId/motivationtest"
          element={
            <MotivationTest
              setMotivations={setMotivations}
              testLink={testLink}
              setIsStart2={setIsStart2}
            />
          }
        />

        <Route
          path="/:uniqueId/socialtest"
          element={
            <SocialTest
              descriptions={descriptions}
              setDescriptions={setDescriptions}
              setIsStart={setIsStart}
              data={data}
              testLink={testLink}
            />
          }
        />

        <Route path="*" element={<NoPageFound />} />
        <Route path="/" element={<NoPageFound />} />
        <Route path="/:uniqueId/*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
}

export default App;
