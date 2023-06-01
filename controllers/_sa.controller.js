const AppError = require("../utils/_appError");
const asyncHandler = require("../middlewares/_asyncHandler");
const jwt = require('jsonwebtoken')
const factory = require('./factory')
const { SA } = require('./../databaseModels/AllModels')

exports.getAll = factory.getAll(SA)
exports.createSAlba = factory.createOne(SA)
exports.updateSA = factory.updateOne(SA)
exports.getSA = factory.getOne(SA)
exports.deleteSA = factory.deleteOne(SA)


exports.googleAuth = asyncHandler(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(
      'Уучлаарай таны хүсэлтэнд хариулах зүйл алга. Мэдээллээ шалгаад дахин явуулна уу',
      400
    );
  }
  let { data, provider } = req.body;


  if (!data.email_verified || !provider === "google") {
    throw new MyError(
      'Уучлаарай та ямар нэгэн зүйл буруу хийж байна. Хаа саагүй нүд бий шүү',
      403
    );
  }

  const sa = await req.models.SA.findOne({ where: { email: data.email } });
  if (!sa) {
    throw new AppError('Та буруу и-мэйл хаяг явуулсан байна', 400);
  }
  //
  const cookieOption = {
    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    httpOnly: true,
  };
  token = jwt.sign(
    {
      email: data.email,
      SA_Id: sa.SA_Id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );

  res.status(200).cookie('IKH_ZASAG_TOKEN', token, cookieOption).json({
    success: true,
    data: sa,
  });
});
