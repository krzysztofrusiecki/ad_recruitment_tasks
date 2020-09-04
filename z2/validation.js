const Joi = require("joi");

exports.registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(7).max(255).required().email(),
    password: Joi.string().min(7).max(255).required(),
  });

  return schema.validate(data);
};

exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(7).max(255).required().email(),
    password: Joi.string().min(7).max(255).required(),
  });

  return schema.validate(data);
};
