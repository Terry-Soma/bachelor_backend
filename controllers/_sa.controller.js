const AppError = require("../utils/_appError");

const asyncHandler = require("../middlewares/_asyncHandler");
const { verifyToken } = require("../utils/_googleOAuth");
const jwt = require('jsonwebtoken')
const factory = require('./factory')
const { SA } = require('./../databaseModels/AllModels')

exports.getAll = factory.getAll(SA)

exports.createSAlba = asyncHandler(async (req, res, next) => {
  const sa = await req.models.SA.create(req.body);

  if (!sa) {
    throw new AppError(`Үүсгэх үед алдаа гарлаа ${req.body}`, 500);
  }
  res.status(200).json({
    status: "success",
    data: sa,
  });
});

exports.getSA = asyncHandler(async (req, res, next) => {
  const sa = await req.models.SA.findByPk(req.params.id);
  if (!sa) {
    throw new AppError(`Id олдсонгүй ${req.params.id} `, 404);
  }
  res.status(200).json({
    data: sa,
  });
});

exports.updateSA = asyncHandler(async (req, res, next) => {
  let result = await req.models.SA.findByPk(req.params.id);

  if (!result) {
    throw new AppError(`${req.params.id} -тай СА олдсонгүй`, 404);
  }
  result = await result.update(req.body);
  if (result == 0) {
    throw new AppError(`Өөрчлөлт хийгдсэн өгөгдөл байна ${req.body.ner}`, 400);
  }
  res.status(201).json({
    data: result,
  });
});

exports.deleteSA = asyncHandler(async (req, res, next) => {
  let result = await req.models.SA.findByPk(req.params.id);

  if (!result) {
    throw new AppError(`${req.params.id} -тай СА олдсонгүй`, 404);
  }
  result = await result.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});


exports.googleAuth = asyncHandler(async (req, res, next) => {
  if (!req.body.token) {
    throw new AppError(
      'Уучлаарай таны хүсэлтэнд хариулах зүйл алга. Мэдээллээ шалгаад дахин явуулна уу',
      400
    );
  }
  let { token } = req.body;

  const result = await verifyToken(token);

  if (!result.email_verified) {
    throw new MyError(
      'Уучлаарай та ямар нэгэн зүйл буруу хийж байна. Хаа саагүй нүд бий шүү',
      403
    );
  }

  const sa = await req.models.SA.findOne({ where: { email: result.email } });
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
      email: result.email,
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
