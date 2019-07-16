import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

before((done) => {
  // Connect to MongoDB Here
  mongoose.connect('mongodb://localhost/bucketlist_test_db');

  mongoose.connection
    .once('open', () => {
      // console.log('Connected to MongoDB!');
      done();
    })
    .on('error', () => {
      // console.log('Connection error : ');
    });
});

afterEach(async () => {
  await mongoose.connection.collections.users.drop(async () => {
    // this function runs after the drop is complete
    // console.log('users db dropped');
  });
});

after(async () => {
  await process.exit(0);
});
