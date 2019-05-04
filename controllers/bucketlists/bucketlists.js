import Joi from 'joi';

import bucketListSchema from './bucketlist-schema';
import BucketListModel from '../../models/bucketlist';

const { bucketlistSchema } = bucketListSchema;

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
      newBucketlist.save((error, bucketList) => {
        if (error) {
          res.status(500).send({ success: false, message: err });
        } else {
          res.status(201).send({
            success: true,
            bucketListData: bucketList,
            message: `Bucketlist ${bucketlistData.name} has been created successfully`,
          });
        }
      });
    }
  });
};

const getbucketList = (req, res) => {
  BucketListModel.findOne({ _id: req.params.id }, (err, bucketList) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Bucketlist does not exist' });
    } else {
      res.status(200).send({ success: true, message: bucketList });
    }
  });
};

const getBucketLists = (req, res) => {
  BucketListModel.find({}, (err, bucketLists) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
    } else {
      res.status(200).send({ success: true, message: bucketLists });
    }
  });
};

export default { createBucketList, getbucketList, getBucketLists };
