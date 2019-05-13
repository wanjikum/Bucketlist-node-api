import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bucketListItemSchema = new mongoose.Schema({
  name: String,
  status: String,
  bucketlist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucketlist',
  },
});

bucketListItemSchema.plugin(mongoosePaginate);
const BucketListItemsModel = mongoose.model('BucketlistItems', bucketListItemSchema);

export default BucketListItemsModel;
