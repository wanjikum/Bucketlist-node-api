"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateData = (source, schema) => (req, res, next) => {
  const {
    error
  } = _joi.default.validate(req[source], schema);

  if (error) {
    return res.status(422).json({
      data: {
        message: error.message
      }
    });
  }

  return next();
};

var _default = validateData;
exports.default = _default;