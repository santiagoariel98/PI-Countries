const { Country, conn, Activities } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Activities.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    })
    describe('propiedades', () => {
      it("'name' tiene una longitud menor a 5 caracteres", () => {
        Activities.create({ name: "sant" })
          .then(()=> done(new Error("'name' debe tener al menos 5 caracteres")))
          .catch(()=> done())
      });
      it("'name' tiene una longitud mayor a 50 caracteres", () => {
        Activities.create({ name: "asdjklasdjklasdjklasjklasdjklasdjklasdjklasdasasdasd" })
          .then(()=> done(new Error("'name' debe tener al menos de 50 caracteres")))
          .catch(()=> done())
      });
      it("'season' no recibe un 'array' de 'strings'", () => {
        Activities.create({ season: "123" })
          .then(()=> done(new Error("'season' debe ser un 'array' de 'strings'")))
          .catch(()=> done())
      });
      it("no recibe estas prop: 'dificulty, duration, season'",()=>{
        Activities.create({name:"activity example" })
          .then(()=> done(new Error("no recibio 'dificulty', 'duration','season'")))
          .catch(()=> done())        
      })
      it("no recibe estas prop: 'dificulty, duration'",()=>{
        Activities.create({name:"activity example",season:["Summer"]})
          .then(()=> done(new Error("no recibio , 'dificulty','duration'")))
          .catch(()=> done())        
      })
      it("no recibe estas prop: 'duration'",()=>{
        Activities.create({name:"activity example",season:["Summer"],dificulty:5})
          .then(()=> done(new Error("no recibio 'duration'")))
          .catch(()=> done())        
      })
      
    });
  })
});
