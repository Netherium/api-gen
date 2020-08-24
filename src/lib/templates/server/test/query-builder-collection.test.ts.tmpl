process.env.NODE_ENV = 'test';
import App from '../src/server';
import * as chai from 'chai';

import UserModel from '../src/models/user.model';
import RoleModel from '../src/models/role.model';
import BookModel from '../src/models/book.model';
import ResourcePermissionModel from '../src/models/resource-permission.model';
import { Document } from 'mongoose';
import { Auth } from '../src/middleware/auth';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
const app = App.express;

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

describe('QueryBuilder', () => {
  let adminRole: Document;
  let adminUser: Document;
  let adminObj: any;
  let tokenAdmin: string;
  const totalBooks = 20;
  before(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await BookModel.deleteMany({});
    adminRole = await new RoleModel(adminRoleDetails).save();
    adminUser = await new UserModel({...adminUserDetails, role: adminRole}).save();
    adminObj = (await adminUser).toObject();
    const bookResourcePermission: any = {
      resourceName: 'books',
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
    await new ResourcePermissionModel(bookResourcePermission).save();
    await Auth.updateAppPermissions(null, app);
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(adminUserDetails);
    tokenAdmin = JSON.parse(res.text).token;
    const books = [];
    for (let i = 1; i <= totalBooks; i++) {
      const newBook = {
        title: `Test book${i}`,
        isbn: i,
        author: adminObj,
        isPublished: Math.random() >= 0.5,
        publishedAt: '2020-01-01T10:00:00.000Z',
        tags: [`book${i}tag1`, `book${i}tag2`]
      };
      books.push((await new BookModel(newBook).save()).toObject());
    }
  });
  describe('/Test "_eq" ?title_eq=Test book1', () => {
    it('it should return collection of books with title=Test book1', async () => {
      const res = await chai.request(app)
        .get('/api/books?title_eq=Test book1')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eql(totalBooks);
      res.body.should.have.deep.nested.property('data[0].title', 'Test book1');
    });
  });
  describe('/Test "_ne" ?title_ne=Test book1', () => {
    it('it should return collection of books with title!=Test book1', async () => {
      const res = await chai.request(app)
        .get('/api/books?title_ne=Test book1')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.data.map((e: any) => e.title).should.not.include('Test book1');
    });
  });
  describe('/Test "_lt" ?isbn_lt=2', () => {
    it('it should return collection of books with isbn < 2', async () => {
      const res = await chai.request(app)
        .get('/api/books?isbn_lt=2')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.property('data').lengthOf(1);
    });
  });
  describe('/Test "_lte" ?isbn_lte=2', () => {
    it('it should return collection of books with isbn <= 2', async () => {
      const res = await chai.request(app)
        .get('/api/books?isbn_lte=2')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.property('data').lengthOf(2);
    });
  });

  describe('/Test "_gt" ?isbn_gt=19', () => {
    it('it should return collection of books with isbn > 19', async () => {
      const res = await chai.request(app)
        .get('/api/books?isbn_gt=19')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.property('data').lengthOf(1);
    });
  });
  describe('/Test "_gte" ?isbn_gte=19', () => {
    it('it should return collection of books with isbn >= 19', async () => {
      const res = await chai.request(app)
        .get('/api/books?isbn_gte=19')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.property('data').lengthOf(2);
    });
  });
  describe('/Test "_sort" ?_sort=-isbn', () => {
    it('it should return collection of books sorted descending by isbn', async () => {
      const res = await chai.request(app)
        .get('/api/books?_sort=-isbn')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.deep.nested.property('data[0].title', 'Test book20');
    });
  });
  describe('/Test "_limit" ?_limit=-1', () => {
    it('it should return collection of books with no limit', async () => {
      const res = await chai.request(app)
        .get('/api/books?_limit=-1')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.property('data').lengthOf(totalBooks);
    });
  });
  describe('/Test "_page" ?_page=2', () => {
    it('it should return collection of books on page 2', async () => {
      const res = await chai.request(app)
        .get('/api/books?_page=2')
        .set('Authorization', 'Bearer ' + tokenAdmin);
      res.should.have.status(200);
      res.body.should.have.property('totalItems').eq(totalBooks);
      res.body.should.have.deep.nested.property('data[0].title', 'Test book11');
    });
  });
  after(async () => {
    await UserModel.deleteMany({});
    await ResourcePermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await BookModel.deleteMany({});
  });
});
