process.env.NODE_ENV = 'test';
import App from '../src/server';
import * as chai from 'chai';

import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import MediaObjectModel from '../src/models/media-object.model';
import BookModel from '../src/models/book.model';
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

const upload1Details = {
  alternativeText: 'alternativeText upload1',
  caption: 'caption upload1',
  filePath: './test/assets/sample.png'
};

const upload2Details = {
  alternativeText: 'alternativeText upload2',
  caption: 'caption upload2',
  filePath: './test/assets/sample.png'
};

const book1Details = {
  title: 'A test book',
  isbn: 12345,
  isPublished: true,
  publishedAt: '2020-01-01T10:00:00.000Z',
  tags: ['book1tag1', 'book1tag2']
};

const book2Details = {
  title: 'A test book2',
  isbn: 54321,
  isPublished: false,
  publishedAt: '2020-01-02T10:00:00.000Z',
  tags: ['book2tag1', 'book2tag2']
};

const newBookDetails = {
  title: 'A new book',
  isbn: 33333,
  isPublished: true,
  publishedAt: '2020-01-02T10:00:00.000Z',
  tags: ['book3tag1', 'book3tag2']
};

const modifiedBookDetails = {
  title: 'A modified book'
};

const falseUID = '5ca4ab6f3f86e02af8e1a5a3';

describe('Books', () => {
  let publicRole: Document;
  let adminRole: Document;
  let adminUser: Document;
  let adminObj: any;
  let publicUser: Document;
  let book1: Document;
  let book2: Document;
  let tokenAdmin: string;
  let upload1: any;
  let upload2: any;
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
    await BookModel.deleteMany({});
    publicRole = await new RoleModel(publicRoleDetails).save();
    adminRole = await new RoleModel(adminRoleDetails).save();
    publicUser = await new UserModel({...publicUserDetails, role: publicRole}).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    adminObj = (await adminUser).toObject();
    const bookResourcePermission: any = {
      resourceName: 'books',
      methods: [
        {
          roles: [publicRole],
          name: 'list'
        },
        {
          roles: [publicRole],
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
    const mediaObjectResourcePermission: any = {
      resourceName: 'media-objects',
      methods: [
        {
          roles: [publicRole],
          name: 'list'
        },
        {
          roles: [publicRole],
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
    await new ResourcePermissionModel(bookResourcePermission).save();
    await new ResourcePermissionModel(mediaObjectResourcePermission).save();
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
    upload2 = (await chai.request(app)
      .post('/api/media-objects')
      .set('Authorization', 'Bearer ' + tokenAdmin)
      .field('alternativeText', upload2Details.alternativeText)
      .field('caption', upload2Details.caption)
      .attach('file', upload2Details.filePath)).body;
    book1 = await new BookModel({...book1Details, author: adminUser, cover: upload1, images: [upload1, upload2]}).save();
    book2 = await new BookModel({...book2Details, author: adminUser, cover: upload1, images: [upload1, upload2]}).save();
  });
  describe('/GET books', () => {
    it('it should return collection of books', async () => {
      const res = await chai.request(app)
        .get('/api/books');
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eql(2);
      res.body.should.have.property('data').lengthOf(2);
    });
  });
  describe('/GET books/:id', () => {
    it('it should return a single book', async () => {
      const res = await chai.request(app)
        .get(`/api/books/${book1._id}`);
      res.should.have.status(200);
      res.body.should.have.property('title').eqls(book1Details.title);
    });
    it('it should return 404 when book does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/books/${falseUID}`);
      res.should.have.status(404);
      res.body.should.have.property('message').eqls('Not Found');
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .get(`/api/books/1234`);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/POST books', () => {
    it('it should create book', async () => {
      const newBookDetailsWAuthor = {
        ...newBookDetails,
        author: adminObj
      };
      const res = await chai.request(app)
        .post(`/api/books`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(newBookDetailsWAuthor);
      res.should.have.status(201);
      res.body.should.have.property('title').eqls(newBookDetails.title);
      res.body.should.have.property('author').have.property('email').eqls(adminUserDetails.email);
    });
    it('it should not create book with wrong body', async () => {
      const res = await chai.request(app)
        .post(`/api/books`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({});
      res.should.have.status(500);
    });
  });
  describe('/PUT books/:id', () => {
    it('it should update book', async () => {
      const res = await chai.request(app)
        .put(`/api/books/${book1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(modifiedBookDetails);
      res.should.have.status(200);
      res.body.should.have.property('title').eqls(modifiedBookDetails.title);
    });
    it('it should not update book with false id', async () => {
      const res = await chai.request(app)
        .put(`/api/books/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(book1Details);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .put(`/api/books/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(book1Details);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  describe('/DELETE books/:id', () => {
    it('it should delete book', async () => {
      const res = await chai.request(app)
        .delete(`/api/books/${book1._id}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(204);
    });
    it('it should not delete book with false id', async () => {
      const res = await chai.request(app)
        .delete(`/api/books/${falseUID}`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(404);
    });
    it('it should return 500 when id not a mongoose uid', async () => {
      const res = await chai.request(app)
        .delete(`/api/books/1234`)
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(500);
      res.body.should.have.property('message').eqls('Server Error');
    });
  });
  after(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await MediaObjectModel.deleteMany({});
    await BookModel.deleteMany({});
  });
});
