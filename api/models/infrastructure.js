'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports.default = function(sequelize, DataTypes) {
  var Infrastructure = sequelize.define(
    'entidad',
    {
      gid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      geom: DataTypes.GEOMETRY,
      nombre: DataTypes.STRING,
      tipo: DataTypes.STRING,
      inversion: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      schema: 'infraestructura'
    }
  );

  Infrastructure.associate = function(models) {
    // associations can be defined here
    Infrastructure.hasMany(models.reg_inver_planif, {
      foreignKey: 'id_entidad',
      sourceKey: 'gid',
      as: 'inversions'
    });
  };
  return Infrastructure;
};
