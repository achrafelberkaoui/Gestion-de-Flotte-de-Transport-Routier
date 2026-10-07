const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        message: "validation error",
        error : error.details.map((detail) => detail.message),
      });
    }
      req.body = value;
      next();
  };
};
module.exports = validate;