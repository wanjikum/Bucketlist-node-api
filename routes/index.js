import express from 'express';

import userController from '../controllers/users';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Bucketlist API' });
});

router.post('/signup', userController.createUser);

export default router;
