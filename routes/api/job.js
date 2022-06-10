const express = require('express');
const Job = require('../../models/Job');

const router = express.Router();
router.post('/', async(req, res) => {
    try {
        const {
            education_req,
            experience_req,
            skills_req,
            description
        } = req.body;

    const job = await new Job({
            education_req,
            experience_req,
            skills_req,
            description
    });
    await job.save();
    return res.json(job);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;