const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
let db = {};
let sequelize;

sequelize = new Sequelize(
  process.env.LOCAL_SEQUILIZE_DATABASE,
  process.env.LOCAL_SEQUILIZE_USER,
  process.env.LOCAL_SEQUILIZE_USER_PASSWORD,
  {
    host: process.env.LOCAL_SEQUILIZE_HOST,
    port: process.env.LOCAL_SEQUILIZE_PORT,
    dialect: process.env.LOCAL_SEQUILIZE_DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 60000,
      idle: 10000,
    },
    // operatorAliases: false,
  }
);

/* auto fs read */
const models = [
  require('../models/Aimag.js'),
  require('../models/School'),
  require('../models/Hutulbur'),
  require('../models/Mergejil'),
  require('../models/Shalguur'),
  require('../models/S_alba'),
  require('../models/User'),
  require('../models/Komis'),
  require('../models/Elsegch.js'),
  require('../models/Tulbur'),
  require('../models/Burtgel'),
  require('../models/Mergejil_Shalguur'),
];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});
db.sequelize = sequelize;
module.exports = db;
