import BucketListModel from '../../models/bucketlist';

const createBucketList = (req, res) => {
  const bucketlistData = { ...req.body, userId: req.userId };

  BucketListModel.findOne({ name: bucketlistData.name, userId: req.userId }, (err, bucketlist) => {
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
      res.status(200).send({
        success: true,
        bucketlistData: bucketList || {},
        message: bucketList
          ? 'Bucketlist(s) retrieved successfully'
          : `Bucketlist with id ${req.params.id} does not exist`,
      });
    }
  });
};

const getBucketLists = (req, res) => {
  const page = parseInt(req.query.page, 16);
  const limit = parseInt(req.query.limit, 16);

  if (page && limit) {
    BucketListModel.paginate({ userId: req.userId }, { page, limit }, (err, bucketLists) => {
      if (err) {
        res.status(500).send({ success: false, message: err });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketLists || [],
          message: 'Bucketlist(s) retrieved and paginated successfully',
        });
      }
    });
  } else {
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
  }
};

const updateBucketList = (req, res) => {
  const bucketlistData = { ...req.body, userId: req.userId };

  BucketListModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    bucketlistData,
    { new: true },
    (err, bucketList) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Failed' });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketList,
          message: 'Bucketlist updated successfully',
        });
      }
    },
  );
};

const deleteBucketList = (req, res) => {
  BucketListModel.findByIdAndRemove(
    { _id: req.params.id, userId: req.userId },
    (err, bucketlist) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Failed' });
      } else {
        res.status(200).send({
          success: true,
          bucketlistData: bucketlist,
          message: 'Bucketlist deleted successfully',
        });
      }
    },
  );
};

export default {
  createBucketList,
  getbucketList,
  getBucketLists,
  updateBucketList,
  deleteBucketList,
};
