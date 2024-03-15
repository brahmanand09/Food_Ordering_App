const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const jwtsecret = "Myfirstwebsiteinfullstackdevelopmentinthisonly";

router.post(
  "/createuser",
  [
    body("email", "Check your email again").isEmail(),
    body("name", "Name is too short ").isLength({ min: 6 }),
    body("password", "Incorrect Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: securepassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Check your email again").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials ! " });
      }
      const passwordcompare = await bcrypt.compare(req.body.password,userData.password)
      if (!passwordcompare) {
        return res.status(400).json({ errors: "Enter correct Password! " });
      }
      const data = {
        user:{
            id:userData.id
        }
      }
      const authToken = jwt.sign(data,jwtsecret)
      return res.json({ success: true,authToken:authToken });
    } 
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
