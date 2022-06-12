const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');

const router = require('express').Router();

router.get('/allinfo', async (req, res, next) => {
  const data = await req.db.sequelize.query(rawQueries.allInfo, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json({
    status: 'success',
    data,
  });
});

module.exports = router;