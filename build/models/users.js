"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const UserModel = _mongoose.default.model('User', userSchema);

var _default = UserModel;
exports.default = _default;