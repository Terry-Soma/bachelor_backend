const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');

exports.getAll = asyncHandler(async (req, res, next) => {
  const Shalguurs = await req.db.Shalguur.findAll();
  res.status(200).json({
    status: 'success',
    data: Shalguurs,
  });
});

exports.createShalguur = asyncHandler(async (req, res, next) => {
  const Shalguur = await req.db.Shalguur.create(req.body);
  if (!Shalguur) {
    throw new AppError(`Error with ${req.body}`, 400);
  }
  res.status(201).json({
    status: 'success',
    data: Shalguur,
  });
});

exports.getShalguur = asyncHandler(async (req, res, next) => {
  const Shalguur = await req.db.Shalguur.findByPk(req.params.id);

  if (!Shalguur) {
    throw new AppError(`Id тай shalgalt олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: Shalguur,
    mergejil: await Shalguur.getMergejils(),
    aa: Object.keys(req.db.Shalguur.prototype),
  });
});

exports.updateShalguur = asyncHandler(async (req, res, next) => {
  const result = await req.db.Shalguur.update(req.body, {
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
  const result = await req.db.Shalguur.destroy({
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
