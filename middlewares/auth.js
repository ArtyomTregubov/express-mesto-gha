const jwt = require('jsonwebtoken');

const UnauthorizedError401 = require('../errors/UnauthorizedError401');

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

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

// module.exports = (req, res, next) => {
//   const { authorization, cookie } = req.headers;
//   let token;
//   if ((!authorization || !authorization.startsWith('Bearer ')) && !cookie) {
//     throw new UnauthorizedError401('Необходима авторизация');
//   }
//   if (cookie.slice(0, 3) === 'jwt') {
//     token = cookie.slice(4, cookie.length);
//   } else {
//     token = authorization.replace('Bearer ', '');
//   }
//
//   let payload;
//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     throw new UnauthorizedError401('Необходима авторизация');
//   }
//   req.user = payload;
//
//   next();
// };
