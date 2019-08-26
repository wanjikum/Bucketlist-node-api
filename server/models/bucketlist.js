import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bucketlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

bucketlistSchema.plugin(mongoosePaginate);
const BucketlistModel = mongoose.model('Bucketlist', bucketlistSchema);

export default BucketlistModel;
