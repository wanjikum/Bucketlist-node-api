"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bucketListItemSchema = new _mongoose.default.Schema({
  name: String,
  status: String,
  bucketlistId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Bucketlist'
  },
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});
bucketListItemSchema.plugin(_mongoosePaginate.default);

const BucketListItemsModel = _mongoose.default.model('BucketlistItems', bucketListItemSchema);

var _default = BucketListItemsModel;
exports.default = _default;