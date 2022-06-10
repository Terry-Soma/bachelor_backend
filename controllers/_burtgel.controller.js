const AppError = require('../utils/_appError');
const { Op } = require('sequelize');
const asyncHandler = require('../middlewares/_asyncHandler');
const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');

exports.getAll = asyncHandler(async (req, res, next) => {
  //   const data = await req.db.Burtgel.findAll({
  //     include: [
  //       {
  //         model: req.db.Mergejil,
  //       },
  //     ],
  //   });
  const data = await req.db.sequelize.query(rawQueries.burtgelInfo, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json({
    status: 'success',
    data,
  });
});
exports.getCount = asyncHandler(async (req, res, next) => {
  // const data = await req.db.Burtgel.findAll({
  //   attributes: [
  //     'mergejilId',
  //     [
  //       req.db.sequelize.fn('COUNT', req.db.sequelize.col('mergejilId')),
  //       'Count',
  //     ],
  //   ],
  //   include: [
  //     {
  //       model: req.db.Mergejil,
  //       attributes: ['name'],
  //     },
  //   ],
  //   group: 'mergejilId',
  // });/*  more complex  */
  const data = await req.db.sequelize.query(rawQueries.getCount, {
    type: QueryTypes.SELECT,
  });
  const sdata = await req.db.sequelize.query(rawQueries.getSchoolBurtgelCount, {
    type: QueryTypes.SELECT,
  });
  const kdata = await req.db.Elsegch.findAll({
    attributes: [
      [
        req.db.sequelize.fn('COUNT', req.db.sequelize.col('burtgel_Id')),
        'burt',
      ],
    ],
    where: {
      komisId: {
        [Op.ne]: null,
      },
    },
  });
  const odata = await req.db.Elsegch.findAll({
    attributes: [
      [
        req.db.sequelize.fn('COUNT', req.db.sequelize.col('burtgel_Id')),
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
