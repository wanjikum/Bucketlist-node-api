import jwt from 'jsonwebtoken';
import UserModel from '../models/users';
import hashPassword from './utils/hash-password';

const createUser = (req, res) => {
  UserModel.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
    } else if (user) {
      res.status(409).send({ success: false, message: `${req.body.firstName} already exists` });
    } else {
      const { password } = req.body;
      const hashedPassword = await hashPassword(password);
      const newUser = new UserModel({ ...req.body, password: hashedPassword });
      newUser.save((error, userData) => {
        if (error) {
          res.status(500).send({ success: false, message: error });
        } else {
          const {
            _id: id, email, firstName, lastName,
          } = userData;

          const token = jwt.sign({ id }, process.env.MY_SECRET, {
            expiresIn: process.env.ENVIRONMENT === 'DEVELOPMENT' ? 86400 : 600, // expires in 24 hours
          });

          res.status(201).send({
            message: `${req.body.firstName} has been created successfully.`,
            userData: {
              id,
              email,
              firstName,
              lastName,
              token,
            },
          });
        }
      });
    }
  });
};

export default { createUser };
