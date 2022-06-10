module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Burtgel',
    {
      Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      elsegchId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'elsegch',
          key: 'burtgel_Id',
        },
      },
      ognoo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // defualtValue :
      },
      mergejilId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'mergejil',
          key: 'Id',
        },
      },
      tulburId: {
        type: DataTypes.INTEGER.UNSIGNED,
        // allowNull: false,
        references: {
          model: 'tburtgel',
          key: 'Id',
        },
      },
    },
    {
      tableName: 'eburtgel',
      timeStamps: true,
    }
  );
};
