"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSignUpSchema = _joi.default.object().keys({
  firstName: _joi.default.string().trim().regex(/^[a-zA-Z]+$/).min(2).max(15).required().error(new Error('Invalid first name.')),
  lastName: _joi.default.string().trim().required().regex(/^[a-zA-Z]+$/).min(3).max(15).error(new Error('Invalid last name.')),
  email: _joi.default.string().trim().email().lowercase().required().error(new Error('Invalid email.')),
  password: _joi.default.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).min(7).max(15).required().error(new Error('Invalid password.'))
});

const userLogInSchema = _joi.default.object().keys({
  email: _joi.default.string().email().lowercase().required().error(new Error('Invalid email.')),
  password: _joi.default.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).min(7).max(15).required().error(new Error('Invalid password.'))
});

var _default = {
  userSignUpSchema,
  userLogInSchema
};
exports.default = _default;