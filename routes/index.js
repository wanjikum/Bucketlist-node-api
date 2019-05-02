import express from 'express';
import userController from '../controllers/users/users';
import bucketlistController from '../controllers/bucketlist/bucketlist';
import auth from '../middlewares/check-token';

const { createUser, userLogin } = userController;
const { createBucketList } = bucketlistController;

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Bucketlist API' });
});

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

router.post('/signup', createUser);
router.post('/signin', userLogin);
router.post('/auth/bucketlist', auth, createBucketList);

export default router;
