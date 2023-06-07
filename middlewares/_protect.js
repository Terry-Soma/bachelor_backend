const jwt = require('jsonwebtoken');

const asyncHandler = require('./_asyncHandler.js');
const AppError = require('../utils/_appError');

exports.protect = asyncHandler(async (req, res, next) => {
  let token = null;
  if (req.cookies) {
    token = req.cookies['IKH_ZASAG_TOKEN'];
  }

  if (!token) {
    throw new AppError(
      'Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү.',
      401
    );
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  req.SA_Id = tokenObj.SA_Id;
  req.email = tokenObj.email;
  next();
});
