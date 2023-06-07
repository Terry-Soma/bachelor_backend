module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'School',
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
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING() /* text */,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      tableName: 'school',
      timestamps: false /* created updated */,
    }
  );
};
