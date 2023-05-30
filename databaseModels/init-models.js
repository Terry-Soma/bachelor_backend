const DataTypes = require("sequelize").DataTypes;

// import models 
const models = [
  require('./Aimag.js'),
  require('./School'),
  require('./Hutulbur'),
  require('./Mergejil'),
  require('./Shalguur'),
  require('./S_alba'),
  require('./User'),
  require('./Komis'),
  require('./Elsegch.js'),
  require('./Tulbur'),
  require('./Burtgel'),
  require('./Mergejil_Shalguur')
]

function initModels(sequelize) {
  models.forEach(model => {

    const seqModel = model(sequelize, DataTypes);
    sequelize[seqModel.name] = seqModel;
  })
  // return {
  //   Categories,
  //   ProductLogs,
  //   Products,
  //   Users,
  //   Calls,
  // };
  // var Categories = _categories(sequelize, DataTypes);

  /* db modeling  */

  sequelize.School.hasMany(sequelize.Hutulbur, { foreignKey: 'schoolId' });
  sequelize.Hutulbur.belongsTo(sequelize.School, { foreignKey: 'schoolId' });

  sequelize.Hutulbur.hasMany(sequelize.Mergejil, { foreignKey: 'hutulburId' });
  sequelize.Mergejil.belongsTo(sequelize.Hutulbur, { foreignKey: 'hutulburId' });

  sequelize.Mergejil.belongsToMany(sequelize.Shalguur, { through: { model: sequelize.MSH, unique: false } });
  sequelize.Shalguur.belongsToMany(sequelize.Mergejil, { through: { model: sequelize.MSH, unique: false } });

  sequelize.Mergejil.hasMany(sequelize.MSH);
  sequelize.MSH.belongsTo(sequelize.Mergejil);
  sequelize.Shalguur.hasMany(sequelize.MSH);
  sequelize.MSH.belongsTo(sequelize.Shalguur);

  sequelize.User.hasMany(sequelize.Komis, { foreignKey: 'userId' });
  sequelize.Komis.belongsTo(sequelize.User, { foreignKey: 'userId' });

  sequelize.SA.hasMany(sequelize.Komis, { foreignKey: 's_alba_id' });
  sequelize.Komis.belongsTo(sequelize.SA, { foreignKey: 's_alba_id' });

  sequelize.Aimag.hasMany(sequelize.Komis, { foreignKey: 'aimag_id' });
  sequelize.Komis.belongsTo(sequelize.Aimag, { foreignKey: 'aimag_id' });

  sequelize.Aimag.hasMany(sequelize.Elsegch, { foreignKey: 'aimag_id' });
  sequelize.Elsegch.belongsTo(sequelize.Aimag, { foreignKey: 'aimag_id' });
  sequelize.Mergejil.hasMany(sequelize.Burtgel, { foreignKey: 'mergejilId' });
  sequelize.Burtgel.belongsTo(sequelize.Mergejil, { foreignKey: 'mergejilId' });

  // /* end db model association */



  // Products.belongsTo(Categories, { as: "category", foreignKey: "categoryId" });
  // Categories.hasMany(Products, { as: "products", foreignKey: "categoryId" });
  // ProductLogs.belongsTo(Products, { as: "product", foreignKey: "productId" });
  // Products.hasMany(ProductLogs, { as: "productLogs", foreignKey: "productId" });
  // ProductLogs.belongsTo(Users, { as: "user", foreignKey: "userId" });
  // Users.hasMany(ProductLogs, { as: "productLogs", foreignKey: "userId" });


}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
