const express = require("express");
const Job = require("../../models/Job");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
router.post(
  "/",
  [
    auth,
    [
      check("education", "education is required").notEmpty(),
      check("skills", "Skills is Required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { education, experience, skills, description } = req.body;
    const customerId = req.user.id;
    try {
      const job = await new Job({
        customer: customerId,
        education,
        experience,
        skills,
        description,
      });
      await job.save();
      return res.json(job);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
