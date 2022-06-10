const asyncHandler = require('../middlewares/_asyncHandler');

const AppError = require('../utils/_appError');

exports.getAll = asyncHandler(async (req, res, next) => {
  const mergejilShalguurs = await req.db.MSH.findAll();

  res.status(200).json({
    status: 'success',
    length: mergejilShalguurs.length,
    data: mergejilShalguurs,
  });
});
