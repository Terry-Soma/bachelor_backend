module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Tulbur',
    {
      Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      hemjee: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      turul: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      elsegchId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'elsegch',
          key: 'burtgel_Id',
        },
      },
      tulsun_ognoo: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      t_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: 'tburtgel',
      timestamps: true /* created updated */,
    }
  );
};
