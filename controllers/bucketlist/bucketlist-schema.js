import Joi from 'joi';

const bucketlistSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(30)
    .required(),
  description: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z0-9 ]+$/)
    .min(3)
    .max(15),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .required(),
  userId: Joi.string().required(),
});

export default bucketlistSchema;
