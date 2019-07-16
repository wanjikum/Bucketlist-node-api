"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hashPassword = async password => {
  const SALTROUNDS = 12;
  const hashedPassword = await new Promise((resolve, reject) => {
    _bcrypt.default.hash(password, SALTROUNDS, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

var _default = hashPassword;
exports.default = _default;