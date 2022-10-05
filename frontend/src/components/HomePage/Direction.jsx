import React from "react";
import HomePage from "./HomePage";
import { useNavigate, useParams } from "react-router-dom";

function Direction(props) {
  const navigate = useNavigate();

  const params = useParams();
  const uniqueId = params.uniqueId;
  // const user = dummyData.find((item) => {
  //   console.log(uniqueId);
  //   return uniqueId === item.uniqueId;
  // });
  // return <>{user && <HomePage user={user} />};</>;
  //   return <HomePage props={user} />;
}

export default Direction;
