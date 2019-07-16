import Joi from 'joi';

const bucketListItemSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50)
    .required()
    .error(new Error('Invalid name.')),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .required()
    .error(new Error('Invalid status. It must be either done, in progress or to do.')),
  bucketlistId: Joi.string().error(new Error('Invalid bucketlist id.')),
});

export const bucketListItemUpdateSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50)
    .error(new Error('Invalid name.')),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .error(new Error('Invalid status. It must be either done, in progress or to do.')),
});

export default bucketListItemSchema;
