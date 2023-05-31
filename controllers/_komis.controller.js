const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');

const factory = require('./factory');
const { Komis } = require('./../databaseModels/AllModels')
exports.getAll = asyncHandler(async (req, res, next) => {
  const komis = await req.models.Komis.findAll({
    include: [
      {
        model: req.models.User,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: komis,
  });
});

exports.createKomis = factory.createOne(Komis)
exports.getKomis = factory.getOne(Komis)
exports.updateKomis = factory.updateOne(Komis)
exports.deleteKomis = factory.deleteOne(Komis)
