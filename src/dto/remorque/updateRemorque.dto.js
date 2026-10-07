const Joi = require("joi");

const updateRemorqueSchema = Joi.object({
  matricule: Joi.string().trim(),

  type: Joi.string().trim(),

  statut: Joi.string().valid("disponible", "maintenance", "archive"),
}).min(1);

module.exports = updateRemorqueSchema;
