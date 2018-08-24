const Infrastructure = require('./../models').entidad;
const Inversion = require('../models').reg_inver_planif;

module.exports = {
	list(req, res) {
		return Inversion.findAll({
			include: [
				{
					model: Infrastructure,
					as: 'entidad'
				}
			]
		})
			.then((inversions) => res.status(200).send(inversions))
			.catch((error) => {
				res.status(400).send(error);
			});
	},

	getById(req, res) {
		return Inversion.findById(req.params.id, {
			include: [
				{
					model: Infrastructure,
					as: 'infrastructure'
				}
			]
		})
			.then((inversion) => {
				if (!inversion) {
					return res.status(404).send({
						message: 'Inversion Not Found'
					});
				}
				return res.status(200).send(inversion);
			})
			.catch((error) => res.status(400).send(error));
	},

	add(req, res) {
		return Inversion.create({
			id_entidad: req.body.id_entidad,
			inversion_name: req.body.inversion_name
		})
			.then((inversion) => res.status(201).send(inversion))
			.catch((error) => res.status(400).send(error));
	},

	update(req, res) {
		return Inversion.findById(req.params.id, {
			include: [
				{
					model: Infrastructure,
					as: 'infrastructure'
				},
				{
					model: Course,
					as: 'courses'
				}
			]
		})
			.then((inversion) => {
				if (!inversion) {
					return res.status(404).send({
						message: 'inversion Not Found'
					});
				}
				return inversion
					.update({
						inversion_name: req.body.inversion_name || classroom.inversion_name
					})
					.then(() => res.status(200).send(inversion))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},

	delete(req, res) {
		return Inversion.findById(req.params.id)
			.then((inversion) => {
				if (!inversion) {
					return res.status(400).send({
						message: 'inversion Not Found'
					});
				}
				return inversion
					.destroy()
					.then(() => res.status(204).send())
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	}
};
