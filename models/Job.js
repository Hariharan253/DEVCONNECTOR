const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: {
    title: {
      type: String,
      required: true,
    },
    years: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("job", JobSchema);
