const Joi = require("@hapi/joi");

let userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});



module.exports = userSchema;
