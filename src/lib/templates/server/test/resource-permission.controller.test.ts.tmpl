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

const publicUserDetails = {
  email: 'public@email.com',
  name: 'Testlogin',
  password: 'qwerty'
};

const resourcePermissions1Details: any = {
  resourceName: 'test1',
  methods: [
    {
      roles: [],
      name: 'list'
    }
  ]
};

const resourcePermissions2Details: any = {
  resourceName: 'test2',
  methods: [
    {
      roles: [],
      name: 'list'
    }
  ]
};

const newResourcePermissionDetails: any = {
  resourceName: 'newTest',
  methods: [
    {
      roles: [],
      name: 'list'
    }
  ]
};

const modifiedResourcePermissionDetails: any = {
  resourceName: 'modifiedTest',
  methods: [
    {
      roles: [],
      name: 'list'
    }
  ]
};

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
      res.body.should.have.property('message').eqls('Server Error');
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
      res.body.should.have.property('message').eqls('Server Error');
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
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
});
