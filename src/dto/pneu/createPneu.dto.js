const Joi = require("joi");

const createPneuSchema = Joi.object({
  reference: Joi.string().trim().required(),

  marque: Joi.string().trim().required(),

  etat: Joi.string().valid("neuf", "bon", "use", "a_remplacer").default("neuf"),

  kilometrageUsure: Joi.number().min(0).default(0),

  seuilUsure: Joi.number().min(1).required(),

  camion: Joi.string().hex().length(24).allow(null).optional(),
});

module.exports = createPneuSchema;
