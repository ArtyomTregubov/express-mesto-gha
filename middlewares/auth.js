const jwt = require('jsonwebtoken');

const UnauthorizedError401 = require('../errors/unauthorizedError401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError401('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError401('Необходима авторизация');
  }

  req.user = payload;

  next();
};
