/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country,Activities, conn } = require('../../src/db.js');

const agent = session(app);
const countriesExample = [{
  id: "SAV",
  name: 'country example',
  flags: "example",
  continent: "example",
  capital: "example"
},
{
  id: "ABC",
  name: 'country example2',
  flags: "example2",
  continent: "example2",
  capital: "example2"
}];

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => countriesExample.map(e=> Country.create(e))));
   describe('POST /activity', function () {
      it('should post 200', function(){
        return agent.post('/activity')
          .send({
            name:"activity example",
            dificulty:5,
            duration:5,
            season:["Summer"],
            country:["SAV","ABC"]
          })
          .then(()=>{
            return Activities.findOne({
              where:{
                name:"activity example"
              }
            })
          })
          .then(activity=>{
            expect(activity).to.exist;
          })
      });
      it('should post 400', function(){
        return agent.post('/activity')
          .send({
            name:"activity example",
            dificulty:5,
            duration:5,
            season:["Summer"]
          })
          .expect(400);
      });
      it('should post 400', function(){
        return agent.post('/activity')
          .send({
            name:"activity example",
            dificulty:5,
            country:["ABC"]
          })
          .expect(400);
      });

    });
  describe('GET /activities', () => {
    it('should get 200', () =>
      agent.get('/activities').expect(200)
    );
  });
});
