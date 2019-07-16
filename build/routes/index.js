"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users/users"));

var _bucketlists = _interopRequireDefault(require("../controllers/bucketlists/bucketlists"));

var _bucketlistItem = _interopRequireDefault(require("../controllers/bucketlist-items/bucketlist-item"));

var _checkToken = _interopRequireDefault(require("../middlewares/check-token"));

var _validation = _interopRequireDefault(require("../middlewares/validation"));

var _userSchema = _interopRequireDefault(require("../controllers/users/user-schema"));

var _bucketlistSchema = _interopRequireWildcard(require("../controllers/bucketlists/bucketlist-schema"));

var _bucketlistItemSchema = _interopRequireWildcard(require("../controllers/bucketlist-items/bucketlist-item-schema"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  createUser,
  userLogin
} = _users.default;
const {
  userSignUpSchema,
  userLogInSchema
} = _userSchema.default;
const {
  createBucketList,
  getbucketList,
  getBucketLists,
  updateBucketList,
  deleteBucketList
} = _bucketlists.default;
const {
  createBucketListItem,
  getBucketListItems,
  updateBucketListItem,
  deleteBucketListItem,
  getbucketListItem
} = _bucketlistItem.default;

const router = _express.default.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Bucketlist API'
  });
});
router.post('/signup', (0, _validation.default)('body', userSignUpSchema), createUser);
router.post('/signin', (0, _validation.default)('body', userLogInSchema), userLogin);
router.post('/auth/bucketlists', _checkToken.default, (0, _validation.default)('body', _bucketlistSchema.default), createBucketList);
router.get('/auth/bucketlists/:id', _checkToken.default, getbucketList);
router.get('/auth/bucketlists', _checkToken.default, getBucketLists);
router.put('/auth/bucketlists/:id', _checkToken.default, (0, _validation.default)('body', _bucketlistSchema.bucketlistUpdateSchema), updateBucketList);
router.delete('/auth/bucketlists/:id', _checkToken.default, deleteBucketList);
router.post('/auth/bucketlists/:id/bucketlistItems/', _checkToken.default, (0, _validation.default)('body', _bucketlistItemSchema.default), createBucketListItem);
router.get('/auth/bucketlists/:id/bucketlistItems/', _checkToken.default, getBucketListItems);
router.get('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', _checkToken.default, getbucketListItem);
router.put('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', _checkToken.default, (0, _validation.default)('body', _bucketlistItemSchema.bucketListItemUpdateSchema), updateBucketListItem);
router.delete('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', _checkToken.default, deleteBucketListItem);
router.get('*', (req, res) => {
  res.status(404).send({
    message: 'Route not found'
  });
});
var _default = router;
exports.default = _default;