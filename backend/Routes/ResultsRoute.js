const express = require("express");
const Result = require("../Models/Result.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await Result.find({});
  res.status(200).json(results);
});

//now the hard endpoint
router.post("/add", async (req, res) => {
  const uniqueId = req.body.uniqueId;
  const social = req.body.social; //this should be an object that contains 3 objects question,image,answer
  const motivation = req.body.motivation; //this should be an object that contains 2 object question, answer

  const newResult = new Result({
    uniqueId: uniqueId,
    social: social,
    motivation: motivation,
  });
  try {
    const savedNewResult = newResult.save();
    res.status(200).json("success::" + savedNewResult);
  } catch (err) {
    res.status(400).json("operation failed");
  }
});

module.exports = router;
