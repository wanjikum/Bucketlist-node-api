"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bucketlistUpdateSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bucketlistSchema = _joi.default.object().keys({
  name: _joi.default.string().trim().regex(/^[a-zA-Z ]+$/).min(2).max(30).required().error(new Error('Invalid name.')),
  description: _joi.default.string().trim().required().regex(/^[a-zA-Z0-9 ]+$/).min(3).max(100).error(new Error('Invalid description.')),
  status: _joi.default.string().trim().email().lowercase().valid('done', 'in progress', 'to do').required().error(new Error('Invalid status. It must be either done, in progress or to do.')),
  userId: _joi.default.string().error(new Error('Invalid user id.'))
});

const bucketlistUpdateSchema = _joi.default.object().keys({
  name: _joi.default.string().trim().regex(/^[a-zA-Z ]+$/).min(2).max(30).error(new Error('Invalid name.')),
  description: _joi.default.string().trim().regex(/^[a-zA-Z0-9 ]+$/).min(3).max(100).error(new Error('Invalid description.')),
  status: _joi.default.string().trim().email().lowercase().valid('done', 'in progress', 'to do').error(new Error('Invalid status. It must be either done, in progress or to do.')),
  userId: _joi.default.string().error(new Error('Invalid user id.'))
});

exports.bucketlistUpdateSchema = bucketlistUpdateSchema;
var _default = bucketlistSchema;
exports.default = _default;