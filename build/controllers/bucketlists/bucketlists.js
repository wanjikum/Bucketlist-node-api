"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bucketlist = _interopRequireDefault(require("../../models/bucketlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createBucketList = (req, res) => {
  const bucketlistData = { ...req.body,
    userId: req.userId
  };

  _bucketlist.default.findOne({
    name: bucketlistData.name,
    userId: req.userId
  }, (err, bucketlist) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Server encountered problem while saving.'
      });
    } else if (bucketlist) {
      res.status(409).send({
        success: false,
        message: 'Bucketlist already exists'
      });
    } else {
      const newBucketlist = new _bucketlist.default(bucketlistData);
      newBucketlist.save((error, bucketList) => {
        if (error) {
          res.status(500).send({
            success: false,
            message: err
          });
        } else {
          res.status(201).send({
            success: true,
            bucketListData: bucketList,
            message: `Bucketlist ${bucketlistData.name} has been created successfully`
          });
        }
      });
    }
  });
};

const getbucketList = (req, res) => {
  _bucketlist.default.findOne({
    _id: req.params.id,
    userId: req.userId
  }, (err, bucketList) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Server Error'
      });
    } else {
      res.status(200).send({
        success: !!bucketList,
        bucketListData: bucketList || {},
        message: bucketList ? 'Bucketlist retrieved successfully' : `Bucketlist with id ${req.params.id} does not exist`
      });
    }
  });
};

const getBucketLists = (req, res) => {
  const page = parseInt(req.query.page, 16);
  const limit = parseInt(req.query.limit, 16);

  if (page && limit) {
    _bucketlist.default.paginate({
      userId: req.userId
    }, {
      page,
      limit
    }, (err, bucketLists) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err
        });
      } else {
        res.status(200).send({
          success: true,
          bucketListData: bucketLists || [],
          message: 'Bucketlist(s) retrieved and paginated successfully'
        });
      }
    });
  } else {
    _bucketlist.default.find({
      userId: req.userId
    }, (err, bucketLists) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err
        });
      } else {
        res.status(200).send({
          success: true,
          bucketListData: bucketLists || [],
          message: 'Bucketlist(s) retrieved successfully'
        });
      }
    });
  }
};

const updateBucketList = (req, res) => {
  const bucketlistData = { ...req.body,
    userId: req.userId
  };

  _bucketlist.default.findOneAndUpdate({
    _id: req.params.id,
    userId: req.userId
  }, bucketlistData, {
    new: true
  }, (err, bucketList) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Failed'
      });
    } else {
      res.status(200).send({
        success: !!bucketList,
        bucketListData: bucketList,
        message: bucketList ? 'Bucketlist updated successfully' : `Bucketlist with id ${req.params.id} does not exist`
      });
    }
  });
};

const deleteBucketList = (req, res) => {
  _bucketlist.default.findOneAndRemove({
    _id: req.params.id,
    userId: req.userId
  }, (err, bucketList) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Failed'
      });
    } else {
      res.status(200).send({
        success: !!bucketList,
        bucketListData: bucketList,
        message: bucketList ? 'Bucketlist deleted successfully' : `Bucketlist with ${req.params.id} does not exist`
      });
    }
  });
};

var _default = {
  createBucketList,
  getbucketList,
  getBucketLists,
  updateBucketList,
  deleteBucketList
};
exports.default = _default;