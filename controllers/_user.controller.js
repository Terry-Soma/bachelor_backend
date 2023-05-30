/* user crud
 */
const asyncHandler = require('../middlewares/_asyncHandler');
const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');

exports.getAll = asyncHandler(async (req, res, next) => {
  const { prepared_statement } = new PQ(req.models.User, req.query).exec();
  const users = await prepared_statement;

  res.status(200).json({
    status: 'success',
    data: users,
  });
});
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await req.models.User.create(req.body);
  if (!user) {
    throw new AppError('Үүсгэх үед алдаа гарлаа', 500);
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await req.models.User.findByPk(req.params.id);

  if (!user) {
    throw new AppError(`${req.params.id}тай хэрэглэгч олдсонгүй`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await req.models.User.findByPk(req.params.id);
  if (!user) {
    throw new AppError(req.params.id + 'тэй хэрэглэгч алга', 404);
  }
  await user.update(req.body);

  res.status(201).json({
    status: 'success',
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await req.models.User.findByPk(req.params.id);

  if (!user) {
    throw new AppError(`Хэрэглэгч олдсонгүй Буруу ID ирлээ`, 404);
  }
  await user.destroy();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
