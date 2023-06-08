const AppError = require('../utils/_appError');
const { Op } = require('sequelize');
const asyncHandler = require('../middlewares/_asyncHandler');
const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');

exports.getAll = asyncHandler(async (req, res, next) => {
  const data = await req.sequelize.query(rawQueries.burtgelInfo, {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getSchoolAndCount = asyncHandler(async (req, res, next) => {
  const data = await req.sequelize.query(rawQueries.schoolAndCount, {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    status: 'success',
    data,
  });
});
exports.getCount = asyncHandler(async (req, res, next) => {
  let elsegchToo = await req.sequelize.query(rawQueries.getCountElsegch, {
    type: QueryTypes.SELECT,
  });
  elsegchToo = elsegchToo[0]?.too
  let allEbtoo = await req.sequelize.query(rawQueries.countEburtgel, {
    type: QueryTypes.SELECT,
  });
  allEbtoo = allEbtoo[0]?.m_too
  const data = await req.sequelize.query(rawQueries.burtgelInfo, {
    type: QueryTypes.SELECT,
  });
  /* only one field */
  res.status(200).json({
    status: 'success',
    elsegchToo,
    allMergejilCount: allEbtoo,
  });
});
