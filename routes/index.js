import express from 'express';
import userController from '../controllers/users/users';
import bucketlistController from '../controllers/bucketlists/bucketlists';
import auth from '../middlewares/check-token';

const { createUser, userLogin } = userController;
const {
  createBucketList, getbucketList, getBucketLists, updateBucketList,
} = bucketlistController;

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

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

export default router;
