import Joi from 'joi';

import bucketlistSchema from './bucketlist-schema';
import BucketListModel from '../../models/bucketlist';

const createBucketList = (req, res) => {
  const { error: validationError, value: bucketlistData } = Joi.validate(
    { ...req.body, userId: req.userId },
    bucketlistSchema,
  );

  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }

  BucketListModel.findOne({ name: bucketlistData.name }, (err, bucketlist) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Server encountered problem while saving.' });
    } else if (bucketlist) {
      res.status(409).send({ success: false, message: 'Bucketlist already exists' });
    } else {
      const newBucketlist = new BucketListModel(bucketlistData);
      newBucketlist.save((error) => {
        if (error) {
          res.status(500).send({ success: false, message: err });
        } else {
          res.status(201).send({
            sucess: true,
            message: `Bucketlist ${bucketlistData.name} has been created successfully`,
          });
        }
      });
    }
  });
};

export default { createBucketList };
