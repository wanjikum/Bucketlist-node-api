import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

const baseUrl = '/api/v1';

const userRegistration = {
  email: 'mickey.mouse@gmail.com',
  firstName: 'Mickey',
  lastName: 'Mouse',
  password: 'testpass90',
};

describe('Users endpoints', () => {
  describe('user sign up: api/v1/signup', () => {
    it('Can create a user', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(userRegistration);

      expect(res).to.have.status(201);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql('Mickey has been created successfully.');
      expect(res.body.userData).to.have.property('token');
      expect(res.body.success).to.be.eql(true);
      expect(res.body.userData).to.have.property('id');
      expect(res.body.message).to.be.eql('Mickey has been created successfully.');
    });

    it('Can not create a user twice', async () => {
      const successfulSignUpRes = await chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(userRegistration);

      const res = await chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(userRegistration);

      expect(successfulSignUpRes).to.have.status(201);
      expect(res).to.have.status(409);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql(
        'User with the email mickey.mouse@gmail.com already exists.',
      );
      expect(res.body.success).to.be.eql(false);
    });
  });

  describe('user sign in: api/v1/signin', () => {
    const { email, password } = userRegistration;
    it('Can not give a non registered user access', async () => {
      const res = await chai
        .request(app)
        .post(`${baseUrl}/signin`)
        .send({ email, password });

      expect(res).to.have.status(404);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql('Email does not exist');
      expect(res.body.success).to.be.eql(false);
    });

    it('Can not give a registered user access if password is incorrect', async () => {
      const successfulSignUpRes = await chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(userRegistration);

      const res = await chai
        .request(app)
        .post(`${baseUrl}/signin`)
        .send({ email, password: 'testpas90' });

      expect(successfulSignUpRes).to.have.status(201);
      expect(res).to.have.status(401);
      expect(res.body).to.be.a('Object');
      expect(res.body.message).to.be.eql('Invalid password');
      expect(res.body.success).to.be.eql(false);
      expect(res.body.auth).to.be.eql(false);
      expect(res.body.token).to.be.a('null');
    });

    it('Can grant user access if registered', async () => {
      const successfulSignUpRes = await chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(userRegistration);

      const res = await chai
        .request(app)
        .post(`${baseUrl}/signin`)
        .send({ email, password });

      expect(successfulSignUpRes).to.have.status(201);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('Object');
      expect(res.body.auth).to.be.eql(true);
      expect(res.body.success).to.be.eql(true);
      expect(res.body.userData).to.have.property('token');
      expect(res.body.userData).to.have.property('id');
      expect(res.body.userData.email).to.be.eql(email);
    });
  });
});
