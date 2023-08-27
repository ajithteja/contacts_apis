const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
  console.log({ req: req.statusCode });
  console.log({ res: res.statusCode });
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log({ statusCode });
  console.log('constants.NOT_FOUND', constants.NOT_FOUND);

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'Validation Failed ',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: 'Validation Failed ',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: 'UNAUTHORIZED',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: 'FORBIDDEN',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: 'SERVER ERROR',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log('NO ERROR, ALL ARE GOOD');
      break;
  }
};

module.exports = errorHandler;
