module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Shalguur',
    {
      Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      tableName: 'shalguur_medeelel',
      timestamps: false /* created updated */,
    }
  );
};
