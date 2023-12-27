const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      validate: {
        validator: function () {
          if (this.rating || this.feedback) {
            return this.status !== "pending";
          }
          if (!this.rating || !this.feedback) {
            return this.status !== "completed";
          }
          return true;
        },
        message: "validation failed",
      },
    },
    feedback: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 2000,
      default: null,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

module.exports = mongoose.model("Interview", interviewSchema, "interview");
