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
    let query = `select * from get_afectsuelo(\'all\') as (area double precision, group_gid integer[],cat text)`;

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
  },
  usufructuariosAfectados: function list(req, res) {
    let query = `select * from get_afectsuelo(\'all\') as (area double precision, group_gid integer[],cat text)`;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  usufructuariosAfectadosByMun: function list(req, res) {
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
  ascensoDelNivelMedioDelMar: function list(req, res) {
    let query = `SELECT
    ascenso_nmm.gid, 
    ascenso_nmm.municipio, 
    ascenso_nmm.area, 
    ascenso_nmm.distancia_ascenso, 
    ascenso_nmm.year_ascenso
  FROM 
    public.ascenso_nmm
  `;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  ascensoDelNivelMedioDelMarByMun: function list(req, res) {
    const municipio = req.params.municipio;
    let query = `SELECT 
    ascenso_nmm.gid, 
    ascenso_nmm.municipio, 
    ascenso_nmm.area, 
    ascenso_nmm.distancia_ascenso, 
    ascenso_nmm.year_ascenso
  FROM 
    public.ascenso_nmm
  WHERE 
    ascenso_nmm.municipio = '${municipio}'`;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  areaIntrusionMarina: function list(req, res) {
    let query = `SELECT 
    area_intrusion_marina.municipio,
    area_intrusion_marina.gid, 
    area_intrusion_marina.area
  FROM 
    public.area_intrusion_marina;
  `;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  areaIntrusionMarinaByMun: function list(req, res) {
    const municipio = req.params.municipio;
    let query = `SELECT 
    area_intrusion_marina.municipio,
    area_intrusion_marina.gid, 
    area_intrusion_marina.area
  FROM 
    public.area_intrusion_marina
  WHERE 
    area_intrusion_marina.municipio = '${municipio}';
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
