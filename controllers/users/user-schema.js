import Joi from 'joi';

const userSignUpSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .required(),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(15),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
    .min(7)
    .max(15)
    .required(),
});

const userLogInSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .error(new Error('Invalid email')),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
    .min(7)
    .max(15)
    .required(),
});

export default {
  userSignUpSchema,
  userLogInSchema,
};
