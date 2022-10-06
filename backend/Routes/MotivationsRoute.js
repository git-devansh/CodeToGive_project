const mongoose = require("mongoose");
const express = require("express");
const Motivations = require("../Models/Motivations.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const mot = await Motivations.find({});
  res.status(200).json(mot);
});

router.post("/add", (req, res) => {
  const question = req.body.question;
  const newMot = new Motivations({ question: question });

  try {
    const savedMot = newMot.save();
    res.status(200).json(savedMot);
  } catch (err) {
    res.status(400).json("operation failed");
  }
});

router.delete("/delete"),
  (req, res) => {
    const questionId = req.boby.id;

    Motivations.findByIdAndDelete(questionId);
    res.status(200).json("question deleted");
  };

module.exports = router;
