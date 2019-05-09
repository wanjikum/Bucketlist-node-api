import express from 'express';
import userController from '../controllers/users/users';
import bucketlistController from '../controllers/bucketlists/bucketlists';
import bucketListItemController from '../controllers/bucketlist-items/bucketlist-item';
import auth from '../middlewares/check-token';

const { createUser, userLogin } = userController;
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

router.post('/signup', createUser);
router.post('/signin', userLogin);
router.post('/auth/bucketlists', auth, createBucketList);
router.get('/auth/bucketlists/:id', auth, getbucketList);
router.get('/auth/bucketlists', auth, getBucketLists);
router.put('/auth/bucketlists/:id', auth, updateBucketList);
router.delete('/auth/bucketlists/:id', auth, deleteBucketList);
router.post('/auth/bucketlists/:id/bucketlistItems/', auth, createBucketListItem);
router.get('/auth/bucketlists/:id/bucketlistItems/', auth, getBucketListItems);
router.get('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', auth, getbucketListItem);
router.put('/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId', auth, updateBucketListItem);
router.delete(
  '/auth/bucketlists/:id/bucketlistItems/:bucketlistItemId',
  auth,
  deleteBucketListItem,
);

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

export default router;
