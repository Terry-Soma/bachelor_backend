/* hutulbur crud */
const asyncHandler = require('../middlewares/_asyncHandler');
const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');
const factory = require('./factory');
const { Hutulbur } = require('./../databaseModels/AllModels');
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

exports.getHutulbur = factory.getOne(Hutulbur)
exports.updateHutulbur = factory.updateOne(Hutulbur)
exports.deleteHutulbur = factory.deleteOne(Hutulbur)