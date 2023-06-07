module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      fbid: {
        type: DataTypes.INTEGER,
      },
      phone: {
        type: DataTypes.STRING(8),
      },
      heltes: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      timestamps: false /* created updated */,
    }
  );
};
