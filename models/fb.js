'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fb.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      email: DataTypes.STRING,
      facebookid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'fb',
    }
  );
  return fb;
};
