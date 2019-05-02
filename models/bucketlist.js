import mongoose from 'mongoose';

const bucketlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  done: String,
  userID: String,
});

const BucketlistModel = mongoose.model('Bucketlist', bucketlistSchema);

export default BucketlistModel;