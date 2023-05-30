'use strict';

if (process.env.NODE_ENV !== 'production') {
  const fs = require('fs');
  const path = require('path');
  const Sequelize = require('sequelize');
  const basename = path.basename(__filename);
  const env = process.env.NODE_ENV || 'development';
  // const config = require(__dirname + '/../config/config.json')[env];
  const db = {};
  // old code
  // let sequelize;
  // if (config.use_env_variable) {
  //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // } else {
  //   sequelize = new Sequelize(config.database, config.username, config.password, config);
  // }
  const sequelize = new Sequelize('ex', 'root', 'Agiimaa-247', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    env: 'development',
    pool: {
      maxConnections: 1,
      maxIdleTime: 30,
    },
  });

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  sequelize
    .authenticate()
    .then((res) => console.log('Connection has been established successfully.'))
    .catch((error) => console.log('Unable to connect to the database', error));

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;
}
