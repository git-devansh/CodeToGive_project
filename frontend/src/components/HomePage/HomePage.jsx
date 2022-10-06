import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function HomePage(props) {
  const params = useParams();
  const uniqueId = params.uniqueId;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log("+++>" + uniqueId);
      props.setTestLink(uniqueId);
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
    }
    fetchData();
  }, []);

  const handleSaveButton = () => {
    console.log("props.isStart");
  };

  return (
    <>
      <Navbar pagetype="Test Portal" />
      <div className="centercontainer">
        <section className="test_main_section">
          {userData.uniqueId === uniqueId ? (
            <>
              <h3>You have been assigned task to do by Salva Vita</h3>
              <p>Here are the test links below</p>
              <div className="button_grid_test">
                {userData.question1Assigned && (
                  <button
                    disabled={props.isStart ? true : false}
                    onClick={() => navigate("socialtest")}
                    className="test_mycard social_situation"
                  >
                    Social Situation
                  </button>
                )}
                {userData.question2Assigned && (
                  <button
                    disabled={props.isStart2 ? true : false}
                    onClick={() => navigate(`motivationtest`)}
                    className="test_mycard motivation_skills"
                  >
                    Motivation skills
                  </button>
                )}
              </div>
              {/* <button
                disabled={!(props.isStart || props.isStart2)}
                onClick={() => handleSaveButton}
              >
                Submit
              </button> */}
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
