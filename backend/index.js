const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const pdf = require("html-pdf");

const QuestionsRoute = require("./Routes/QuestionsRoute.js");
const MotivationsRoute = require("./Routes/MotivationsRoute.js");
const UserDataRoute = require("./Routes/UserDataRoute");
const ResultsRoute = require("./Routes/ResultsRoute");

const pdfTemplate = require("./documents");

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Connected to port 5000");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));
app.use("/questions", QuestionsRoute);
app.use("/motivations", MotivationsRoute);
app.use("/userdata", UserDataRoute);
app.use("/answerByUniqueId", ResultsRoute);

// PDF- generation
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("resultdemo.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/resultdemo.pdf`);
// });

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

//what else to do?
//there is no inegration. you will fetch urls thats it
/*
  for example if u wanna add a questions
  fetch("http://localhost:5000/questions/add",{
    method:"POST",
    headers:{
        Accept:"application/json",
        Content-Type:"applications/json"
    }body:JSON.stringify({

    })
  })
  */
