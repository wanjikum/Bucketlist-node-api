import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bucketListItemSchema = new mongoose.Schema({
  name: String,
  status: String,
  bucketlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucketlist',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

bucketListItemSchema.plugin(mongoosePaginate);
const BucketListItemsModel = mongoose.model('BucketlistItems', bucketListItemSchema);

export default BucketListItemsModel;
