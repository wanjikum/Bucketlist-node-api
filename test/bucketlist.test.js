import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/index';

chai.use(chaiHttp);

const baseUrl = '/api/v1';

const userRegistration = {
  email: 'mickey.mouse@gmail.com',
  firstName: 'Mickey',
  lastName: 'Mouse',
  password: 'testpass90',
};

describe('Bucketlists endpoints: api/v1/bucketlists', () => {
  const bucketlistInfo = {
    name: 'Go to Nairobi',
    description: 'Visit nairobi National park',
    status: 'to do',
  };

  describe('POST: api/v1/bucketlists', () => {
    it('Creates a new bucketlist', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(res.body).to.be.a('Object');
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body.bucketListData).to.have.property('_id');
      expect(res.body.bucketListData).to.have.property('name');
      expect(res.body.bucketListData).to.have.property('description');
      expect(res.body.bucketListData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist Go to Nairobi has been created successfully');
    });

    it('Can not create a bucketlist twice', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(res).to.have.status(409);
      expect(res.body).to.be.a('Object');
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body.success).to.be.eql(false);
      expect(bucketlistResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res.body.message).to.be.eql('Bucketlist already exists');
    });

    it('Can not create a new bucketlist if token is not valid', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', 'Bearer iooonn');

      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(403);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('Token is not valid');
    });

    it('Can not create a new bucketlist if token is not supplied', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', 'Bearer ');

      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(403);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('Auth token is not supplied');
    });
  });

  describe('GET: /bucketlists/:id', () => {
    it('Retrieves a bucketlist successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(res).to.have.status(200);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res.body).to.be.a('Object');
      expect(res.body.bucketListData).to.have.property('_id');
      expect(res.body.bucketListData).to.have.property('name');
      expect(res.body.bucketListData).to.have.property('description');
      expect(res.body.bucketListData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist retrieved successfully');
    });

    it('Can not retrieve a bucketlist that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/eoiinnnn214`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist id provided is not valid');
    });

    it('Can not retrieve another users bucketlist', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'micky.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql(`Bucketlist with id ${id} does not exist`);
    });
  });

  describe('PUT: api/v1/bucketlists', () => {
    const bucketlistUpdateInfo = {
      name: 'Go to Nairobi',
      description: 'Visit nairobi National park',
      status: 'to do',
    };

    it('Updates a bucketlist successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}`)
        .send(bucketlistUpdateInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(200);
      expect(res.body.bucketListData).to.have.property('_id');
      expect(res.body.bucketListData).to.have.property('name');
      expect(res.body.bucketListData).to.have.property('description');
      expect(res.body.bucketListData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist updated successfully');
    });

    it('Can not update a bucketlist that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/eoiinnnn214`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist id provided is not valid');
    });

    it('Can not update another users bucketlist', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'micky.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql(`Bucketlist with id ${id} does not exist`);
    });
  });

  describe('DELETE: api/v1/bucketlists', () => {
    it('Deletes a bucketlist successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .delete(`${baseUrl}/bucketlists/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res.body).to.be.a('Object');
      expect(res.body.bucketListData).to.have.property('_id');
      expect(res.body.bucketListData).to.have.property('name');
      expect(res.body.bucketListData).to.have.property('description');
      expect(res.body.bucketListData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist deleted successfully');
    });

    it('Can not delete a bucketlist that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const res = await chai
        .request(app)
        .delete(`${baseUrl}/bucketlists/eoiinnnn214`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist id provided is not valid');
    });

    it('Can not delete another users bucketlist', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'micky.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = postResponse.body.bucketListData;

      const res = await chai
        .request(app)
        .delete(`${baseUrl}/bucketlists/${id}`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql(`Bucketlist with id ${id} does not exist`);
    });
  });

  describe('GET: api/v1/bucketlists', () => {
    it('Retrieves all bucketlists successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send({ ...bucketlistInfo, name: 'Visit Egypt' })
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist(s) retrieved successfully');
      expect(res.body.bucketListData).to.have.lengthOf(2);
    });

    it('Paginates bucketlists successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send({ ...bucketlistInfo, name: 'Visit Egypt' })
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send({ ...bucketlistInfo, name: 'Visit Uganda' })
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send({ ...bucketlistInfo, name: 'Visit Tanzania' })
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/`)
        .set('Authorization', `Bearer ${token}`)
        .query({ page: 1, limit: 2 });

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(200);
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist(s) retrieved and paginated successfully');
      expect(res.body.bucketListData.docs).to.have.lengthOf(2);
      expect(res.body.bucketListData.total).to.be.eql(4);
      expect(res.body.bucketListData.limit).to.be.eql(2);
      expect(res.body.bucketListData.page).to.be.eql(1);
      expect(res.body.bucketListData.pages).to.be.eql(2);
    });

    it('Can not retrieve another users bucketlists', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'micky.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(postResponse.body.message).to.be.eql(
        'Bucketlist Go to Nairobi has been created successfully',
      );
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(200);
      expect(res.body.message).to.be.eql('No bucketlist(s) available');
    });
  });
});
