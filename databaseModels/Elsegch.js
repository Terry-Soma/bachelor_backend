module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Elsegch',
    {
      burtgel_Id: {
        /* E_BURTGEL  */ type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      lname: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      fname: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      rd: {
        type: DataTypes.CHAR(10) /* pah */,
        allowNull: true,
      },
      gerchilgee_dugaar: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      bichig_barimt: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
      },
      utas: {
        type: DataTypes.CHAR(8),
        allowNull: true,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      aimag_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'aimag',
          key: 'Id',
        },
      },
      komisId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'komis',
          key: 'Tomilolt_Id',
        },
      },
    },
    {
      tableName: 'elsegch',
      timestamps: true,
    }
  );
};
