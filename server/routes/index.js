import express from 'express';

import userController from '../controllers/users/users';
import bucketlistController from '../controllers/bucketlists/bucketlists';
import bucketListItemController from '../controllers/bucketlist-items/bucketlist-item';

import auth from '../middlewares/check-token';
import validateData from '../middlewares/validation';

import userSchemas from '../controllers/users/user-schema';
import bucketlistSchema, {
  bucketlistUpdateSchema,
} from '../controllers/bucketlists/bucketlist-schema';

import bucketListItemSchema, {
  bucketListItemUpdateSchema,
} from '../controllers/bucketlist-items/bucketlist-item-schema';

const { createUser, userLogin } = userController;
const { userSignUpSchema, userLogInSchema } = userSchemas;

const {
  createBucketList,
  getbucketList,
  getBucketLists,
  updateBucketList,
  deleteBucketList,
} = bucketlistController;

const {
  createBucketListItem,
  getBucketListItems,
  updateBucketListItem,
  deleteBucketListItem,
  getbucketListItem,
} = bucketListItemController;

const router = express.Router();
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const checkBucketlistId = (req, res, next, id) => {
  if (!checkForHexRegExp.test(id)) {
    return res
      .status(400)
      .json({ message: 'The bucketlist id provided is not valid', success: false });
  }
  next();
};

const checkBucketlistItemId = (req, res, next, bucketlistItemId) => {
  if (!checkForHexRegExp.test(bucketlistItemId)) {
    return res
      .status(400)
      .json({ message: 'The bucketlist item id provided is not valid', success: false });
  }
  next();
};

router.param('id', checkBucketlistId);
router.param('bucketlistItemId', checkBucketlistItemId);

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Bucketlist API' });
});

router.post('/auth/signup', validateData('body', userSignUpSchema), createUser);
router.post('/auth/signin', validateData('body', userLogInSchema), userLogin);
router.post('/bucketlists', auth, validateData('body', bucketlistSchema), createBucketList);
router.get('/bucketlists/:id', auth, getbucketList);
router.get('/bucketlists', auth, getBucketLists);
router.put(
  '/bucketlists/:id',
  auth,
  validateData('body', bucketlistUpdateSchema),
  updateBucketList,
);
router.delete('/bucketlists/:id', auth, deleteBucketList);
router.post(
  '/bucketlists/:id/bucketlistItems/',
  auth,
  validateData('body', bucketListItemSchema),
  createBucketListItem,
);
router.get('/bucketlists/:id/bucketlistItems/', auth, getBucketListItems);
router.get('/bucketlists/:id/bucketlistItems/:bucketlistItemId', auth, getbucketListItem);
router.put(
  '/bucketlists/:id/bucketlistItems/:bucketlistItemId',
  auth,
  validateData('body', bucketListItemUpdateSchema),
  updateBucketListItem,
);
router.delete('/bucketlists/:id/bucketlistItems/:bucketlistItemId', auth, deleteBucketListItem);

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

export default router;
