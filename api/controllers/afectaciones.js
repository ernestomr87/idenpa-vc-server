'use strict';

var Sequelize = require('sequelize');
var config = require('./../config/config.json')['development'];
var sequelize = new Sequelize(
  config.databaseTV,
  config.username,
  config.password,
  config
);

module.exports = {
  agroproductividad: function list(req, res) {
    let query = 'select * from get_afectsuelo(\'all\') as (area double precision, group_gid integer[],cat text)';

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  agroproductividadByMun: function list(req, res) {
    const municipio = req.params.municipio;
    let query = `select * from get_afectsuelo('${municipio}') as (area double precision, group_gid integer[],municipio character varying(50),cat text)`;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  parcelasAfectadas: function list(req, res) {
    let query = `select sum(parcela_agricola_afectada.area)/10000 as area , tipo_uso.nombre
    from parcela_agricola_afectada inner join tipo_uso on 
         parcela_agricola_afectada.tiposup = tipo_uso.tiposup and 
         parcela_agricola_afectada.tipouso = tipo_uso.tipouso and 
         parcela_agricola_afectada.espuso  = tipo_uso.espuso  
    group by tipo_uso.nombre`;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  parcelasAfectadasByMun: function list(req, res) {
    const municipio = req.params.municipio;
    let query = `select sum(parcela_agricola_afectada.area)/10000 as area , tipo_uso.nombre
    from parcela_agricola_afectada inner join tipo_uso on 
         parcela_agricola_afectada.tiposup = tipo_uso.tiposup and 
         parcela_agricola_afectada.tipouso = tipo_uso.tipouso and 
         parcela_agricola_afectada.espuso  = tipo_uso.espuso  
    where parcela_agricola_afectada.municipio_nombre = '${municipio}'
    group by tipo_uso.nombre`;

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
