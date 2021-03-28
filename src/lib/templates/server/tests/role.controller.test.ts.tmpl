process.env.NODE_ENV = 'test';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Document } from 'mongoose';
import App from '../src/server';
import { Auth } from '../src/middleware/auth';
import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { adminRoleDetails, modifiedRoleDetails, newRoleDetails, publicRoleDetails, role1Details, role2Details } from './stubs/role.stub';
import { adminUserDetails, publicUserDetails } from './stubs/user.stub';

chai.use(chaiHttp);
chai.should();

const app = App.express;
const falseUID = '5ca4ab6f3f86e02af8e1a5a3';

describe('Roles', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let publicUser: Document;
  let role1: Document;
  let role2: Document;
  let tokenAdmin: string;
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    const roleResourcePermission: any = {
      resourceName: 'roles',
      methods: [
        {
          roles: [adminRole],
          name: 'list'
        },
        {
          roles: [adminRole],
          name: 'show'
        },
        {
          roles: [adminRole],
          name: 'create'
        },
        {
          roles: [adminRole],
          name: 'update'
        },
        {
          roles: [adminRole],
          name: 'delete'
        }
      ]
    };
    await new ResourcePermissionModel(roleResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    role1 = await new RoleModel(role1Details).save();
    role2 = await new RoleModel(role2Details).save();
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
  });
  describe('/GET roles', () => {
    it('it should return collection of roles', async () => {
      const res = await chai.request(app)
        .get('/api/roles')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eql(4);
      res.body.should.have.property('data').lengthOf(4);
    });
  });
  describe('/GET roles/:id', () => {
    it('it should return a single role', async () => {
      const res = await chai.request(app)
        .get(`/api/roles/${role1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('name').eqls(role1Details.name);
    });
    it('it should return 404 when role does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/roles/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
      res.body.should.have.property('message').eqls('Not Found');
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .get(`/api/roles/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
  describe('/POST roles', () => {
    it('it should create role', async () => {
      const res = await chai.request(app)
        .post(`/api/roles`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(newRoleDetails);
      res.should.have.status(201);
      res.body.should.have.property('name').eqls(newRoleDetails.name);
    });
    it('it should not create role with wrong body', async () => {
      const res = await chai.request(app)
        .post(`/api/roles`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({});
      res.should.have.status(500);
    });
  });
  describe('/PUT roles/:id', () => {
    it('it should update role', async () => {
      const res = await chai.request(app)
        .put(`/api/roles/${role1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedRoleDetails);
      res.should.have.status(200);
      res.body.should.have.property('name').eqls(modifiedRoleDetails.name);
    });
    it('it should not update role with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/roles/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(role1Details);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/roles/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(role1Details);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
  describe('/DELETE roles/:id', () => {
    it('it should delete role', async () => {
      const res = await chai.request(app)
        .delete(`/api/roles/${role1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
    it('it should not delete role with false id', async () => {
      const res = await chai.request(app)
        .delete(`/api/roles/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .delete(`/api/roles/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
});
