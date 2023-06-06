const _asyncHandler = require('../middlewares/_asyncHandler');
const path = require('path');
const fs = require('fs');

const router = require('express').Router();

const school = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/school.json', 'utf-8')
);

const aimag = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/aimag.json', 'utf-8')
);

const hutulbur = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/hutulbur.json', 'utf-8')
);
const shalguur = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/shalguur.json', 'utf-8')
);
const mergejil = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/mergejil.json', 'utf-8')
);
const msh = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/mergejilShalgalt.json', 'utf-8')
);
let arr = msh.map(el => {
  if (el["Id"])
    delete el["Id"]
  return el;
});

const user = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/user.json', 'utf-8')
);
const alba = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/s_alba.json', 'utf-8')
);
const komis = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/komis.json', 'utf-8')
);
const importData = _asyncHandler(async (req, res, next) => {
  console.log(req.sequelize)

  await req.models.Aimag.bulkCreate(aimag);
  await req.models.Shalguur.bulkCreate(shalguur);
  await req.models.School.bulkCreate(school);
  await req.models.Hutulbur.bulkCreate(hutulbur);
  await req.models.Mergejil.bulkCreate(mergejil);
  await req.models.MSH.bulkCreate(arr);
  await req.models.User.bulkCreate(user);
  await req.models.SA.bulkCreate(alba);
  await req.models.Komis.bulkCreate(komis);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

const deleteData = _asyncHandler(async (req, res, next) => {
  await req.models.Aimag.destroy({ where: {} });
  await req.models.School.destroy({ where: {} });
  await req.models.Hutulbur.destroy({ where: {} });
  await req.models.Shalguur.destroy({ where: {} });
  await req.models.MSH.destroy({ where: {} });
  await req.models.Mergejil.destroy({ where: {} });

  res.status(204).json({
    data: null,
  });
});

router.route('/').get(importData).post(deleteData);

module.exports = router;
