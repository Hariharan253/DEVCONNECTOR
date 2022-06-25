//Adding Profile, fetching profile

//creates user

const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route        GET api/profile/me
//@description  Get current User Profile
//@access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for this user" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

//@route        POST api/profile
//@description  POST current User Profile
//@access       Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skills is Required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      company,
      location,
      bio,
      githubusername,
      status,
      //// spread the rest of the fields we don't need to check
    } = req.body;

    //build Profile
    const profileFields = {
      status: status,
      user: req.user.id,
      website: website,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => " " + skill.trim()),
      bio: bio,
      company: company,
      location: location,
      githubusername: githubusername,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    // for (const [key, value] of Object.entries(socialFields)) {
    //   if (value && value.length > 0)
    //     socialFields[key] = normalize(value, { forceHttps: true });
    // }

    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json({ profile });
      console.log("profile:", profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@route        GET api/profile
//@description  Get All Profile
//@access       Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route        GET api/profile/user/:user_id
//@description  Get Profile by user ID
//@access       Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.params.user_id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profiles) return res.status(500).json({ msg: "Profile Not Found" });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "user_id")
      return res.status(500).json({ msg: "Profile Not Found" });
    res.status(500).send("server error");
  }
});

//@route        DEL api/profile
//@description  DEL profile and user using Auth Token
//@access       Private

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    //await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "profile of that user is deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route        PUT api/profile/experience
//@description  PUT experience profile
//@access       Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title Is required").notEmpty(),
      check("company", "company Is required").notEmpty(),
      check("from", "from Is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route        DELETE api/profile/experience/:exp_id
//@description  DELETE experience profile
//@access       Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    //req.user.id is returned from auth function
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route        PUT api/profile/education
//@description  PUT education profile
//@access       Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "school Is required").notEmpty(),
      check("degree", "degree Is required").notEmpty(),
      check("fieldofstudy", "fieldofstudy Is required").notEmpty(),
      check("from", "from is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu); //unshift is equivalent to push
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route        DELETE api/profile/experience/:exp_id
//@description  DELETE education profile
//@access       Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //req.user.id is returned from auth function
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
