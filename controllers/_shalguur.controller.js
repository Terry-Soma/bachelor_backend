const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');

exports.getAll = asyncHandler(async (req, res, next) => {
  const Shalguurs = await req.models.Shalguur.findAll();
  res.status(200).json({
    status: 'success',
    data: Shalguurs,
  });
});

exports.createShalguur = asyncHandler(async (req, res, next) => {
  const Shalguur = await req.models.Shalguur.create(req.body);
  if (!Shalguur) {
    throw new AppError(`Error with ${req.body}`, 400);
  }
  res.status(201).json({
    status: 'success',
    data: Shalguur,
  });
});

exports.getShalguur = asyncHandler(async (req, res, next) => {
  const Shalguur = await req.models.Shalguur.findByPk(req.params.id);

  if (!Shalguur) {
    throw new AppError(`Id тай shalgalt олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: Shalguur,
    mergejil: await Shalguur.getMergejils(),
    aa: Object.keys(req.models.Shalguur.prototype),
  });
});

exports.updateShalguur = asyncHandler(async (req, res, next) => {
  const result = await req.models.Shalguur.update(req.body, {
    where: {
      Id: req.params.id,
    },
  });
  if (!result) {
    throw new AppError(`${req.body.ner} ${result}`, 404);
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteShalguur = asyncHandler(async (req, res, next) => {
  const result = await req.models.Shalguur.destroy({
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
