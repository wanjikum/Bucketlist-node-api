import Joi from 'joi';

import bucketListSchema from './bucketlist-schema';
import BucketListModel from '../../models/bucketlist';

const createBucketList = (req, res) => {
  const { error: validationError, value: bucketlistData } = Joi.validate(
    { ...req.body, userId: req.userId },
    bucketListSchema,
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
  BucketListModel.findOne({ _id: req.params.id, userId: req.userId }, (err, bucketList) => {
    if (err) {
      res.status(500).send({ success: false, message: `Server Error: ${err}` });
    } else {
      res.status(200).send({ success: true, message: bucketList });
    }
  });
};

const getBucketLists = (req, res) => {
  BucketListModel.find({ userId: req.userId }, (err, bucketLists) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
    } else {
      res.status(200).send({
        success: true,
        bucketlistData: bucketLists || [],
        message: 'Bucketlist(s) retrieved successfully',
      });
    }
  });
};

export default { createBucketList, getbucketList, getBucketLists };
