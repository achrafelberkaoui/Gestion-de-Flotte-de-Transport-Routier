const Joi = require("joi");

const updateTrajetSchema = Joi.object({
  origine: Joi.string().trim(),

  destination: Joi.string().trim(),

  dateDepart: Joi.date(),

  dateArrivee: Joi.date(),

  statut: Joi.string().valid("planifie", "en_cours", "annule"),
}).min(1);

module.exports = updateTrajetSchema;
