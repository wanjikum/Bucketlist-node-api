import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import UserModel from '../../models/users';
import hashPassword from '../utils/hash-password';
import userSchemas from './user-schema';

const { userSignUpSchema, userLogInSchema } = userSchemas;

const generateToken = id => jwt.sign({ id }, process.env.MY_SECRET, {
  expiresIn: process.env.ENVIRONMENT === 'DEVELOPMENT' ? 86400 : 600, // expires in 24 hours
});

const createUser = (req, res) => {
  const { error: validationError, value: userData } = Joi.validate(req.body, userSignUpSchema);
  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }
  UserModel.findOne({ email: userData.email }, async (err, user) => {
    if (err) {
      return res.status(500).send({ success: false, message: err });
    }
    if (user) {
      return res
        .status(409)
        .send({ success: false, message: `${userData.firstName} already exists` });
    }
    const { password } = userData;
    if (!password) {
      return res.send({ success: false, message: 'Password is required' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    newUser.save((error, newUserData) => {
      if (error) {
        res.status(500).send({ success: false, message: error.message });
      } else {
        const {
          _id: id, email, firstName, lastName,
        } = newUserData;

        const token = generateToken(id);

        res.status(201).send({
          message: `${userData.firstName} has been created successfully.`,
          userData: {
            id,
            email,
            firstName,
            lastName,
            token,
          },
          success: true,
        });
      }
    });
  });
};

const userLogin = (req, res) => {
  const { error: validationError, value: userData } = Joi.validate(req.body, userLogInSchema);
  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }
  UserModel.findOne({ email: userData.email }, (error, user) => {
    if (error) return res.status(500).send({ error, message: 'Error on server', success: false });

    if (!user) return res.status(404).send({ message: 'Email does not exist', success: false });

    const { _doc: userDetails } = user;
    const {
      id, password, __v: version, ...rest
    } = userDetails;
    const passwordIsValid = bcrypt.compareSync(req.body.password, password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid password' });

    const token = generateToken(id);

    res.status(200).send({ auth: true, userData: { ...rest, token, id }, success: true });
  });
};

export default { createUser, userLogin };
