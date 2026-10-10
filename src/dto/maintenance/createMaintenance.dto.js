const Joi = require("joi");

const createMaintenanceSchema = Joi.object({
  camion: Joi.string().hex().length(24).required(),

  type: Joi.string().valid("pneus", "vidange", "revision").required(),

  seuilKilometrage: Joi.number().integer().min(1).required(),

  kilometrageDerniereMaintenance: Joi.number().min(0).default(0),
});

module.exports = createMaintenanceSchema;