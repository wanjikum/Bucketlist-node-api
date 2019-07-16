"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bucketListItemUpdateSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bucketListItemSchema = _joi.default.object().keys({
  name: _joi.default.string().trim().regex(/^[a-zA-Z ]+$/).min(2).max(50).required().error(new Error('Invalid name.')),
  status: _joi.default.string().trim().email().lowercase().valid('done', 'in progress', 'to do').required().error(new Error('Invalid status. It must be either done, in progress or to do.')),
  bucketlistId: _joi.default.string().error(new Error('Invalid bucketlist id.'))
});

const bucketListItemUpdateSchema = _joi.default.object().keys({
  name: _joi.default.string().trim().regex(/^[a-zA-Z ]+$/).min(2).max(50).error(new Error('Invalid name.')),
  status: _joi.default.string().trim().email().lowercase().valid('done', 'in progress', 'to do').error(new Error('Invalid status. It must be either done, in progress or to do.'))
});

exports.bucketListItemUpdateSchema = bucketListItemUpdateSchema;
var _default = bucketListItemSchema;
exports.default = _default;