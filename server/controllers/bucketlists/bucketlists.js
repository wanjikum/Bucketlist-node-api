import BucketListModel from '../../models/bucketlist';

const getStatusCode = bucketList => (bucketList ? 200 : 404);
const successValue = bucketList => (bucketList ? { success: true, bucketListData: bucketList } : {});
const getSuccessPaginationValues = bucketList => (bucketList.docs.length ? { success: true, bucketListData: bucketList } : {});
const getSuccessValues = bucketList => (bucketList.length ? { success: true, bucketListData: bucketList } : {});

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
      res.status(500).send({ success: false, message: 'Server Error' });
    } else {
      res.status(getStatusCode(bucketList)).send({
        ...successValue(bucketList),
        message: bucketList
          ? 'Bucketlist retrieved successfully'
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
        res.status(getStatusCode(bucketLists.docs.length)).send({
          ...getSuccessPaginationValues(bucketLists),
          message: bucketLists.docs.length
            ? 'Bucketlist(s) retrieved and paginated successfully'
            : 'No bucketlist(s) available',
        });
      }
    });
  } else {
    BucketListModel.find({ userId: req.userId }, (err, bucketLists) => {
      if (err) {
        res.status(500).send({ success: false, message: err });
      } else {
        res.status(getStatusCode(bucketLists.length)).send({
          ...getSuccessValues(bucketLists),
          message: bucketLists.length
            ? 'Bucketlist(s) retrieved successfully'
            : 'No bucketlist(s) available',
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
        res.status(getStatusCode(bucketList)).send({
          ...successValue(bucketList),
          message: bucketList
            ? 'Bucketlist updated successfully'
            : `Bucketlist with id ${req.params.id} does not exist`,
        });
      }
    },
  );
};

const deleteBucketList = (req, res) => {
  BucketListModel.findOneAndRemove(
    { _id: req.params.id, userId: req.userId },
    (err, bucketList) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Failed' });
      } else {
        res.status(getStatusCode(bucketList)).send({
          ...successValue(bucketList),
          message: bucketList
            ? 'Bucketlist deleted successfully'
            : `Bucketlist with id ${req.params.id} does not exist`,
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
