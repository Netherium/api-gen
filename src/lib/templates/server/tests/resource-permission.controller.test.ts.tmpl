process.env.NODE_ENV = 'test';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Document } from 'mongoose';
import App from '../src/server';
import { Auth } from '../src/middleware/auth';
import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { adminRoleDetails, publicRoleDetails } from './stubs/role.stub';
import { adminUserDetails, publicUserDetails } from './stubs/user.stub';
import {
  modifiedResourcePermissionDetails,
  newResourcePermissionDetails,
  resourcePermissions1Details,
  resourcePermissions2Details
} from './stubs/resource-permission.stub';

chai.use(chaiHttp);
chai.should();

const app = App.express;
const falseUID = '5ca4ab6f3f86e02af8e1a5a3';

describe('Resource Permissions', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let publicUser: Document;
  let resourcePermission1: Document;
  let resourcePermission2: Document;
  let tokenAdmin: string;
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    const resourcePermission: any = {
      resourceName: 'resource-permissions',
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
    await new ResourcePermissionModel(resourcePermission).save();
    resourcePermissions1Details.methods.map((method: any) => {
      return {
        roles: method.roles.push(adminRole),
        name: method.name
      };
    });
    resourcePermissions2Details.methods.map((method: any) => {
      return {
        roles: method.roles.push(adminRole),
        name: method.name
      };
    });
    resourcePermission1 = await new ResourcePermissionModel(resourcePermissions1Details).save();
    resourcePermission2 = await new ResourcePermissionModel(resourcePermissions2Details).save();
    await Auth.updateAppPermissions(null, app);
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
  });
  describe('/GET resource-permissions', () => {
    it('it should return collection of resource-permissions', async () => {
      const res = await chai.request(app)
        .get('/api/resource-permissions')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eql(3);
      res.body.should.have.property('data').lengthOf(3);
    });
  });
  describe('/GET resource-permissions/:id', () => {
    it('it should return a single resource-permission', async () => {
      const res = await chai.request(app)
        .get(`/api/resource-permissions/${resourcePermission1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('resourceName').eqls(resourcePermissions1Details.resourceName);
    });
    it('it should return 404 when resource-permission does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/resource-permissions/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
      res.body.should.have.property('message').eqls('Not Found');
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .get(`/api/resource-permissions/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
  describe('/POST resource-permissions', () => {
    it('it should create resource-permission', async () => {
      const res = await chai.request(app)
        .post(`/api/resource-permissions`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(newResourcePermissionDetails);
      res.should.have.status(201);
      res.body.should.have.property('resourceName').eqls(newResourcePermissionDetails.resourceName);
    });
    it('it should not create resource-permission with wrong body', async () => {
      const res = await chai.request(app)
        .post(`/api/resource-permissions`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({});
      res.should.have.status(500);
    });
  });
  describe('/PUT resource-permissions/:id', () => {
    it('it should update resource-permission', async () => {
      const res = await chai.request(app)
        .put(`/api/resource-permissions/${resourcePermission1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedResourcePermissionDetails);
      res.should.have.status(200);
      res.body.should.have.property('resourceName').eqls(modifiedResourcePermissionDetails.resourceName);
    });
    it('it should not update resource-permission with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/resource-permissions/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(resourcePermissions1Details);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/resource-permissions/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(resourcePermissions1Details);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
  describe('/DELETE resource-permissions/:id', () => {
    it('it should delete resource-permission', async () => {
      const res = await chai.request(app)
        .delete(`/api/resource-permissions/${resourcePermission1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
    it('it should not delete resource-permission with false id', async () => {
      const res = await chai.request(app)
        .delete(`/api/resource-permissions/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .delete(`/api/resource-permissions/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Internal Server Error');
    });
  });
});
