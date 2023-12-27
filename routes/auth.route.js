const route = require("express").Router();
const authservices = require("../services/auth.service");

// Register
route.post("/register", authservices.register);

// Login
route.post("/login", authservices.login);

module.exports = route;
