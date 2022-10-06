const mongoose = require("mongoose");

const MotivationSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
});

const MotivationModel = mongoose.model("Motivations", MotivationSchema);

module.exports = MotivationModel;
