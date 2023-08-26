const jwt = require('jsonwebtoken');

const UnauthorizedError401 = require('../errors/unauthorized-error-401');

module.exports = (req, res, next) => {
  const { authorization, cookie } = req.headers;
  let token;
  if ((!authorization || !authorization.startsWith('Bearer ')) && !cookie) {
    throw new UnauthorizedError401('Необходима авторизация');
  }
  if (cookie.slice(0, 3) === 'jwt') {
    token = cookie.slice(4, cookie.length);
  } else {
    token = authorization.replace('Bearer ', '');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError401('Необходима авторизация');
  }
  req.user = payload;

  next();
};
