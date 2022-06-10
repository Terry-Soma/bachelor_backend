const jwt = require('jsonwebtoken');

const asyncHandler = require('./_asyncHandler.js');
const AppError = require('../utils/_appError');

exports.protect = asyncHandler(async (req, res, next) => {
  let token = null;
  if (req.cookies) {
    token = req.cookies['IKH_ZASAG_TOKEN'];
  }

  if (!token) {
    throw new MyError(
      'Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү.Cookie ашиглан токеноо дамжуулна уу.',
      401
    );
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenObj);
  req.burtgel_Id = tokenObj.burtgel_Id;
  req.email = tokenObj.email;
  //   req.userId = tokenObj.id;
  //   req.userRole = tokenObj.role;
  next();
});
