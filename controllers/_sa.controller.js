const AppError = require("../utils/_appError");

const asyncHandler = require("../middlewares/_asyncHandler");

exports.getAll = asyncHandler(async (req, res, next) => {
  const sa = await req.db.SA.findAll();
  res.status(200).json({
    status: "success",
    data: sa,
  });
});

exports.createSAlba = asyncHandler(async (req, res, next) => {
  const sa = await req.db.SA.create(req.body);

  if (!sa) {
    throw new AppError(`Үүсгэх үед алдаа гарлаа ${req.body}`, 500);
  }
  res.status(200).json({
    status: "success",
    data: sa,
  });
});

exports.getSA = asyncHandler(async (req, res, next) => {
  const sa = await req.db.SA.findByPk(req.params.id);
  if (!sa) {
    throw new AppError(`Id олдсонгүй ${req.params.id} `, 404);
  }
  res.status(200).json({
    data: sa,
  });
});

exports.updateSA = asyncHandler(async (req, res, next) => {
  let result = await req.db.SA.findByPk(req.params.id);

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
  let result = await req.db.SA.findByPk(req.params.id);

  if (!result) {
    throw new AppError(`${req.params.id} -тай СА олдсонгүй`, 404);
  }
  result = await result.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
