const SUCCESS_CODE_200 = 200;
const SUCCESS_CREATE_CODE_201 = 201;
const ERROR_CODE_400 = 400;
const ERROR_NOT_FOUND_CODE_404 = 404;
const ERROR_SERVER_500 = 500;

function getStatusError(err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return ERROR_CODE_400;
  }
  return ERROR_SERVER_500;
}

module.exports = {
  SUCCESS_CODE_200,
  SUCCESS_CREATE_CODE_201,
  ERROR_CODE_400,
  ERROR_NOT_FOUND_CODE_404,
  getStatusError,
};
