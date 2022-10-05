const express = require("express");
const Questions = require("../Models/Questions.js");

const router = express.Router();

router.get("/", async (req, res) => {

  const questions = await Questions.find({})
  res.status(200).json(questions);
});

router.post("/add", (req, res) => {

  const image = req.body.imageUrl;
  const question = req.body.question;

  const newQuestion = new Questions({ question: question, imageUrl: image });

  try {
    const savedQuestion = newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(400).json("operation failed");
  }
});

router.delete("/delete"),
  (req, res) => {
    const questionId = req.boby.id;

    Questions.findByIdAndDelete(questionId);
    res.status(200).json("question deleted");
};

router.delete('/delete-all-quesitons',async(req,res)=>{
  await Questions.collection.drop();
  res.status(200).json("all data deleted")
})


module.exports = router;
