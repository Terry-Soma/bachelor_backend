/* hutulbur crud */
const asyncHandler = require('../middlewares/_asyncHandler');
const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');

exports.getAll = asyncHandler(async (req, res, next) => {
  if (Object.entries(req.params).length === 1) {
    let key = Object.keys(req.params);
    req.query.where = {
      [key]: req.params[key],
    };
  }
  const { prepared_statement } = new PQ(req.models.Hutulbur, req.query).exec();
  const hutulbur = await prepared_statement;

  res.status(200).json({
    status: 'success',
    data: hutulbur,
  });
});

exports.createHutulbur = asyncHandler(async (req, res, next) => {
  if (req.params) {
    let key = Object.keys(req.params);
    req.body[key] = req.params[key];
  }
  const hutulbur = await req.models.Hutulbur.create(req.body);
  if (!hutulbur) {
    throw new AppError('Хөтөлбөр үүсгэх үед алдаа гарлаа', 500);
  }
  res.status(200).json({
    status: 'success',
    data: hutulbur,
  });
});

exports.getHutulbur = asyncHandler(async (req, res, next) => {
  const hutulbur = await req.models.Hutulbur.findByPk(req.params.id);

  if (!hutulbur) {
    throw new AppError(`Хөтөлбөр олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: hutulbur,
    school: await hutulbur.getSchool(),
  });
});

exports.updateHutulbur = asyncHandler(async (req, res, next) => {
  const result = await req.models.Hutulbur.update(req.body, {
    where: {
      Id: req.params.id,
    },
  });
  if (!result) {
    throw new AppError(`${req.body} ${result}`, 400);
  }
  res.status(201).json({
    status: 'success',
  });
});

exports.deleteHutulbur = asyncHandler(async (req, res, next) => {
  const hutulbur = await req.models.Hutulbur.findByPk(req.params.id);

  if (!hutulbur) {
    throw new AppError(`Хөтөлбөр олдсонгүй ${req.params.id}`, 404);
  }

  await hutulbur.destroy();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
