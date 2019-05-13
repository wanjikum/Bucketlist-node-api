import Joi from 'joi';

import bucketListItemSchema, { bucketListItemUpdateSchema } from './bucketlist-item-schema';
import BucketListItemModel from '../../models/bucketlist-items';

const createBucketListItem = (req, res) => {
  const { error: validationError, value: bucketListItemData } = Joi.validate(
    { ...req.body, bucketlistId: req.params.id },
    bucketListItemSchema,
  );

  if (validationError) {
    return res.status(400).send({ success: false, message: validationError.details[0].message });
  }

  BucketListItemModel.findOne(
    {
      name: bucketListItemData.name,
      bucketlistId: bucketListItemData.bucketlistId,
      userId: req.userId,
    },
    (err, bucketListItem) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, message: 'Server encountered problem while saving.' });
      } else if (bucketListItem) {
        res.status(409).send({ success: false, message: 'Bucketlist already exists' });
      } else {
        const newBucketListItem = new BucketListItemModel({
          ...bucketListItemData,
          userId: req.userId,
        });
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
    { _id: req.params.bucketlistItemId, bucketlistId: req.params.id, userId: req.userId },
    (err, bucketListItem) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `Server error ${err}`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketListItem || {},
          message: bucketListItem
            ? 'BucketlistItem(s) retrieved successfully'
            : `BucketlistItem with id ${req.params.bucketlistItemId} does not exist`,
        });
      }
    },
  );
};

const getBucketListItems = (req, res) => {
  const page = parseInt(req.query.page, 16);
  const limit = parseInt(req.query.limit, 16);

  if (page && limit) {
    BucketListItemModel.paginate(
      { bucketlistId: req.params.id, userId: req.userId },
      { page, limit },
      (err, bucketListItems) => {
        if (err) {
          res.status(500).send({ success: false, message: `Server error ${err}` });
        } else {
          res.status(200).send({
            success: true,
            bucketlistData: bucketListItems,
            message: bucketListItems.docs.length
              ? 'Bucketlist item(s) retrieved and paginated successfully'
              : 'No bucketlist items available',
          });
        }
      },
    );
  } else {
    BucketListItemModel.find(
      { bucketlistId: req.params.id, userId: req.userId },
      (err, bucketListItems) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
        } else {
          res.status(200).send({
            success: true,
            bucketlistData: bucketListItems,
            message: bucketListItems.docs.length
              ? 'Bucketlist item(s) retrieved and paginated successfully'
              : 'No bucketlist items available',
          });
        }
      },
    );
  }
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
    { _id: req.params.bucketlistItemId, bucketlistId: req.params.id, userId: req.userId },
    bucketListItemData,
    { new: true },
    (err, bucketListItem) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `Server error ${err}`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketListItem,
          message: bucketListItem
            ? 'Bucketlist Item updated successfully'
            : `The bucketlist Item  with id ${req.params.bucketlistItemId} does not exist`,
        });
      }
    },
  );
};

const deleteBucketListItem = (req, res) => {
  BucketListItemModel.findByIdAndRemove(
    { _id: req.params.bucketlistItemId, bucketlistId: req.params.id, userId: req.userId },
    (err, bucketlist) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `Server error ${err}`,
        });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketlist,
          message: bucketlist
            ? 'Bucketlist Item deleted successfully'
            : `The bucketlist Item  with id ${req.params.bucketlistItemId} does not exist`,
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
