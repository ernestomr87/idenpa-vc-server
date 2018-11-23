'use strict';

var Sequelize = require('sequelize');
var config = require('./../config/config.json')['development'];
var sequelize = new Sequelize(config.databaseTV, config.username, config.password, config);

module.exports = {
  agroproductividad: function list(req, res) {
    let query = `select 
                    SUM(area),municipio, st_AsGeoJson(st_union(geom)) as singlegeom,
                    CASE
                        WHEN cat_gral10_cult <= 1.99 THEN '1'
                        WHEN cat_gral10_cult > 1.99 AND cat_gral10_cult <= 2.99 THEN '2'
                        WHEN cat_gral10_cult > 2.99 AND cat_gral10_cult <= 3.69 THEN '3'
                        WHEN cat_gral10_cult > 3.69 THEN '4'
                    END AS cat_agrop      
                from suelo_afectado
                group by cat_agrop, municipio
                order by cat_agrop
                `;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  test:function (req,res) {
    let query = `select * from get_afectsuelo('all') as (area double precision, group_gid integer[],cat text)`;

    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};
