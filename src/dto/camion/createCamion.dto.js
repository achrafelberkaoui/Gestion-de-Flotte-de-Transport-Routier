const Joi = require("joi");

const createCamionSchema = Joi.object({
  matricule: Joi.string().trim().required(),
  marque: Joi.string().trim().required(),
  modele: Joi.string().trim().required(),
  kilometrage: Joi.number().min(0).default(0),

  statut: Joi.string()
    .valid("disponible", "maintenance", "archive")
    .default("disponible"),
});

module.exports = createCamionSchema;
