const Joi = require("@hapi/joi");

function registerationValidator(user) {
  return Joi.object({
    country: Joi.string().min(1).max(255).required(),
    fName: Joi.string().min(1).max(255).required(),
    lName: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .error(() => {
        return new Error("Passwords do not match !");
      }),
    address: Joi.string().min(1).max(255).required(),
    city: Joi.string().min(1).max(255).required(),
    region: Joi.string().min(1).max(255).required(),
    zip: Joi.string().min(3).max(10),
    contact: Joi.string().min(5).max(15),
  }).validate(user);
}

function loginValidator(credentials) {
  return Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).required(),
  }).validate(credentials);
}

exports.registerationValidator = registerationValidator;
exports.loginValidator = loginValidator;
