import Joi from 'joi';

import bucketlistSchema, { bucketlistUpdateSchema } from '../bucketlist-schema';

describe('BucketlistSchemas', () => {
  describe('bucketlistSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      description: 'Visit',
      status: 'to do',
      userId: 'user 1',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketlistSchema);
      expect(error).toBeNull();
    });

    test('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).toEqual(new Error('Invalid name.'));
    });

    test('block incorrect description', () => {
      const invalidRequest = {
        ...baseRequest,
        description: true,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).toEqual(new Error('Invalid description.'));
    });

    test('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).toEqual(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    test('block incorrect userId', () => {
      const invalidRequest = {
        ...baseRequest,
        userId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).toEqual(new Error('Invalid user id.'));
    });
  });

  describe('bucketlistUpdateSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      description: 'Visit',
      status: 'to do',
      userId: 'user 1',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketlistUpdateSchema);
      expect(error).toBeNull();
    });

    test('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).toEqual(new Error('Invalid name.'));
    });

    test('block incorrect description', () => {
      const invalidRequest = {
        ...baseRequest,
        description: true,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).toEqual(new Error('Invalid description.'));
    });

    test('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).toEqual(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    test('block incorrect userId', () => {
      const invalidRequest = {
        ...baseRequest,
        userId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).toEqual(new Error('Invalid user id.'));
    });
  });
});
