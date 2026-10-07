const Joi = require("joi");

const createUserSchema = Joi.object({
  nom: Joi.string().trim().required(),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).required(),

  role: Joi.string().valid("admin", "driver").default("driver"),

  statut: Joi.string().valid("actif", "suspendu").default("actif"),
});

module.exports = createUserSchema;
