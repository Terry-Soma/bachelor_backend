module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'MSH',
    {
      Id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shalguuriin_turul: {
        type: DataTypes.ENUM({
          values: ['1', '2'],
        }),
        defaultValue: 2,
        allowNull: false,
      },
      MergejilId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'mergejil',
          key: 'Id',
        },
      },
      ShalguurId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'shalguur',
          key: 'Id',
        },
      },
    },
    {
      tableName: 'mergejil_shalguur',
      timestamps: true /* created updated */,
    }
  );
};
