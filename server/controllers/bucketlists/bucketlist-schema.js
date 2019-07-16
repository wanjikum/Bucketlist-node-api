import Joi from 'joi';

const bucketlistSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(30)
    .required()
    .error(new Error('Invalid name.')),
  description: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z0-9 ]+$/)
    .min(3)
    .max(100)
    .error(new Error('Invalid description.')),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .required()
    .error(new Error('Invalid status. It must be either done, in progress or to do.')),
  userId: Joi.string().error(new Error('Invalid user id.')),
});

export const bucketlistUpdateSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(30)
    .error(new Error('Invalid name.')),
  description: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9 ]+$/)
    .min(3)
    .max(100)
    .error(new Error('Invalid description.')),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .error(new Error('Invalid status. It must be either done, in progress or to do.')),
  userId: Joi.string().error(new Error('Invalid user id.')),
});

export default bucketlistSchema;
