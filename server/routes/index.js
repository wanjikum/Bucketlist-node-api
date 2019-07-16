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

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Bucketlist API' });
});

router.post('/signup', validateData('body', userSignUpSchema), createUser);
router.post('/signin', validateData('body', userLogInSchema), userLogin);
router.post('/auth/bucketlists', auth, validateData('body', bucketlistSchema), createBucketList);
router.get('/auth/bucketlists/:id', auth, getbucketList);
router.get('/auth/bucketlists', auth, getBucketLists);
router.put(
  '/auth/bucketlists/:id',
  auth,
  validateData('body', bucketlistUpdateSchema),
  updateBucketList,
);
router.delete('/auth/bucketlists/:id', auth, deleteBucketList);
router.post(
  '/auth/bucketlists/:id/bucketlistItems/',
  auth,
  validateData('body', bucketListItemSchema),
  createBucketListItem,
);
router.get('/auth/bucketlists/:id/bucketlistItems/', auth, getBucketListItems);
router.get('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', auth, getbucketListItem);
router.put(
  '/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId',
  auth,
  validateData('body', bucketListItemUpdateSchema),
  updateBucketListItem,
);
router.delete(
  '/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId',
  auth,
  deleteBucketListItem,
);

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

export default router;