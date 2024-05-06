const express = require("express");
const User = require("../Model/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) {
    res.status(400).json({ message: "Email already in use" });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newUser.save();

    res.status(200).json({ message: "User Successfully Registered", user });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
});
router.get("/getuser/:id", async (req, res) => {
  const userid = req.body.userid;
  try {
    const getUser = await User.findOne({ userid });
    res.status(200).json({ message: "User Successfully Retrieved", getUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    // if (user) {
    //   const temp = {
    //     name: user.name,
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     _id: user._id,
    //   };

    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
