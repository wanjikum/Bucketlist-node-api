import Joi from 'joi';

const bucketListItemSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50)
    .required(),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do')
    .required(),
  bucketlist_id: Joi.string().required(),
});

export const bucketListItemUpdateSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50),
  status: Joi.string()
    .trim()
    .email()
    .lowercase()
    .valid('done', 'in progress', 'to do'),
});

export default bucketListItemSchema;
