import mongoose from 'mongoose';

const bucketListItemSchema = new mongoose.Schema({
  name: String,
  status: String,
  bucketlist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucketlist',
  },
});

const BucketListItemsModel = mongoose.model('BucketlistItems', bucketListItemSchema);

export default BucketListItemsModel;
