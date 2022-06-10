const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    education_req:{
        degree: {
          type: String,
          required: true
        },
        fieldofstudy: {
          type: String,
          required: true
        },
        description: {
          type: String
        }
    },
       experience_req:{
          type: String
       },
       skills_req: {
          type: [String],
           required: true
       },
       description: {
        type: String
      }
});

module.exports = mongoose.model('job', JobSchema);