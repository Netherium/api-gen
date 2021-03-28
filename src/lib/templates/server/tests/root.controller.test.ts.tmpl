import { getApiURL } from '../src/helpers/server.utils';

process.env.NODE_ENV = 'test';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../src/server';

chai.use(chaiHttp);
chai.should();

const app = App.express;

describe('Base Routes', () => {
  describe('/GET root', () => {
    it('it should return the root route', async () => {
      const res = await chai.request(app).get('/');
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message')
        .eql(`Welcome to ${process.env.SITE_TITLE}. You can find endpoints documentation ${getApiURL()}/docs`);
    });
  });
  describe('/GET not found', () => {
    it('it should return not found', async () => {
      const res = await chai.request(app).get('/notfound');
      res.should.have.status(404);
    });
  });
  describe('/GET Syntax Error', () => {
    it('it should return bad request', async () => {
      const res = await chai.request(app).get('/%');
      res.should.have.status(400);
    });
  });
});
