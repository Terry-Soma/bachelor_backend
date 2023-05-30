const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');
const PQ = require('../utils/_features');

exports.getAll = asyncHandler(async (req, res, next) => {
  const aimags = await req.models.Aimag.findAll();
  res.status(200).json({
    status: 'success',
    data: aimags,
  });
});

exports.createAimag = asyncHandler(async (req, res, next) => {
  const aimag = await req.models.Aimag.create(req.body);
  if (!aimag) {
    throw new AppError(`Error with ${req.body}`, 400);
  }
  res.status(201).json({
    status: 'success',
    data: aimag,
  });
});

exports.getAimag = asyncHandler(async (req, res, next) => {
  const aimag = await req.models.Aimag.findByPk(req.params.id);

  if (!aimag) {
    throw new AppError(`Id тай аймаг олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: aimag,
  });
});

exports.updateAimag = asyncHandler(async (req, res, next) => {
  const result = await req.models.Aimag.update(req.body, {
    where: {
      Id: req.params.id,
    },
  });
  if (!result) {
    throw new AppError(`aldaa ${result}`, 404);
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteAimag = asyncHandler(async (req, res, next) => {
  const result = await req.models.Aimag.destroy({
    where: { id: req.params.id },
  });

  if (!result) {
    throw new AppError(`Id олдсонгүй ${req.params.id}`, 404);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
