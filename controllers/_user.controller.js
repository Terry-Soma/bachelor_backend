/* user crud
 */
const asyncHandler = require('../middlewares/_asyncHandler');
const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');

const factory = require('./factory');
const { User } = require('../databaseModels/AllModels');
exports.getAll = asyncHandler(async (req, res, next) => {
  const { prepared_statement } = new PQ(req.models.User, req.query).exec();
  const users = await prepared_statement;

  res.status(200).json({
    status: 'success',
    data: users,
  });
});
exports.createUser = factory.createOne(User)
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User);