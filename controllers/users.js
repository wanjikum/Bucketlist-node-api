import UserModel from '../models/users';

const createUser = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
    } else if (user) {
      res.status(409).send({ success: false, message: `${req.body.firstName} already exists` });
    } else {
      const newUser = new UserModel(req.body);
      newUser.save((error) => {
        if (error) {
          res.status(500).send({ success: false, message: error });
        } else {
          res.status(201).send({
            success: true,
            message: `${req.body.firstName} has been created successfully`,
          });
        }
      });
    }
  });
};

export default { createUser };
