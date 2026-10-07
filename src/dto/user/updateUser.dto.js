const Joi = require("joi");

const updateUserSchema = Joi.object({
  nom: Joi.string().trim(),

  email: Joi.string().trim().email(),

  password: Joi.string().min(6),

  role: Joi.string().valid("admin", "driver"),

  statut: Joi.string().valid("actif", "suspendu"),
}).min(1);

module.exports = updateUserSchema;
