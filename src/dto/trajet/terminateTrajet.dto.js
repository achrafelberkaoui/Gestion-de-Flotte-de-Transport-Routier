const Joi = require("joi");

const terminateTrajetSchema = Joi.object({
  kilometrageArrivee: Joi.number().min(0).required(),

  carburantConsomme: Joi.number().min(0).required(),
});

module.exports = terminateTrajetSchema;
