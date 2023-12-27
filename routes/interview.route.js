const route = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const interviewService = require("../services/interview.service");

// create interview
route.post("/", isAuthenticated, interviewService.createInterview);

// get all interviews
route.get("/", isAuthenticated, interviewService.readAllInterviews);

// get a particular interview
route.get("/:interviewId", isAuthenticated, interviewService.readInterview);

// update interview
route.put("/:interviewId", isAuthenticated, interviewService.updateInterview);

// delete interview
route.delete(
  "/:interviewId",
  isAuthenticated,
  interviewService.deleteInterview
);

module.exports = route;
