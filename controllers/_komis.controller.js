const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');
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

exports.createKomis = asyncHandler(async (req, res, next) => {
  const komis = await req.models.Komis.create(req.body);

  if (!komis) {
    throw new AppError('Aldaa garlaa', 500);
  }
  res.status(201).json({
    status: 'success',
    data: komis,
  });
});

exports.getKomis = asyncHandler(async (req, res, next) => {
  const komis = await req.models.Komis.findByPk(req.params.id);

  if (!komis) {
    throw new AppError(`Not found ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: komis,
  });
});

exports.updateKomis = asyncHandler(async (req, res, next) => {
  const komis = await req.models.Komis.findByPk(req.params.id);
  if (!komis) {
    throw new AppError(`Not found ${req.params.id}`, 404);
  }

  await komis.update(req.body);
  res.status(201).json({
    status: 'success',
    data: komis,
  });
});

exports.deleteKomis = asyncHandler(async (req, res, next) => {
  const komis = await req.models.Komis.findByPk(req.params.id);
  if (!komis) {
    throw new AppError(`Not found ${req.params.id}`, 404);
  }

  await komis.destroy();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
