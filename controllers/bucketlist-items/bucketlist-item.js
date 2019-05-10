import Joi from 'joi';

import bucketListItemSchema, { bucketListItemUpdateSchema } from './bucketlist-item-schema';
import BucketListItemModel from '../../models/bucketlist-items';

const createBucketListItem = (req, res) => {
  const { error: validationError, value: bucketListItemData } = Joi.validate(
    { ...req.body, bucketlist_id: req.params.id },
    bucketListItemSchema,
  );

  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }

  BucketListItemModel.findOne(
    { name: bucketListItemData.name, bucketlist_id: bucketListItemData.bucketlist_id },
    (err, bucketListItem) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, message: 'Server encountered problem while saving.' });
      } else if (bucketListItem) {
        res.status(409).send({ success: false, message: 'Bucketlist already exists' });
      } else {
        const newBucketListItem = new BucketListItemModel(bucketListItemData);
        newBucketListItem.save((error, newBucketListItemData) => {
          if (error) {
            res.status(500).send({ success: false, message: err });
          } else {
            res.status(201).send({
              success: true,
              bucketListItemData: newBucketListItemData,
              message: `BucketListItem ${newBucketListItemData.name} has been created successfully`,
            });
          }
        });
      }
    },
  );
};

const getbucketListItem = (req, res) => {
  BucketListItemModel.findOne(
    { _id: req.params.bucketlistItemId, bucketlist_id: req.params.id },
    (err, bucketListItem) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `The bucketlist Item  with id ${req.params.bucketlistItemId} does not exist`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketListItem || {},
          message: bucketListItem
            ? 'BucketlistItem(s) retrieved successfully'
            : `BucketlistItem with id ${bucketListItem.id} does not exist`,
        });
      }
    },
  );
};

const getBucketListItems = (req, res) => {
  BucketListItemModel.find({ bucketlist_id: req.params.id }, (err, bucketListItems) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
    } else {
      res.status(200).send({
        success: true,
        bucketlistData: bucketListItems || [],
        message: 'Bucketlist(s) retrieved successfully',
      });
    }
  });
};

const updateBucketListItem = (req, res) => {
  const { error: validationError, value: bucketListItemData } = Joi.validate(
    { ...req.body },
    bucketListItemUpdateSchema,
  );

  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }
  BucketListItemModel.findOneAndUpdate(
    { _id: req.params.bucketlistItemId, bucketlist_id: req.params.id },
    bucketListItemData,
    { new: true },
    (err, bucketListItem) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `The bucketlist Item  with id ${req.params.bucketlistItemId} does not exist`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketListItem,
          message: 'Bucketlist Item updated successfully',
        });
      }
    },
  );
};

const deleteBucketListItem = (req, res) => {
  BucketListItemModel.findByIdAndRemove(
    { _id: req.params.bucketlistItemId, bucketlist_id: req.params.id },
    (err, bucketlist) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `The bucketlist Item  with id ${req.params.bucketlistItemId} does not exist`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketlist,
          message: 'Bucketlist Item deleted successfully',
        });
      }
    },
  );
};

export default {
  createBucketListItem,
  getBucketListItems,
  updateBucketListItem,
  deleteBucketListItem,
  getbucketListItem,
};
