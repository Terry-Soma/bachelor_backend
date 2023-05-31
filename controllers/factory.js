const asyncHandler = require('../middlewares/_asyncHandler');
const AppError = require('../utils/_appError');


exports.getAll = (Model, queryFunction) =>
  asyncHandler(async (req, res, _) => {
    let query;
    if (typeof queryFunction == "function") {
      query = queryFunction(req);
    }

    const doc = await req.models[Model].findAll(query);

    res.status(200).json({
      success: true,
      results: doc.length,
      data: doc
    });
  })

exports.createOne = Model => asyncHandler(async (req, res, next) => {
  const doc = await req.models[Model].create(req.body)

  if (!doc) {
    throw new AppError("Үүсгэх үед алдаа гарлаа", 500)
  }
  res.status(201).json({
    success: true,
    data: doc
  });
})

exports.getOne = Model => asyncHandler(async (req, res, next) => {
  const doc = await req.models[Model].findByPk(req.params.id);
  // if (searchOption) /*  population*/ { return -1; }

  if (!doc) {
    return next(new AppError(req.params.id + ' тай баримт олдсонгүй! ', 404))
  }
  res.status(200).json({
    success: true,
    data: doc
  });
})
exports.updateOne = Model =>
  asyncHandler(async (req, res, next) => {
    let doc = await req.models[Model].findByPk(req.params.id);

    if (!doc) {
      throw new AppError(req.params.id + ' тай баримт олдсонгүй! ', 404);
    }
    doc = await doc.update(req.body);

    res.status(201).json({
      success: true,
      data: doc,
    });
  });

exports.deleteOne = Model =>
  asyncHandler(async (req, res, _) => {

    let doc = await req.models[Model].findByPk(req.params.id);

    if (!doc) {
      throw new AppError(req.params.id + ' тай баримт олдсонгүй! ', 404);
    }
    doc = await doc.destroy(req.body);

    res.status(204).json({
      success: true,
      data: null,
    });
  });
