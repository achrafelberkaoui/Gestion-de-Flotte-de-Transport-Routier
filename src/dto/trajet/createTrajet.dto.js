const Joi = require("joi");

const createTrajetSchema = Joi.object({
  origine: Joi.string().trim().required(),

  destination: Joi.string().trim().required(),

  dateDepart: Joi.date().required(),

  camion: Joi.string().hex().length(24).required(),

  remorque: Joi.string().hex().length(24).required(),

  chauffeur: Joi.string().hex().length(24).required(),
});

module.exports = createTrajetSchema;
