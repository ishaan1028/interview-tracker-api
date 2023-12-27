const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 2,
      maxlength: 100,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      minlength: 6,
      maxlength: 2000,
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "user");
