"use strict";

var _joi = _interopRequireDefault(require("joi"));

var _userSchema = _interopRequireDefault(require("../user-schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UserSchema', () => {
  const {
    userSignUpSchema,
    userLogInSchema
  } = _userSchema.default;
  describe('user sign up schema', () => {
    const baseRequest = {
      firstName: 'mary',
      lastName: 'njugush',
      email: 'mary.njuguna@gmail.com',
      password: 'njuguna90'
    };
    test('allows baseRequest schema', () => {
      const {
        error
      } = _joi.default.validate(baseRequest, userSignUpSchema);

      expect(error).toBeNull();
    });
    test('does not allow invalid first name', () => {
      const invalidRequest = { ...baseRequest,
        firstName: true
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userSignUpSchema);

      expect(error).toEqual(new Error('Invalid first name.'));
    });
    test('does not allow invalid last name', () => {
      const invalidRequest = { ...baseRequest,
        lastName: '588742'
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userSignUpSchema);

      expect(error).toEqual(new Error('Invalid last name.'));
    });
    test('does not allow invalid email', () => {
      const invalidRequest = { ...baseRequest,
        email: '588742'
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userSignUpSchema);

      expect(error).toEqual(new Error('Invalid email.'));
    });
    test('does not allow invalid password', () => {
      const invalidRequest = { ...baseRequest,
        password: ''
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userSignUpSchema);

      expect(error).toEqual(new Error('Invalid password.'));
    });
  });
  describe('user log in schema', () => {
    const baseRequest = {
      email: 'mary.njuguna@gmail.com',
      password: 'njuguna90'
    };
    test('allows baseRequest schema', () => {
      const {
        error
      } = _joi.default.validate(baseRequest, userLogInSchema);

      expect(error).toBeNull();
    });
    test('does not allow invalid email', () => {
      const invalidRequest = { ...baseRequest,
        email: '588742'
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userLogInSchema);

      expect(error).toEqual(new Error('Invalid email.'));
    });
    test('does not allow invalid password', () => {
      const invalidRequest = { ...baseRequest,
        password: ''
      };

      const {
        error
      } = _joi.default.validate(invalidRequest, userLogInSchema);

      expect(error).toEqual(new Error('Invalid password.'));
    });
  });
});