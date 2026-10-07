const Joi = require("joi");

const updateCamionSchema = Joi.object({
  matricule: Joi.string().trim(),
  marque: Joi.string().trim(),
  modele: Joi.string().trim(),
  kilometrage: Joi.number().min(0),

  statut: Joi.string()
    .valid("disponible", "maintenance", "archive"),
}).min(1);

module.exports = updateCamionSchema;
