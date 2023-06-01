const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');

const router = require('express').Router();

router.get('/hutulburView', async (req, res, next) => {
  const data = await req.sequelize.query(rawQueries.allInfo, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json({
    status: 'success',
    data,
  });
});

module.exports = router;
