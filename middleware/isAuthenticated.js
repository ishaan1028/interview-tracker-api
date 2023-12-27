const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const JWT_SECRET = "interviewTrackerjwt";
    const token = req.headers["token"];
    if (!token)
      return res.status(401).send({
        status: "error",
        message: "auth token missing",
      });

    //verifying if users token is valid
    const { user } = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({
      status: "error",
      message: "Please login to access the content!",
    });
  }
};
module.exports = isAuthenticated;
