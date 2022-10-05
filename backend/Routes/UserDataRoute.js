const express = require("express");
const UserData = require("../Models/UserData.js");

const router = express.Router();

router.get("/:uniqueId", async (req, res) => {
  const userData = await UserData.findOne({ uniqueId: req.params.uniqueId });
  res.status(200).json(userData);
});

router.post("/add", (req, res) => {
  //   const image = req.body.imageUrl;
  //   const question = req.body.question;

  const newUserData = new UserData({
    uniqueId: req.body.uniqueId,
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    question1Assigned: req.body.question1Assigned,
    question2Assigned: req.body.question2Assigned,
  });

  try {
    const savedUserData = newUserData.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(400).json("operation failed");
  }
});

module.exports = router;
