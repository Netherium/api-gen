process.env.NODE_ENV = 'test';
import * as chai from 'chai';
import { Document } from 'mongoose';
import App from '../src/server';
import { Auth } from '../src/middleware/auth';
import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { adminRoleDetails, publicRoleDetails } from './stubs/role.stub';
import { adminUserDetails, loginUserDetails, modifiedUserDetails, registerUserDetails } from './stubs/user.stub';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const app = App.express;
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
    await new UserModel({...adminUserDetails, role: adminRole}).save();
    userResourcePermission.methods.map((method: any) => {
      return {
        roles: method.roles.push(adminRole),
        name: method.name
      };
    });
    await new ResourcePermissionModel(userResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    await new UserModel({...loginUserDetails, role: publicRole}).save();
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
        .send(loginUserDetails);
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
      res.should.have.status(403);
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
      res.body.should.have.property('message').eqls('Internal Server Error');
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
        .send({...registerUserDetails, role: publicRole});
      res.should.have.status(201);
      res.body.should.have.property('email').eqls(registerUserDetails.email);
    });
    it('it should prevent user duplication insert', async () => {
      const res = await chai.request(app)
        .post(`/api/users`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(registerUserDetails);
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
      user = await UserModel.findOne({email: loginUserDetails.email});
    });
    it('it should update simpleLoginUser', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUserDetails);
      res.should.have.status(200);
      res.body.should.have.property('name').eqls(modifiedUserDetails.name);
    });
    it('it should update not update a user with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUserDetails);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/users/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUserDetails);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
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
      user = await UserModel.findOne({email: modifiedUserDetails.email});
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
