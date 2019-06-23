import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

const baseUrl = '/api/v1';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userRegistration = {
  email: 'mickey.mouse@gmail.com',
  firstName: 'Mickey',
  lastName: 'Mouse',
  password: 'testpass90',
};

describe('User signup endpoint: api/v1/signup', () => {
  before((done) => {
    // Connect to MongoDB Here
    mongoose.connect('mongodb://localhost/testdb');

    mongoose.connection
      .once('open', () => {
        console.log('Connected to MongoDB!');
        done();
      })
      .on('error', () => {
        console.log('Connection error : ');
      });
  });

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it('Can signup a user', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(userRegistration)
      .set('Accept', 'application/json');

    expect(res).to.have.status(201);
    expect(res.body).to.be.a('Object');
    expect(res.body.message).to.be.eql('Mickey has been created successfully.');
    expect(res.body.userData).to.have.property('token');
    expect(res.body.success).to.be.eql(true);
    expect(res.body.userData).to.have.property('id');
    expect(res.body.message).to.be.eql('Mickey has been created successfully.');
  });

  it('Can not signup a user twice', async () => {
    const successfulSignUpRes = await chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(userRegistration)
      .set('Accept', 'application/json');

    const res = await chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(userRegistration)
      .set('Accept', 'application/json');

    expect(successfulSignUpRes).to.have.status(201);
    expect(res).to.have.status(409);
    expect(res.body).to.be.a('Object');
    expect(res.body.message).to.be.eql(
      'User with the email mickey.mouse@gmail.com already exists.',
    );
    expect(res.body.success).to.be.eql(false);
  });

  afterEach(async () => {
    await mongoose.connection.collections.users.drop(async () => {
      // this function runs after the drop is complete
      console.log('users db dropped');
    });
  });
});
