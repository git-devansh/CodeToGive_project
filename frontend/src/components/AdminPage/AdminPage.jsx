import React, { useState, useEffect } from "react";
import Select from "react-select";
import SocialSituations from "../SocialSituations/SocialSituations";
import LabTabs from "../Utils/TabNavBar";
import uniqid from "uniqid";
import emailjs from "@emailjs/browser";
import Navbar from "../Navbar/Navbar";
import { User } from "../../user";
import MotivationTestAdmin from "../MotivationTest/MotivationTestAdmin";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../Utils/MyDocument";

// question1 === 1 === Social Situations
// question2 === 2 === Motvation Test

// const dummyData = [
//   {
//     social: {
//       question: ["test2", "cdcd", "test3", "test44"],
//       imageUrl: [null, null, null, null],
//       answer: ["", "", "", ""],
//     },
//     motivation: {
//       question: [null],
//       answer: [""],
//     },
//     _id: "633e781023a217a303281f75",
//     uniqueId: "12345",
//     __v: 0,
//   },
//   {
//     social: {
//       question: ["test2", "cdcd", "test3", "test44"],
//       imageUrl: [null, null, null, null],
//       answer: ["", "", "", ""],
//     },
//     motivation: {
//       question: [null],
//       answer: [""],
//     },
//     _id: "633e781023a217a303281f75",
//     uniqueId: "12345",
//     __v: 0,
//   },
// ];

function AdminPage() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [uniqeID, setUniqeID] = useState("");
  const [situationData, setSituationData] = useState([{}]);
  const [questionList, setQuestionList] = useState([
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
    // { question: "sxsx", imageData: "" },
  ]);

  const [motivationData, setMotivationData] = useState([{}]);
  const [questionList2, setQuestionList2] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  const searchUserFun = (data) => {
    return data.filter((i) => i.email.toLowerCase().includes(searchUser));
  };

  const testList = [
    {
      value: "1",
      label: "Social situation",
      func: (
        <SocialSituations
          situationData={situationData}
          questionList={questionList}
          setQuestionList={setQuestionList}
        />
      ),
    },
    {
      value: "2",
      label: "Motivation test",
      func: (
        <MotivationTestAdmin
          motivationData={motivationData}
          questionList2={questionList2}
          setQuestionList2={setQuestionList2}
        />
      ),
    },
  ];

  useEffect(() => {
    async function fetchSituationData() {
      try {
        axios.get("http://localhost:5000/questions").then((res) => {
          setSituationData(res.data);
          setQuestionList(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchSituationData();
  }, []);

  useEffect(() => {
    async function fetchMotivationData() {
      try {
        axios.get("http://localhost:5000/motivations").then((res) => {
          setMotivationData(res.data);
          setQuestionList2(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchMotivationData();
  }, []);

  useEffect(() => {
    setUniqeID(`testlink${uniqid()}`);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    const checkIfExists = (item) => {
      for (let i = 0; i < selectedTests.length; ++i) {
        if (selectedTests.length > 0 && selectedTests[i].value === item)
          return true;
      }
      return false;
    };

    console.log(e.target);

    fetch("http://localhost:3000/userdata/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId: uniqeID,
        email: e.target.user_email.value,
        lastname: e.target.userlastname.value,
        firstname: e.target.userfirstname.value,
        question1Assigned: checkIfExists("1"),
        question2Assigned: checkIfExists("2"),
      }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        emailjs
          .sendForm("gmail", "template_nw1pwmw", e.target, "87517AMbUVdy8I9wR")
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        setUniqeID(`testlink${uniqid()}`);
      }
    });

    // e.target.rest();
  };

  return (
    <>
      <Navbar pagetype="Admin panel" />
      <div className="centercontainer">
        <aside className="adminseaction1">
          <form onSubmit={(e) => sendEmail(e)}>
            <h2 className="createtesttext">Create new test</h2>
            <p>Email address</p>
            <input
              type="email"
              className="textinput"
              placeholder="Enter email here"
              name="user_email"
            />
            <p>Last name</p>
            <input
              type="text"
              className="textinput"
              placeholder="Enter the last name"
              name="userlastname"
            />
            <p>First name</p>
            <input
              type="text"
              className="textinput"
              placeholder="Enter the first name"
              name="userfirstname"
            />
            <p>Choose the tests which you want to send</p>
            <Select
              options={testList}
              placeholder="Select tests"
              value={selectedTests}
              onChange={setSelectedTests}
              isMulti
              name="testlist"
            />
            <p className="unique_identifier_p_style">Unique Identifier</p>
            <input
              readOnly
              className="textinput"
              name="uniqeID"
              value={uniqeID}
            />
            {/* <button type="button" className="sendbtn">
          Send
        </button> */}
            <button className="button-myadmin" type="submit">
              <div className="svg-wrapper-1-myadmin">
                <div className="svg-wrapper-myadmin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </form>
        </aside>

        {/* test 1 */}
        <aside className="adminseaction2">
          <LabTabs testList={testList} />
        </aside>
        <aside className="adminseaction1">
          <input
            type="text"
            className="textinput"
            placeholder="Search"
            name="serach"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <ul className="list_of_user">
            <table>
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>Download Test</th>
                </tr>
                {searchUserFun(User).map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>
                      {" "}
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            firstname={item.first_name}
                            lastname={item.last_name}
                            email={item.email}
                          />
                        }
                        fileName={item.first_name}
                      >
                        {({ loading }) =>
                          loading ? (
                            <button>Loading..</button>
                          ) : (
                            <button>Download</button>
                          )
                        }
                      </PDFDownloadLink>
                      {""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default AdminPage;
