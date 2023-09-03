const { celebrate, Joi } = require('celebrate');

const regExpUrl = require('./regExp');

const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrl),
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
    id: Joi.string().length(24).hex().required(),
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
    avatar: Joi.string().pattern(regExpUrl),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  userIdValidator,
  userMeValidator,
  userMeAvatarValidator,
};
