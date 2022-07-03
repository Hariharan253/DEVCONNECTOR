const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Customer = require("../../models/Customer");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route        GET api/customers-auth
//@description  Test route
//@access       Private

router.get("/", auth, async (req, res) => {
  try {
    const customerId = req.user.id;
    const customer = await Customer.findById(customerId).select("-password");
    res.json(customer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//@route        POST api/customers-auth
//@description  LogiIn User and get token
//@access       Public

router.post(
  "/",
  [
    check("email", "Please Include Correct Email").isEmail(),
    check("password", "Password Should be min of 5").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const customer = await Customer.findOne({ email });
      // return customer;
      if (!customer) {
        res.status(400).json({ error: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: customer.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
