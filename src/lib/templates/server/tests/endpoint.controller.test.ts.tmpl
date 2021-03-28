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

chai.use(chaiHttp);
chai.should();

const app = App.express;

describe('Endpoints', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let publicUser: Document;
  let tokenAdmin: string;
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    const endpointResourcePermission: any = {
      resourceName: 'endpoints',
      methods: [
        {
          roles: [adminRole],
          name: 'list'
        }
      ]
    };
    await new ResourcePermissionModel(endpointResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
  });
  describe('/GET endpoints', () => {
    it('it should return collection of endpoints', async () => {
      const res = await chai.request(app)
        .get('/api/endpoints')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.be.an('array');
    });
  });
});
