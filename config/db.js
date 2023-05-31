const Sequelize = require('sequelize');
// const sequelize = new Sequelize(`postgres://jak:PRc80RZjVnZy3EBiqD4KqvTe88msfvlL@dpg-chr0u6grddlba9p4jlv0-a.singapore-postgres.render.com/bachelor_backend`, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl: true,
//     native: true
//   }//removed ssl
// })

const sequelize = new Sequelize(
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

module.exports = sequelize;
