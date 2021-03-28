process.env.NODE_ENV = 'test';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Document } from 'mongoose';
import App from '../src/server';
import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { adminUserDetails, loginUserDetails, modifiedUserDetails, registerUserDetails, wrongUserDetails } from './stubs/user.stub';
import { adminRoleDetails, publicRoleDetails } from './stubs/role.stub';

chai.use(chaiHttp);
chai.should();

const app = App.express;

// Ensure app has started
before((done) => {
  app.on('Express_TS_Started', () => {
    done();
  });
});

describe('Auth', () => {
  let publicRole: Document;
  let adminRole: Document;
  before(async () => {
    await UserModel.deleteOne({email: registerUserDetails.email});
    await UserModel.deleteOne({email: loginUserDetails.email});
    await UserModel.deleteOne({email: adminUserDetails.email});
    await UserModel.deleteOne({email: modifiedUserDetails.email});
    await RoleModel.deleteOne({name: publicRoleDetails.name});
    await RoleModel.deleteOne({name: adminRoleDetails.name});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    await new UserModel({...loginUserDetails, role: publicRole}).save();
  });
  describe('/POST register', () => {
    it('it should register a user and return a user object', async () => {
      const res = await chai.request(app)
        .post('/api/auth/register')
        .send(registerUserDetails);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('email').eql(registerUserDetails.email);
      res.body.should.have.property('name').eql(registerUserDetails.name);
    });
  });
  describe('/POST login', () => {
    it('it should login a user and return a token', async () => {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(registerUserDetails);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('token');
    });
    it('it should prevent a user from logging in with wrong credentials', async () => {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(wrongUserDetails);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Unauthorized');
    });
  });
  describe('/GET profile', () => {
    let token = '';
    before(async () => {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(loginUserDetails);
      const result = JSON.parse(res.text);
      token = result.token;
    });
    it('it should return user profile', async () => {
      const res = await chai.request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer ' + token);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('email');
      res.body.should.have.property('name');
      res.body.should.have.property('isVerified');
      res.body.should.have.property('createdAt');
    });
    it('it should prevent access to profile with wrong token', async () => {
      const res = await chai.request(app)
        .get('/api/auth/profile');
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });
  });
  describe('/PUT profile', () => {
    let token = '';
    before(async () => {
      await UserModel.deleteOne({email: registerUserDetails.email});
      await UserModel.deleteOne({email: loginUserDetails.email});
      await UserModel.deleteOne({email: modifiedUserDetails.email});
      await new UserModel({...loginUserDetails, role: publicRole}).save();
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(loginUserDetails);
      token = JSON.parse(res.text).token;
    });
    it('it should return a modified user profile name', async () => {
      const res = await chai.request(app)
        .put('/api/auth/profile')
        .set('Authorization', 'Bearer ' + token)
        .send({name: modifiedUserDetails.name});
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('name').eqls(modifiedUserDetails.name);
    });
  });
  describe('/DELETE profile', () => {
    let token = '';
    before(async () => {
      await UserModel.deleteOne({email: registerUserDetails.email});
      await UserModel.deleteOne({email: loginUserDetails.email});
      await UserModel.deleteOne({email: adminUserDetails.email});
      await UserModel.deleteOne({email: modifiedUserDetails.email});
      await new UserModel({...loginUserDetails, role: publicRole}).save();
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send(loginUserDetails);
      token = JSON.parse(res.text).token;
    });
    it('it should delete user', async () => {
      const res = await chai.request(app)
        .delete('/api/auth/profile')
        .set('Authorization', 'Bearer ' + token);
      res.should.have.status(204);
    });
  });
  describe('/GET init', () => {
    before(async () => {
      await UserModel.deleteMany({});
      await RoleModel.deleteMany({});
      await ResourcePermissionModel.deleteMany({});
    });
    it('it should create 2 roles and 1 admin return an object', async () => {
      const res = await chai.request(app)
        .get('/api/auth/init');
      res.should.have.status(201);
      res.body.should.have.property('roles').to.have.length(2);
      res.body.should.have.property('admin').property('email').eqls(adminUserDetails.email);
    });
    it('it should prevent an additional admin from being created', async () => {
      const res = await chai.request(app)
        .get('/api/auth/init');
      res.should.have.status(500);
    });
  });
});
