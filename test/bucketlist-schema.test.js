import Joi from 'joi';
import { expect } from 'chai';

import bucketlistSchema, {
  bucketlistUpdateSchema,
} from '../controllers/bucketlists/bucketlist-schema';

describe('BucketlistSchemas', () => {
  describe('bucketlistSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      description: 'Visit',
      status: 'to do',
      userId: 'user 1',
    };

    it('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketlistSchema);
      expect(error).to.be.a('null');
    });

    it('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).to.include(new Error('Invalid name.'));
    });

    it('block incorrect description', () => {
      const invalidRequest = {
        ...baseRequest,
        description: true,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).to.include(new Error('Invalid description.'));
    });

    it('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).to.include(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    it('block incorrect userId', () => {
      const invalidRequest = {
        ...baseRequest,
        userId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistSchema);
      expect(error).to.include(new Error('Invalid user id.'));
    });
  });

  describe('bucketlistUpdateSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      description: 'Visit',
      status: 'to do',
      userId: 'user 1',
    };

    it('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketlistUpdateSchema);
      expect(error).to.be.a('null');
    });

    it('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).to.include(new Error('Invalid name.'));
    });

    it('block incorrect description', () => {
      const invalidRequest = {
        ...baseRequest,
        description: true,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).to.include(new Error('Invalid description.'));
    });

    it('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).to.include(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    it('block incorrect userId', () => {
      const invalidRequest = {
        ...baseRequest,
        userId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketlistUpdateSchema);
      expect(error).to.include(new Error('Invalid user id.'));
    });
  });
});
