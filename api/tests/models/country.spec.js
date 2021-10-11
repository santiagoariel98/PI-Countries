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
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    })
    describe('propiedades', () => {
      it("deberia arrojar error si 'name' es un numero", () => {
        Country.create({ name: 123 })
          .then(()=> done(new Error("'name' es un numeroo")))
          .catch(()=> done())
      });
      it("deberia arrojar error si 'id' es un numero", () => {
        Country.create({ id: 123 })
          .then(()=> done(new Error("'name' es un numeroo")))
          .catch(()=> done())
      });
      it("deberia arrojar error si no recibe estas prop: 'contient, capital, name'",()=>{
        Country.create({ id:"SAV", flags:"example" })
          .then(()=> done(new Error("no recibio 'continent', 'capital','name'")))
          .catch(()=> done())        
      })
      it("deberia arrojar error si no recibe estas prop: 'capital, name'",()=>{
        Country.create({ id:"SAV", flags:"example",continent:"example" })
          .then(()=> done(new Error("no recibio , 'capital','name'")))
          .catch(()=> done())        
      })
      it("deberia arrojar error si no recibe estas prop: 'name'",()=>{
        Country.create({ id:"SAV", flags:"example",continent:"example", capital:"example",name:"example"})
          .then(()=> done(new Error("no recibio 'name'")))
          .catch(()=> done())        
      })        
    });
  })
});
