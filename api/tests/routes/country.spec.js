/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const countryExample = {
  id: "ABC",
  name: 'country example',
  flags: "example",
  continent: "example",
  capital: "example"
};
const countryExample2 = {
  id: "SAV",
  name: 'SAV example',
  flags: "SAV",
  continent: "SAV",
  capital: "SAV"
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => {
      Country.create(countryExample)
      Country.create(countryExample2)
    }));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /countries/:id', () => {
    it('should get 200', () =>
      agent.get('/countries/abc').expect(200)
    );
    it('should get 404', () =>
      agent.get('/countries/abcs').expect(404)
    );
    it('should get 404', () =>
      agent.get('/countries/123').expect(404)
    );
    it('should get 200', () =>
      agent.get('/countries/sav').expect(200)
    );
  });
  describe('(query) GET /countries?name=...', () => {
    it('(query) should get 404 ', () =>
      agent.get('/countries?name=example').expect(200)
    );
    it('(query) should get 404 ', () =>
      agent.get('/countries?name=examples').expect(404)
    );
  });  
});
