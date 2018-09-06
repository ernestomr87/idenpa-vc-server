'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Infrastructure = _models2.default.entidad,
  Inversion = _models2.default.reg_inver_planif; // import { entidad as Infrastructure } from './../models';
// import { reg_inver_planif as Inversion } from '../models';

exports.default = {
  list: function list(req, res) {
    return Infrastructure.findAll({
      include: [
        {
          model: Inversion,
          as: 'inversions'
        }
      ]
    })
      .then(function(infrastructures) {
        return res.status(200).send(infrastructures);
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  },
  getById: function getById(req, res) {
    var id = parseInt(req.params.id);
    return Infrastructure.findOne({
      where: { gid: id },
      include: [
        {
          model: Inversion,
          as: 'inversions'
        }
      ]
    })
      .then(function(infrastructure) {
        if (!infrastructure) {
          return res.status(404).send({
            message: 'Infrastructure Not Found'
          });
        }
        return res.status(200).send(infrastructure);
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  },
  add: function add(req, res) {
    return Infrastructure.create({
      class_name: req.body.class_name
    })
      .then(function(infrastructures) {
        return res.status(201).send(infrastructures);
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  },
  update: function update(req, res) {
    return Infrastructure.findById(req.params.id, {
      include: [
        {
          model: Inversion,
          as: 'inversions'
        }
      ]
    })
      .then(function(infrastructures) {
        if (!infrastructures) {
          return res.status(404).send({
            message: 'Infrastructure Not Found'
          });
        }
        return infrastructures
          .update({
            class_name: req.body.class_name || infrastructures.class_name
          })
          .then(function() {
            return res.status(200).send(infrastructures);
          })
          .catch(function(error) {
            return res.status(400).send(error);
          });
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  },
  delete: function _delete(req, res) {
    return Infrastructure.findById(req.params.id)
      .then(function(infrastructures) {
        if (!infrastructures) {
          return res.status(400).send({
            message: 'infrastructures Not Found'
          });
        }
        return infrastructures
          .destroy()
          .then(function() {
            return res.status(204).send();
          })
          .catch(function(error) {
            return res.status(400).send(error);
          });
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  }
};
