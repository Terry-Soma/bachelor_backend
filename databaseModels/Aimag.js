module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Aimag',
    {
      Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ner: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'aimag',
      timestamps: false,
    }
  );
};
