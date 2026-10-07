const Joi = require("joi");

const createRemorqueSchema = Joi.object({
  matricule: Joi.string().trim().required(),

  type: Joi.string().trim().required(),

  statut: Joi.string()
    .valid("disponible", "maintenance", "archive")
    .default("disponible"),
});

module.exports = createRemorqueSchema;
