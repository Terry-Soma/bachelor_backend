module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Mergejil',
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
      mergeshil: {
        type: DataTypes.STRING(1324),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      hutulburId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'hutulbur',
          key: 'id',
        },
      },
    },
    {
      tableName: 'mergejil',
      timestamps: false /* created updated */,
    }
  );
};
