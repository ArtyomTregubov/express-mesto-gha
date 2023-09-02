const handleError = (err, req, res, next) => {
  const { message } = err;
  let { statusCode = 500 } = err;
  if (err.name === 'CastError') {
    statusCode = 404;
  }
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
