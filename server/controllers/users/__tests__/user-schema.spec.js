import Joi from 'joi';

import UserSchema from '../user-schema';

describe('UserSchema', () => {
  const { userSignUpSchema, userLogInSchema } = UserSchema;

  describe('user sign up schema', () => {
    const baseRequest = {
      firstName: 'mary',
      lastName: 'njugush',
      email: 'mary.njuguna@gmail.com',
      password: 'njuguna90',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, userSignUpSchema);
      expect(error).toBeNull();
    });

    test('does not allow invalid first name', () => {
      const invalidRequest = {
        ...baseRequest,
        firstName: true,
      };
      const { error } = Joi.validate(invalidRequest, userSignUpSchema);
      expect(error).toEqual(new Error('Invalid first name.'));
    });

    test('does not allow invalid last name', () => {
      const invalidRequest = {
        ...baseRequest,
        lastName: '588742',
      };
      const { error } = Joi.validate(invalidRequest, userSignUpSchema);
      expect(error).toEqual(new Error('Invalid last name.'));
    });

    test('does not allow invalid email', () => {
      const invalidRequest = {
        ...baseRequest,
        email: '588742',
      };
      const { error } = Joi.validate(invalidRequest, userSignUpSchema);
      expect(error).toEqual(new Error('Invalid email.'));
    });

    test('does not allow invalid password', () => {
      const invalidRequest = {
        ...baseRequest,
        password: '',
      };
      const { error } = Joi.validate(invalidRequest, userSignUpSchema);
      expect(error).toEqual(new Error('Invalid password.'));
    });
  });

  describe('user log in schema', () => {
    const baseRequest = {
      email: 'mary.njuguna@gmail.com',
      password: 'njuguna90',
    };

    test('allows baseRequest schema', () => {
      const { error } = Joi.validate(baseRequest, userLogInSchema);
      expect(error).toBeNull();
    });

    test('does not allow invalid email', () => {
      const invalidRequest = {
        ...baseRequest,
        email: '588742',
      };
      const { error } = Joi.validate(invalidRequest, userLogInSchema);
      expect(error).toEqual(new Error('Invalid email.'));
    });

    test('does not allow invalid password', () => {
      const invalidRequest = {
        ...baseRequest,
        password: '',
      };
      const { error } = Joi.validate(invalidRequest, userLogInSchema);
      expect(error).toEqual(new Error('Invalid password.'));
    });
  });
});
