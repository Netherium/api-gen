process.env.NODE_ENV = 'test';
import App from '../src/server';
import * as chai from 'chai';

import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import MediaObjectModel from '../src/models/media-object.model';
import { Document } from 'mongoose';
import { Auth } from '../src/middleware/auth';
import { UploadService } from '../src/services/upload.service';
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

const upload1Details = {
  alternativeText: 'alternativeText upload1',
  caption: 'caption upload1',
  filePath: './test/assets/sample.png'
};

const newDetails = {
  alternativeText: 'alternativeText new',
  caption: 'caption new',
  filePath: './test/assets/sample.png'
};

const modifiedUploadDetails = {
  alternativeText: 'alternativeText modified',
  caption: 'caption modified',
};

const {uploadService}: { uploadService: UploadService } = app.get('services');

const falseUID = '5ca4ab6f3f86e02af8e1a5a3';

describe('Uploads Provider: local', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let publicUser: Document;
  let tokenAdmin: string;
  let upload1: any;
  before(async () => {
    process.env.UPLOAD_PROVIDER = 'local';
    uploadService.isLocalProvider = true;
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    const uploadResourcePermission: any = {
      resourceName: 'media-objects',
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
    await new ResourcePermissionModel(uploadResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
    upload1 = (await chai.request(app)
      .post('/api/media-objects')
      .set('Authorization', 'Bearer ' + tokenAdmin)
      .field('alternativeText', upload1Details.alternativeText)
      .field('caption', upload1Details.caption)
      .attach('file', upload1Details.filePath)).body;
  });
  describe('/GET media-objects', () => {
    it('it should return collection of media-objects', async () => {
      const res = await chai.request(app)
        .get('/api/media-objects')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
    });
  });
  describe('/GET media-object/:id', () => {
    it('it should return a single media-object', async () => {
      const res = await chai.request(app)
        .get(`/api/media-objects/${upload1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('alternativeText').eqls(upload1Details.alternativeText);
    });
    it('it should return 404 when upload does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/media-objects/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
      res.body.should.have.property('message').eqls('Not Found');
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .get(`/api/media-objects/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/POST media-objects', () => {
    it('it should create upload', async () => {
      const res = await chai.request(app)
        .post(`/api/media-objects`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('alternativeText', newDetails.alternativeText)
        .field('caption', newDetails.caption)
        .attach('file', newDetails.filePath);
      res.should.have.status(201);
      res.body.should.have.property('alternativeText').eqls(newDetails.alternativeText);
      res.body.should.have.property('caption').eqls(newDetails.caption);
    });
    it('it should return 422 when no file is send', async () => {
      const res = await chai.request(app)
        .post(`/api/media-objects`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .attach('file', null);
      res.should.have.status(422);
    });
  });
  describe('/PUT media-object/:id', () => {
    it('it should update media-object', async () => {
      const res = await chai.request(app)
        .put(`/api/media-objects/${upload1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUploadDetails);
      res.should.have.status(200);
      res.body.should.have.property('alternativeText').eqls(modifiedUploadDetails.alternativeText);
      res.body.should.have.property('caption').eqls(modifiedUploadDetails.caption);
    });
    it('it should not update upload with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/media-objects/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUploadDetails);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/media-objects/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedUploadDetails);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/DELETE uploads/:id', () => {
    it('it should delete media-object', async () => {
      const res = await chai.request(app)
        .delete(`/api/media-objects/${upload1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
    it('it should not delete media-object with false id', async () => {
      const res = await chai.request(app)
        .delete(`/api/media-objects/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .delete(`/api/media-objects/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  after(async () => {
    const allUploads = await chai.request(app)
      .get(`/api/media-objects?_limit=-1`)
      .set('Authorization', 'Bearer ' + tokenAdmin);
    if (allUploads.hasOwnProperty('body')) {
      for (const upload of allUploads.body.data) {
        await chai.request(app)
          .delete(`/api/media-objects/${upload._id}`)
          .set('Authorization', 'Bearer ' + tokenAdmin);
      }
    }
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
  });
});

describe('Uploads Provider: do', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let publicUser: Document;
  let tokenAdmin: string;
  let upload1: any;
  before(async () => {
    process.env.UPLOAD_PROVIDER = 'do';
    uploadService.isLocalProvider = false;
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    const uploadResourcePermission: any = {
      resourceName: 'media-objects',
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
    await new ResourcePermissionModel(uploadResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
    upload1 = (await chai.request(app)
      .post(`/api/media-objects`)
      .set('Authorization', 'Bearer ' + tokenAdmin)
      .field('alternativeText', upload1Details.alternativeText)
      .field('caption', upload1Details.caption)
      .attach('file', upload1Details.filePath)).body;
  });
  describe(`/POST uploads with remote provider`, () => {
    it('it should create upload', async () => {
      const res = await chai.request(app)
        .post(`/api/media-objects`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('alternativeText', newDetails.alternativeText)
        .field('caption', newDetails.caption)
        .attach('file', newDetails.filePath);
      res.should.have.status(201);
      res.body.should.have.property('alternativeText').eqls(newDetails.alternativeText);
      res.body.should.have.property('caption').eqls(newDetails.caption);
    });
  });
  describe(`/DELETE uploads/:id with remote provider`, () => {
    it('it should delete upload', async () => {
      const res = await chai.request(app)
        .delete(`/api/media-objects/${upload1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
  });
  after(async () => {
    const allUploads = await chai.request(app)
      .get(`/api/media-objects?_limit=-1`)
      .set('Authorization', 'Bearer ' + tokenAdmin);
    if (allUploads.hasOwnProperty('body')) {
      for (const upload of allUploads.body.data) {
        await chai.request(app)
          .delete(`/api/media-objects/${upload._id}`)
          .set('Authorization', 'Bearer ' + tokenAdmin);
      }
    }
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
  });
});

