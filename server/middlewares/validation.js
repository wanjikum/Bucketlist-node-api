import Joi from 'joi';

const validateData = (source, schema) => (req, res, next) => {
  const { error } = Joi.validate(req[source], schema);
  if (error) {
    return res.status(422).json({
      data: { message: error.message },
    });
  }
  return next();
};

export default validateData;
