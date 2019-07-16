import Joi from 'joi';
import { expect } from 'chai';

import bucketListItemSchema, {
  bucketListItemUpdateSchema,
} from '../server/controllers/bucketlist-items/bucketlist-item-schema';

describe('bucketListItemSchemas', () => {
  describe('bucketListItemSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      status: 'to do',
      bucketlistId: 'user 1',
    };

    it('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketListItemSchema);
      expect(error).to.be.a('null');
    });

    it('blocks incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).to.include(new Error('Invalid name.'));
    });

    it('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).to.include(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });

    it('block incorrect bucketlistId', () => {
      const invalidRequest = {
        ...baseRequest,
        bucketlistId: false,
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemSchema);
      expect(error).to.include(new Error('Invalid bucketlist id.'));
    });
  });

  describe('bucketListItemUpdateSchema', () => {
    const baseRequest = {
      name: 'Go to Kenya',
      status: 'to do',
    };

    it('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, bucketListItemUpdateSchema);
      expect(error).to.be.a('null');
    });

    it('block incorrect name', () => {
      const invalidRequest = {
        ...baseRequest,
        name: '@$@#$#@$',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemUpdateSchema);
      expect(error).to.include(new Error('Invalid name.'));
    });

    it('block incorrect status', () => {
      const invalidRequest = {
        ...baseRequest,
        status: '3444',
      };

      const { error } = Joi.validate(invalidRequest, bucketListItemUpdateSchema);
      expect(error).to.include(
        new Error('Invalid status. It must be either done, in progress or to do.'),
      );
    });
  });
});
