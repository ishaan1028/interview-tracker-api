const Interview = require("../models/interview.model");
const {
  createInterviewSchema,
  updateInterviewSchema,
} = require("../helpers/validationSchema");
const isValidObjectId = require("../helpers/objectIdValidator");

const createInterview = async (req, res) => {
  try {
    const { error, value } = createInterviewSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });

    const { name, status, feedback, rating } = value;

    const newInterview = {};
    if (name) newInterview.name = name;
    if (status) newInterview.status = status;
    if (feedback) newInterview.feedback = feedback;
    if (rating) newInterview.rating = rating;

    const interview = await Interview.create(newInterview);
    res.send({
      status: "success",
      message: "Interview created successfully",
      data: interview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { error, value } = updateInterviewSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });

    const { interviewId } = req.params;
    if (!isValidObjectId(interviewId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const interview = await Interview.findOneAndUpdate(
      { _id: interviewId },
      {
        $set: { ...value },
      },
      { new: true }
    );

    if (!interview)
      return res.status(404).send({
        status: "error",
        message: "update failed, interview not found",
      });

    res.send({
      status: "success",
      message: "Interview updated successfully",
      data: interview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    if (!isValidObjectId(interviewId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const interview = await Interview.findOneAndDelete({
      _id: interviewId,
    });

    if (!interview)
      return res.status(404).send({
        status: "error",
        message: "deelte failed, interview not found",
      });

    res.send({
      status: "success",
      message: "Interview deleted successfully",
      data: interview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

const readInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    if (!isValidObjectId(interviewId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const interview = await Interview.findById(interviewId);

    if (!interview)
      return res
        .status(404)
        .send({ status: "error", message: "interview not found" });

    res.send({
      status: "success",
      data: interview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

const readAllInterviews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const totalCount = await Interview.countDocuments();

    const skip = (page - 1) * pageSize;

    const interviews = await Interview.find(
      {},
      { name: 1, status: 1, feedback: 1, rating: 1 }
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.send({
      page,
      totalCount,
      data: interviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = {
  createInterview,
  updateInterview,
  deleteInterview,
  readInterview,
  readAllInterviews,
};
