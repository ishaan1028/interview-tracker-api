const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../helpers/validationSchema");

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });

    let { username, password } = req.body;

    // Checking if user already exists
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(409).send({
        status: "error",
        message: "this username is already registered",
      });

    //Encoding password
    password = await bcryptjs.hash(password, 10);

    await User.create({
      username,
      password,
    });

    res.status(200).send({
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });

    const JWT_SECRET = "interviewTrackerjwt";
    const { username, password } = req.body;

    // Checking if user exists
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "user not found" });

    // Checking if password is matching
    const validPass = await bcryptjs.compare(password, user.password);

    if (!validPass)
      return res
        .status(403)
        .send({ status: "error", message: "wrong password" });

    const { password: hide, ...details } = user._doc;

    // generating jwt token
    const token = jwt.sign(
      { user: details },
      process.env.JWT_SECRET || JWT_SECRET
    );

    res.send({ status: "success", token: token, user: details });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = {
  register,
  login,
};
