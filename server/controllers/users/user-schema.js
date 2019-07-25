import Joi from 'joi';

const userSignUpSchema = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .required()
    .error(new Error('Invalid first name.')),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(15)
    .error(new Error('Invalid last name.')),
  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .error(new Error('Invalid email.')),
  password: Joi.string()
    .min(4)
    .max(15)
    .required()
    .error(new Error('Invalid password.')),
});

const userLogInSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .error(new Error('Invalid email.')),
  password: Joi.string()
    .min(4)
    .max(15)
    .required()
    .error(new Error('Invalid password.')),
});

export default {
  userSignUpSchema,
  userLogInSchema,
};
