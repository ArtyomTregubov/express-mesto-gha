const { celebrate, Joi } = require('celebrate');

const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]+/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
};
