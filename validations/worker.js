const Joi = require("@hapi/joi");

function workerValidator(worker) {
  return Joi.object({
    name: Joi.string().min(1).max(255).required(),
    address: Joi.string().min(1).max(255).required(),
    contact: Joi.string().min(5).max(15),
    password: Joi.string().min(8).max(255),
  }).validate(worker);
}

module.exports = workerValidator;
