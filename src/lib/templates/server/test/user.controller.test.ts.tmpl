process.env.NODE_ENV = 'test';
import App from '../src/server';
import * as chai from 'chai';

import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { Document } from 'mongoose';
import { Auth } from '../src/middleware/auth';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
const app = App.express;

const publicRoleDetails = {
  name: 'Public',
  description: 'Unauthenticated user',
  isAuthenticated: false
};

const adminRoleDetails = {
  name: 'Admin',
  description: 'Top level authenticated user',
  isAuthenticated: true
};

const adminUserDetails = {
  email: process.env.ADMIN_EMAIL,
  name: process.env.ADMIN_NAME,
  password: process.env.ADMIN_PASSWORD
};

const deskUserDetails = {
  email: 'testregister@email.com',
  name: 'TestRegister',
  password: 'qwerty'
};

const simpleUserDetails = {
  email: 'testlogin@email.com',
  name: 'Testlogin',
  password: 'qwerty'
};

const modifiedSimpleUserDetails = {
  email: 'testlogin@email.com',
  name: 'Testloginmodified',
  password: 'qwerty'
};

const falseUID = '5ca4ab6f3f86e02af8e1a5a3';

describe('Users', () => {
  let publicRole: Document;
  let adminRole: Document;
  const userResourcePermission: any = {
    resourceName: 'users',
    methods: [
      {
        roles: [],
        name: 'list'
      },
      {
        roles: [],
        name: 'show'
      },
      {
        roles: [],
        name: 'create'
      },
      {
        roles: [],
        name: 'update'
      },
      {
        roles: [],
        name: 'delete'
      }
    ]
  };
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    const adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    userResourcePermission.methods.map((method: any) => {
      return {
        roles: method.roles.push(adminRole),
        name: method.name
      };
    });
    await new ResourcePermissionModel(userResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    await new UserModel({...simpleUserDetails, role: publicRole}).save();
  });
  describe('/GET users', () => {
    let tokenAdmin = '';
    let tokenSimple = '';
    before(async () => {
      const res1 = await chai.request(app)
        .post('/api/auth/login')
        .send(adminUserDetails);
      tokenAdmin = JSON.parse(res1.text).token;
      const res2 = await chai.request(app)
        .post('/api/auth/login')
        .send(simpleUserDetails);
      tokenSimple = JSON.parse(res2.text).token;
    });
    it('it should return collection of user', async () => {
      const res = await chai.request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eql(2);
      res.body.should.have.property('data').lengthOf(2);
    });
    it('it should prevent simple user role to access user', async () => {
      const res = await chai.request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer ' + tokenSimple);
      res.should.have.status(401);
      res.body.should.have.property('message').eql('Unauthorized');

    });
  });
  describe('/GET users/:id', () => {
    let tokenAdmin = '';
    let user: any;
    before(async () => {
      const res1 = await chai.request(app)
        .post('/api/auth/login')
        .send(adminUserDetails);
      tokenAdmin = JSON.parse(res1.text).token;
      user = await UserModel.findOne({email: adminUserDetails.email});
    });
    it('it should return a single user', async () => {
      const res = await chai.request(app)
        .get(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('email').eqls(adminUserDetails.email);
    });
    it('it should return 404 when user does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/users/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
      res.body.should.have.property('message').eqls('Not Found');
    });
    it('it should return 500 when id provided is not a mongoose uid', async () => {
      const res = await chai.request(app)
        .get(`/api/users/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/POST users', () => {
    let tokenAdmin = '';
    before(async () => {
      const res1 = await chai.request(app)
        .post('/api/auth/login')
        .send(adminUserDetails);
      tokenAdmin = JSON.parse(res1.text).token;
    });
    it('it should create deskUser', async () => {
      const res = await chai.request(app)
        .post(`/api/users`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({...deskUserDetails, role: publicRole});
      res.should.have.status(201);
      res.body.should.have.property('email').eqls(deskUserDetails.email);
    });
    it('it should prevent user duplication insert', async () => {
      const res = await chai.request(app)
        .post(`/api/users`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(deskUserDetails);
      res.should.have.status(500);
    });
  });
  describe('/PUT user/:id', () => {
    let tokenAdmin = '';
    let user: any;
    before(async () => {
      const res1 = await chai.request(app)
        .post('/api/auth/login')
        .send(adminUserDetails);
      tokenAdmin = JSON.parse(res1.text).token;
      user = await UserModel.findOne({email: simpleUserDetails.email});
    });
    it('it should update simpleLoginUser', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedSimpleUserDetails);
      res.should.have.status(200);
      res.body.should.have.property('name').eqls(modifiedSimpleUserDetails.name);
    });
    it('it should update not update a user with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedSimpleUserDetails);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/users/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedSimpleUserDetails);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/DELETE users/:id', () => {
    let tokenAdmin = '';
    let user: any;
    before(async () => {
      const res1 = await chai.request(app)
        .post('/api/auth/login')
        .send(adminUserDetails);
      tokenAdmin = JSON.parse(res1.text).token;
      user = await UserModel.findOne({email: modifiedSimpleUserDetails.email});
    });
    it('it should delete modifiedSimpleUser', async () => {
      const res = await chai.request(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
    it('it should not delete user with false id', async () => {
      const res = await chai.request(app)
        .delete(`/api/users/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
    });
  });
});
