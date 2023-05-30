const AppError = require('../utils/_appError');
const { Op } = require('sequelize');
const asyncHandler = require('../middlewares/_asyncHandler');
const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');

exports.getAll = asyncHandler(async (req, res, next) => {
  //   const data = await req.models.Burtgel.findAll({
  //     include: [
  //       {
  //         model: req.models.Mergejil,
  //       },
  //     ],
  //   });
  const data = await req.sequelize.query(rawQueries.burtgelInfo, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json({
    status: 'success',
    data,
  });
});
exports.getCount = asyncHandler(async (req, res, next) => {
  // const data = await req.models.Burtgel.findAll({
  //   attributes: [
  //     'mergejilId',
  //     [
  //       req.models.sequelize.fn('COUNT', req.models.sequelize.col('mergejilId')),
  //       'Count',
  //     ],
  //   ],
  //   include: [
  //     {
  //       model: req.models.Mergejil,
  //       attributes: ['name'],
  //     },
  //   ],
  //   group: 'mergejilId',
  // });/*  more complex  */
  const data = await req.sequelize.query(rawQueries.getCount, {
    type: QueryTypes.SELECT,
  });
  const sdata = await req.sequelize.query(rawQueries.getSchoolBurtgelCount, {
    type: QueryTypes.SELECT,
  });
  const kdata = await req.models.Elsegch.findAll({
    attributes: [
      [
        req.sequelize.fn('COUNT', req.sequelize.col('burtgel_Id')),
        'burt',
      ],
    ],
    where: {
      komisId: {
        [Op.ne]: null,
      },
    },
  });
  const odata = await req.models.Elsegch.findAll({
    attributes: [
      [
        req.sequelize.fn('COUNT', req.sequelize.col('burtgel_Id')),
        'burt',
      ],
    ],
    where: {
      komisId: {
        [Op.eq]: null,
      },
    },
  });
  /* only one field */
  res.status(200).json({
    status: 'success',
    data,
    sdata,
    kdata,
    odata,
  });
});
