"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bucketlistSchema = new _mongoose.default.Schema({
  name: String,
  description: String,
  done: String,
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});
bucketlistSchema.plugin(_mongoosePaginate.default);

const BucketlistModel = _mongoose.default.model('Bucketlist', bucketlistSchema);

var _default = BucketlistModel;
exports.default = _default;