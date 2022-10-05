const mongoose = require("mongoose");

const UserData = mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  question1Assigned: {
    type: Boolean,
    required: false,
  },
  question2Assigned: {
    type: Boolean,
    required: false,
  },
});

const UserDataModel = mongoose.model("UserData", UserData);

module.exports = UserDataModel;
