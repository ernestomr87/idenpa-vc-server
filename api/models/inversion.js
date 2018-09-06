'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports.default = function(sequelize, DataTypes) {
  var Inversion = sequelize.define(
    'reg_inver_planif',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      year: DataTypes.INTEGER,
      osde: DataTypes.STRING,
      detalle_inversion: DataTypes.STRING,
      nombre_inversion: DataTypes.STRING,
      id_entidad: DataTypes.INTEGER,
      programa: DataTypes.STRING
    },
    {
      timestamps: false,
      schema: 'inversiones'
    }
  );

  Inversion.associate = function(models) {
    // associations can be defined here
    Inversion.belongsTo(models.entidad, { foreignKey: 'id_entidad', sourceKey: 'gid' });
  };
  return Inversion;
};
