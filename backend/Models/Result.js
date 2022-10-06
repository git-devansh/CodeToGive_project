const mongoose = require("mongoose");

// const ResultSchema = mongoose.Schema(
//   {
//     uniqueId: {
//       social: {
//         question: {
//           type: [String],
//           required: true,
//         },
//         imageUrl: {
//           type: [String],
//           required: true,
//         },
//         answer: {
//           type: [String],
//           required: true,
//         },
//       },
//       motivation: {
//         question: {
//           type: [String],
//           required: true,
//         },
//         answer: {
//           type: [String],
//           required: true,
//         },
//       },
//     },
//   },
//   { strict: false }
// );

const ResultSchema = mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
  },
  social: {
    question: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: [String],
      required: true,
    },
    answer: {
      type: [String],
      required: true,
    },
  },
  motivation: {
    question: {
      type: [String],
      required: false,
    },
    answer: {
      type: [String],
      required: false,
    },
  },
});

const ResultModel = mongoose.model("Result", ResultSchema);

module.exports = ResultModel;

//so we store using uniqueId or what.
//ok let me think i feel something is wrong
//bro how will the admin know who is this user?
//but that's storing data. they have allergy from storing data
//so we use email?
//bro. get what? we need store the questions and anwers first
