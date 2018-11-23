"use strict";

var Sequelize = require("sequelize");
var config = require("./../config/config.json")["development"];
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = {
  getById: function getById(req, res) {
    var id = parseInt(req.params.id);

    let query = `
                SELECT infraestructura.entidad.gid,  infraestructura.entidad.nombre, infraestructura.entidad.tipo, infraestructura.entidad.inversion, inversiones.reg_inver_planif.programa, inversiones.reg_inver_planif.id_entidad, inversiones.reg_inver_planif.nombre_inversion, inversiones.reg_inver_planif.detalle_inversion, inversiones.reg_inver_planif.osde, inversiones.reg_inver_planif.year, inversiones.reg_inver_planif.id                            
                FROM infraestructura.entidad INNER JOIN inversiones.reg_inver_planif  ON infraestructura.entidad.gid = inversiones.reg_inver_planif.id_entidad 
                WHERE infraestructura.entidad.gid = ${id}
                order by inversiones.reg_inver_planif.year
                `;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
};
