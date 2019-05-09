import Joi from 'joi';

import bucketListItemSchema from './bucketlist-item-schema';
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

export default { createBucketListItem };
