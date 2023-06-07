module.exports = function (sequilze, DataTypes) {
  return sequilze.define(
    'SA' /* surgaltiin albanii hunii medeelel */,
    {
      SA_Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      //   other:
    },
    {
      tableName: 's_alba',
      timestamps: false,
    }
  );
};
