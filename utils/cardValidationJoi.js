const { celebrate, Joi } = require('celebrate');

const regExp = require('./regExp');

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regExp),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(/\d+/),
  }),
});

module.exports = {
  cardValidator,
  cardIdValidator,
};
