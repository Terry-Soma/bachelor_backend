const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');
/* Facebook and  Google Oauth */

exports.facebook = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'THIS ROUTE NOT DEFINED YET',
  });
});

exports.google = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'THIS ROUTE NOT DEFINED YET',
  });
});

exports.adminGoogle = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'This route not defined yet',
  });
});
exports.adminFacebook = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'This route not defined yet',
  });
});
//
