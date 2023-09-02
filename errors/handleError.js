const handleError = (err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  // if (message === 'Неправильные почта или пароль') {
  //   statusCode = 401;
  // } else if (err.name === 'ValidationError' || err.name === 'CastError') {
  //   statusCode = 400;
  // }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = handleError;
