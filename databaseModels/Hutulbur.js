module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Hutulbur',
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
      s_time: {
        type: DataTypes.STRING(10),
        defaultValue: '4 жил',
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
      bosgo_onoo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      schoolId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'school',
          key: 'Id',
        },
      },
    },

    {
      tableName: 'hutulbur',
      timestamps: true /* created updated */,
    }
  );
};
