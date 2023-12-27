const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(6).max(2000).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(6).max(2000).required(),
});

const createInterviewSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  status: Joi.string().valid("pending", "completed"),
  feedback: Joi.string().min(3).max(2000),
  rating: Joi.number().integer().min(1).max(5),
})
  .and("rating", "feedback")
  .custom((value) => {
    if (value.rating !== undefined && value.feedback !== undefined) {
      value.status = "completed";
    }
    if (value.status == "completed" && (!value.feedback || !value.rating)) {
      throw new Error("Invalid da");
    }
    return value;
  })
  .options({ abortEarly: false });

const updateInterviewSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  status: Joi.string().valid("pending", "completed"),
  feedback: Joi.string().min(3).max(2000),
  rating: Joi.number().integer().min(1).max(5),
})
  .or("name", "status", "feedback", "rating")
  .and("rating", "feedback", "status")
  .custom((value) => {
    if (value.rating !== undefined && value.feedback !== undefined) {
      value.status = "completed";
    }
    return value;
  })
  .options({ abortEarly: false });

module.exports = {
  registerSchema,
  loginSchema,
  createInterviewSchema,
  updateInterviewSchema,
};
