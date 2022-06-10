module.exports = function (sequilze, DataTypes) {
  return sequilze.define(
    'Komis',
    {
      Tomilolt_Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'Id',
        },
      },
      s_alba_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 's_alba',
          key: 'SA_Id',
        },
      },
      aimag_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'aimag',
          key: 'Id',
        },
      },
      ognoo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: 'komis',
      timestamps: true,
    }
  );
};
