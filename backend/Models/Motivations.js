const mongoose = require("mongoose");

const MotivationSchema = mongoose.Schema({
  question: {
    type: String,
    required: false,
  },
});

const MotivationModel = mongoose.model("Motivations", MotivationSchema);

module.exports = MotivationModel;
