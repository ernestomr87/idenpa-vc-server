'use strict';

var models = require('./../models');

module.exports = {
  list: function list(req, res) {
    return models.reg_inver_planif
      .findAll({
        include: [
          {
            model: models.entidad,
            as: 'entidad'
          }
        ]
      })
      .then(function(inversions) {
        return res.status(200).send(inversions);
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  },
  getById: function getById(req, res) {
    return models.reg_inver_planif
      .findById(req.params.id, {
        include: [
          {
            model: models.entidad,
            as: 'infrastructure'
          }
        ]
      })
      .then(function(inversion) {
        if (!inversion) {
          return res.status(404).send({
            message: 'Inversion Not Found'
          });
        }
        return res.status(200).send(inversion);
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  },
  add: function add(req, res) {
    return models.reg_inver_planif
      .create({
        id_entidad: req.body.id_entidad,
        inversion_name: req.body.inversion_name
      })
      .then(function(inversion) {
        return res.status(201).send(inversion);
      })
      .catch(function(error) {
        return res.status(400).send(error);
      });
  },
  update: function update(req, res) {
    return models.reg_inver_planif
      .findById(req.params.id, {
        include: [
          {
            model: models.entidad,
            as: 'infrastructure'
          },
          {
            model: Course,
            as: 'courses'
          }
        ]
      })
      .then(function(inversion) {
        if (!inversion) {
          return res.status(404).send({
            message: 'inversion Not Found'
          });
        }
        return inversion
          .update({
            inversion_name: req.body.inversion_name || classroom.inversion_name
          })
          .then(function() {
            return res.status(200).send(inversion);
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
    return models.reg_inver_planif
      .findById(req.params.id)
      .then(function(inversion) {
        if (!inversion) {
          return res.status(400).send({
            message: 'inversion Not Found'
          });
        }
        return inversion
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
