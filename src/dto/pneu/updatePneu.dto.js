const Joi = require("joi");

const updatePneuSchema = Joi.object({
  reference: Joi.string().trim(),

  marque: Joi.string().trim(),

  etat: Joi.string().valid("neuf", "bon", "use", "a_remplacer"),

  kilometrageUsure: Joi.number().min(0),

  seuilUsure: Joi.number().min(1),

  camion: Joi.string().hex().length(24).allow(null),
}).min(1);

module.exports = updatePneuSchema;
