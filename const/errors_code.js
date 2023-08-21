const SUCCESS_CODE_200 = 200;
const SUCCESS_CREATE_CODE_201 = 201;
const ERROR_CODE_400 = 400;
const ERROR_NOT_FOUND_CODE_404 = 404;
const ERROR_SERVER_500 = 500;

function checkError(err, res) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(ERROR_CODE_400).send(err);
  }
  return res.status(ERROR_SERVER_500).send(err);
}

module.exports = {
  SUCCESS_CODE_200,
  SUCCESS_CREATE_CODE_201,
  ERROR_CODE_400,
  ERROR_NOT_FOUND_CODE_404,
  checkError,
};
