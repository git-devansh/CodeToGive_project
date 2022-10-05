import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function HomePage() {
  const params = useParams();
  const uniqueId = params.uniqueId;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchData() {
      console.log("+++>" + uniqueId);
      // await sleep(2000);
      // const res = await axios(ROOT_URL + "/users");
      try {
        axios.get(`http://localhost:5000/userdata/${uniqueId}`).then((res) => {
          console.log("res.data::::" + res.data);
          setUserData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
      // setUserData({
      //   uniqueId: "dummy222",
      //   firstname: "dummy1",
      //   lastname: "dummy Daddy",
      //   email: "dummydadadu@gmail.com",
      //   question1Assigned: true,
      //   question2Assigned: true,
      // });
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar pagetype="Test Portal" />
      <div className="centercontainer">
        {/* <p>{userData.firstname}</p> */}
        <section className="test_main_section">
          {userData.uniqueId === uniqueId ? (
            <>
              <h3>You have been assigned task to do by Salva Vita</h3>
              <p>Here are the test links below</p>
              <div className="button_grid_test">
                {userData.question1Assigned && (
                  <button
                    onClick={() => navigate("socialtest")}
                    className="test_mycard social_situation"
                  >
                    Social Situation
                  </button>
                )}
                {userData.question2Assigned && (
                  <button
                    onClick={() => navigate(`motivationtest`)}
                    className="test_mycard motivation_skills"
                  >
                    Motivation skills
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h2>
                No user found! Please contact{" "}
                <a href="https://salvavita.hu/">https://salvavita.hu/</a>
              </h2>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default HomePage;
