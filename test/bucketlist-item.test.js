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

describe('Bucketlist items endpoints', () => {
  const bucketlistInfo = {
    name: 'Go to Kisumu',
    description: 'Visit Lake Victoria',
    status: 'to do',
  };

  const bucketlistItemInfo = {
    name: 'Go to Maseno',
    status: 'to do',
  };

  describe('POST: /bucketlists/:id/bucketlistItems/', () => {
    it('Creates a new bucketlist item', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(res.body).to.be.a('Object');
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body.bucketListItemData).to.have.property('_id');
      expect(res.body.bucketListItemData).to.have.property('name');
      expect(res.body.bucketListItemData).to.have.property('status');
      expect(res.body.bucketListItemData).to.have.property('bucketlistId');
      expect(res.body.bucketListItemData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql(
        'BucketListItem Go to Maseno has been created successfully',
      );
    });

    it('Can not create a bucketlist item twice', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(409);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('Bucketlist already exists');
    });
  });

  describe('GET: /bucketlists/:id/bucketlistItems/:id', () => {
    it('Retrieves a bucketlist item successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.body).to.be.a('Object');
      expect(res.body.bucketListItemData).to.have.property('_id');
      expect(res.body.bucketListItemData).to.have.property('name');
      expect(res.body.bucketListItemData).to.have.property('status');
      expect(res.body.bucketListItemData).to.have.property('bucketlistId');
      expect(res.body.bucketListItemData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res).to.have.status(200);
      expect(res.body.message).to.be.eql('BucketlistItem(s) retrieved successfully');
    });

    it('Can not retrieve a bucketlist item that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/eeeuuhvhgve1233`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist item id provided is not valid');
    });

    it('Can not retrieve another users bucketlist item', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'milly.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eql(
        `BucketlistItem with id ${bucketlistItemId} does not exist`,
      );
    });
  });

  describe('PUT: /bucketlists/:id/bucketlistItems/:id', () => {
    const bucketlistItemUpdateInfo = {
      name: 'Go to Kitale',
      status: 'to do',
    };

    it('Updates a bucketlist item successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .send(bucketlistItemUpdateInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(res.body).to.be.a('Object');
      expect(res.body.bucketListItemData).to.have.property('_id');
      expect(res.body.bucketListItemData).to.have.property('name');
      expect(res.body.bucketListItemData).to.have.property('status');
      expect(res.body.bucketListItemData).to.have.property('bucketlistId');
      expect(res.body.bucketListItemData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist Item updated successfully');
    });

    it('Can not update a bucketlist that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}/bucketlistItems/eeeuuhvhgve1233`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist item id provided is not valid');
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
        .send({ ...userRegistration, email: 'milly.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .send(bucketlistItemUpdateInfo)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eql(
        `BucketlistItem with id ${bucketlistItemId} does not exist`,
      );
    });
  });

  describe('DELETE: /bucketlists/:id/bucketlistItems/:id', () => {
    it('Deletes a bucketlist item successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .delete(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.body).to.be.a('Object');
      expect(res.body.bucketListItemData).to.have.property('_id');
      expect(res.body.bucketListItemData).to.have.property('name');
      expect(res.body.bucketListItemData).to.have.property('status');
      expect(res.body.bucketListItemData).to.have.property('bucketlistId');
      expect(res.body.bucketListItemData).to.have.property('userId');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist Item deleted successfully');
    });

    it('Can not delete a bucketlist item that has an invalid id', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const res = await chai
        .request(app)
        .delete(`${baseUrl}/bucketlists/${id}/bucketlistItems/hhh`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(400);
      expect(res.body.success).to.be.eql(false);
      expect(res.body.message).to.be.eql('The bucketlist item id provided is not valid');
    });

    it('Can not delete another users bucketlist item', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const user2SignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({ ...userRegistration, email: 'milly.mouse@gmail.com' });

      const { token: token2 } = user2SignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      const postResponse = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: bucketlistItemId } = postResponse.body.bucketListItemData;

      const res = await chai
        .request(app)
        .put(`${baseUrl}/bucketlists/${id}/bucketlistItems/${bucketlistItemId}`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eql(
        `BucketlistItem with id ${bucketlistItemId} does not exist`,
      );
    });
  });

  describe('GET:  /bucketlists/:id/bucketlistItems/', () => {
    it('Retrieves all bucketlist items successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send({ ...bucketlistItemInfo, name: 'Go to busia' })
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .set('Authorization', `Bearer ${token}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist item(s) retrieved successfully');
      expect(res.body.bucketListItemData).to.have.lengthOf(2);
    });

    it('Paginates bucketlist items successfully', async () => {
      const userSignUpResponse = await chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(userRegistration);

      const { token } = userSignUpResponse.body.userData;

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send({ ...bucketlistItemInfo, name: 'Go to busia' })
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send({ ...bucketlistItemInfo, name: 'Go to eldoret' })
        .set('Authorization', `Bearer ${token}`);

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send({ ...bucketlistItemInfo, name: 'Go to nakuru' })
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .set('Authorization', `Bearer ${token}`)
        .query({ page: 1, limit: 2 });

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body).to.be.a('Object');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.message).to.be.eql('Bucketlist item(s) retrieved and paginated successfully');
      expect(res.body.bucketListItemData.docs).to.have.lengthOf(2);
      expect(res.body.bucketListItemData.total).to.be.eql(4);
      expect(res.body.bucketListItemData.limit).to.be.eql(2);
      expect(res.body.bucketListItemData.page).to.be.eql(1);
      expect(res.body.bucketListItemData.pages).to.be.eql(2);
    });

    it('Can not retrieve another users bucketlists items', async () => {
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

      const bucketlistDataInfo = await chai
        .request(app)
        .post(`${baseUrl}/bucketlists`)
        .send(bucketlistInfo)
        .set('Authorization', `Bearer ${token}`);

      const { _id: id } = bucketlistDataInfo.body.bucketListData;

      await chai
        .request(app)
        .post(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .send(bucketlistItemInfo)
        .set('Authorization', `Bearer ${token}`);

      const res = await chai
        .request(app)
        .get(`${baseUrl}/bucketlists/${id}/bucketlistItems/`)
        .set('Authorization', `Bearer ${token2}`);

      expect(userSignUpResponse).to.have.status(201);
      expect(userSignUpResponse.body.message).to.be.eql('Mickey has been created successfully.');
      expect(bucketlistDataInfo.body.message).to.be.eql(
        'Bucketlist Go to Kisumu has been created successfully',
      );
      expect(res.body).to.be.a('Object');
      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eql('No bucketlist items available');
    });
  });
});
