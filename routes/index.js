import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.status(200).send({ name: req.body.name, message: 'Welcome to the users route' });
});

export default router;
