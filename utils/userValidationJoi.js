const { celebrate, Joi } = require('celebrate');

const regExp = require('./regExp');

const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
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

const userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(/\d+/),
  }),
});

const userMeValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userMeAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExp),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  userIdValidator,
  userMeValidator,
  userMeAvatarValidator,
};
