"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bucketlistItems = _interopRequireDefault(require("../../models/bucketlist-items"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createBucketListItem = (req, res) => {
  const bucketListItemData = { ...req.body,
    bucketlistId: req.params.id
  };

  _bucketlistItems.default.findOne({
    name: bucketListItemData.name,
    bucketlistId: bucketListItemData.bucketlistId,
    userId: req.userId
  }, (err, bucketListItem) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Server encountered problem while saving.'
      });
    } else if (bucketListItem) {
      res.status(409).send({
        success: false,
        message: 'Bucketlist already exists'
      });
    } else {
      const newBucketListItem = new _bucketlistItems.default({ ...bucketListItemData,
        userId: req.userId
      });
      newBucketListItem.save((error, newBucketListItemData) => {
        if (error) {
          res.status(500).send({
            success: false,
            message: err
          });
        } else {
          res.status(201).send({
            success: true,
            bucketListItemData: newBucketListItemData,
            message: `BucketListItem ${newBucketListItemData.name} has been created successfully`
          });
        }
      });
    }
  });
};

const getbucketListItem = (req, res) => {
  _bucketlistItems.default.findOne({
    _id: req.params.bucketlistItemId,
    bucketlistId: req.params.id,
    userId: req.userId
  }, (err, bucketListItem) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Server error'
      });
    } else {
      res.status(200).send({
        success: true,
        bucketListItemData: bucketListItem || {},
        message: bucketListItem ? 'BucketlistItem(s) retrieved successfully' : `BucketlistItem with id ${req.params.bucketlistItemId} does not exist`
      });
    }
  });
};

const getBucketListItems = (req, res) => {
  const page = parseInt(req.query.page, 16);
  const limit = parseInt(req.query.limit, 16);

  if (page && limit) {
    _bucketlistItems.default.paginate({
      bucketlistId: req.params.id,
      userId: req.userId
    }, {
      page,
      limit
    }, (err, bucketListItems) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: `Server error ${err}`
        });
      } else {
        res.status(200).send({
          success: true,
          bucketListItemData: bucketListItems,
          message: bucketListItems.docs.length ? 'Bucketlist item(s) retrieved and paginated successfully' : 'No bucketlist items available'
        });
      }
    });
  } else {
    _bucketlistItems.default.find({
      bucketlistId: req.params.id,
      userId: req.userId
    }, (err, bucketListItems) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err
        });
      } else {
        res.status(200).send({
          success: true,
          bucketListItemData: bucketListItems,
          message: bucketListItems.length ? 'Bucketlist item(s) retrieved successfully' : 'No bucketlist items available'
        });
      }
    });
  }
};

const updateBucketListItem = (req, res) => {
  const bucketListItemData = req.body;

  _bucketlistItems.default.findOneAndUpdate({
    _id: req.params.bucketlistItemId,
    bucketlistId: req.params.id,
    userId: req.userId
  }, bucketListItemData, {
    new: true
  }, (err, bucketListItem) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Server error'
      });
    } else {
      res.status(200).send({
        success: true,
        bucketListItemData: bucketListItem,
        message: bucketListItem ? 'Bucketlist Item updated successfully' : `BucketlistItem with id ${req.params.bucketlistItemId} does not exist`
      });
    }
  });
};

const deleteBucketListItem = (req, res) => {
  _bucketlistItems.default.findByIdAndRemove({
    _id: req.params.bucketlistItemId,
    bucketlistId: req.params.id,
    userId: req.userId
  }, (err, bucketlist) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: `Server error ${err}`
      });
    } else {
      res.status(200).send({
        success: true,
        bucketListItemData: bucketlist,
        message: bucketlist ? 'Bucketlist Item deleted successfully' : `BucketlistItem with id ${req.params.bucketlistItemId} does not exist`
      });
    }
  });
};

var _default = {
  createBucketListItem,
  getBucketListItems,
  updateBucketListItem,
  deleteBucketListItem,
  getbucketListItem
};
exports.default = _default;