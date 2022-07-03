//create customer routes

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Customer = require("../../models/Customer");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route        POST api/customers
//@description  Register Customer
//@access       Public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please Include Correct Email").isEmail(),
    check("password", "Password Should be min of 5").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let customer = await Customer.findOne({ email: email });

      if (customer) {
        return res
          .status(400)
          .json({ error: [{ msg: "Customer Already Exist" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      customer = new Customer({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      customer.password = await bcrypt.hash(password, salt);
      await customer.save();

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
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
