import "./App.css";
import { useState } from "react";
import AdminPage from "./components/AdminPage/AdminPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SocialTest from "./components/SocialTest";
import MotivationTest from "./components/MotivationTest/MotivationTest";
import NoPageFound from "./components/Utils/NoPageFound";
import Direction from "./components/HomePage/Direction";

const dummyData = [
  {
    uniqueId: "dummy222",
    firstname: "dummy1",
    lastname: "dummy Daddy",
    email: "dummydadadu@gmail.com",
    questionAssigned: [1, 2],
  },
  {
    uniqueId: "dummy5551",
    firstname: "dummy1",
    lastname: "dummy Daddy",
    email: "dummydadadu@gmail.com",
    questionAssigned: [1, 2],
  },
  {
    uniqueId: "dummy666",
    firstname: "dummy1",
    lastname: "dummy Daddy",
    email: "dummydadadu@gmail.com",
    questionAssigned: [1, 2],
  },
  {
    uniqueId: "dummy444",
    firstname: "dummy1",
    lastname: "dummy Daddy",
    email: "dummydadadu@gmail.com",
    questionAssigned: [1, 2],
  },
  {
    uniqueId: "dummy111",
    firstname: "dummy1",
    lastname: "dummy Daddy",
    email: "dummydadadu@gmail.com",
    questionAssigned: [1, 2],
  },
];

function App() {
  const [descriptions, setDescriptions] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isStart2, setIsStart2] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route exact path="/:uniqueId" element={<Direction />} /> */}
        <Route exact path="/:uniqueId" element={<HomePage />} />
        <Route path="/:uniqueId/motivationtest" element={<MotivationTest />} />

        <Route
          path="/:uniqueId/socialtest"
          element={
            <SocialTest
              descriptions={descriptions}
              setDescriptions={setDescriptions}
              setIsStart={setIsStart}
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
