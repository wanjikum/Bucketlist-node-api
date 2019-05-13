import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bucketlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  done: String,
  userId: String,
});

bucketlistSchema.plugin(mongoosePaginate);
const BucketlistModel = mongoose.model('Bucketlist', bucketlistSchema);

export default BucketlistModel;
