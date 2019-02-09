'use strict';

var Sequelize = require('sequelize');
var config = require('./../config/config.json')['development'];
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = {
  forma_prodictiva: function list(req, res) {
    const id = req.params.id;
    let query = `select  infraestructura.plan_prod_fpa.id_fp, infraestructura.plan_prod_fpa.mes, infraestructura.plan_prod_fpa.indicador, infraestructura.plan_prod_fpa.tipo_indicador, infraestructura.plan_prod_fpa.cant, infraestructura.plan_prod_fpa.um
    from infraestructura.plan_prod_fpa
    where  plan_prod_fpa.id_fp = ${id}`;

    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  termos: function list(req, res) {
    const id = req.params.id;
    let query = `
    select acopio_leche_termo.id_termo , acopio_leche_termo.forma_prod_tributa, acopio_leche_termo.mes, acopio_leche_termo.cant, acopio_leche_termo.um, acopio_leche_termo.cant_productores,  (select infraestructura.termo_leche.nombre
      from infraestructura.forma_productiva inner join infraestructura.termo_leche on infraestructura.forma_productiva.gid = infraestructura.termo_leche.id_fp 
      where infraestructura.forma_productiva.gid = ${id}) as nombre_termo 
      from infraestructura.acopio_leche_termo
      where acopio_leche_termo.id_termo = (select infraestructura.termo_leche.gid
      from infraestructura.forma_productiva inner join infraestructura.termo_leche on infraestructura.forma_productiva.gid = infraestructura.termo_leche.id_fp 
      where infraestructura.forma_productiva.gid = ${id})`;
    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  usoTenencia: function list(req, res) {
    const id = req.params.id;
    console.log(id);
    let query = `
    select qposeedor, nombre_poseedor, nombre_sup, geom 
    from
    (select poseedor_quemado.identidad,poseedor_quemado.nombre as nombre_poseedor, quemado.poseedor as qposeedor, quemado.nombre as nombre_sup, ST_AsGeoJSON(quemado.geom) as geom
    from catastro.poseedor_quemado inner join catastro.quemado on catastro.poseedor_quemado.identidad = catastro.quemado.poseedor
    where poseedor_quemado.asociado = '${id}') as tabla`;


    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
        let ndata = data.map((item) => {
          return item.geom;
        });
        return res.status(200).send(ndata);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
};