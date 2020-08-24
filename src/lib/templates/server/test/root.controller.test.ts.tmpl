process.env.NODE_ENV = 'test';
import App from '../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const app = App.express;
chai.use(chaiHttp);
const should = chai.should();

describe('Base Routes', () => {
  describe('/GET root', () => {
    it('it should return the root route', async () => {
      const res = await chai.request(app).get('/');
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message')
        .eql(`Welcome to Neth-Express-Api-TS. You can find endpoints documentation http://${process.env.ADDRESS}:${process.env.PORT}/api/docs`);
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
