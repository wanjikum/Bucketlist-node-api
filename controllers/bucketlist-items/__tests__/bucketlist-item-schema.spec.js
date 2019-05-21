import Joi from 'joi';

import bucketListItemSchema, { bucketListItemUpdateSchema } from '../bucketlist-item-schema';

describe('bucketListItemSchemas', () => {
  describe('bucketListItemSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      status: 'to do',
      bucketlistId: 'user 1',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketListItemSchema);
      expect(error).toBeNull();
    });

    test('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).toEqual(new Error('Invalid name.'));
    });

    test('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).toEqual(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    test('block incorrect bucketlistId', () => {
      const invalidRequest = {
        ...baseRequest,
        bucketlistId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).toEqual(new Error('Invalid bucketlist id.'));
    });
  });

  describe('bucketListItemUpdateSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      status: 'to do',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketListItemUpdateSchema);
      expect(error).toBeNull();
    });

    test('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemUpdateSchema);
      expect(error).toEqual(new Error('Invalid name.'));
    });

    test('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemUpdateSchema);
      expect(error).toEqual(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });
  });
});
