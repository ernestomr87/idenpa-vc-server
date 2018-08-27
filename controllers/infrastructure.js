const Infrastructure = require('./../models').entidad;
const Inversion = require('../models').reg_inver_planif;

module.exports = {
	list(req, res) {
		return Infrastructure.findAll({
			include: [
				{
					model: Inversion,
					as: 'inversions'
				}
			]
		})
			.then((infrastructures) => res.status(200).send(infrastructures))
			.catch((error) => {
				res.status(400).send(error);
			});
	},

	getById(req, res) {
		const id = parseInt(req.params.id);
		return Infrastructure.findOne({
			where: { gid: id },
			include: [
				{
					model: Inversion,
					as: 'inversions'
				}
			]
		})
			.then((infrastructure) => {
				if (!infrastructure) {
					return res.status(404).send({
						message: 'Infrastructure Not Found'
					});
				}
				return res.status(200).send(infrastructure);
			})
			.catch((error) => res.status(400).send(error));
	},

	add(req, res) {
		return Infrastructure.create({
			class_name: req.body.class_name
		})
			.then((infrastructures) => res.status(201).send(infrastructures))
			.catch((error) => res.status(400).send(error));
	},

	update(req, res) {
		return Infrastructure.findById(req.params.id, {
			include: [
				{
					model: Inversion,
					as: 'inversions'
				}
			]
		})
			.then((infrastructures) => {
				if (!infrastructures) {
					return res.status(404).send({
						message: 'Infrastructure Not Found'
					});
				}
				return infrastructures
					.update({
						class_name: req.body.class_name || infrastructures.class_name
					})
					.then(() => res.status(200).send(infrastructures))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},

	delete(req, res) {
		return Infrastructure.findById(req.params.id)
			.then((infrastructures) => {
				if (!infrastructures) {
					return res.status(400).send({
						message: 'infrastructures Not Found'
					});
				}
				return infrastructures
					.destroy()
					.then(() => res.status(204).send())
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	}
};
