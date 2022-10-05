const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

const QuestionModel = mongoose.model("Questions", QuestionSchema);

module.exports = QuestionModel;
