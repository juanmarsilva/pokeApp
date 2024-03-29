/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  
  describe('GET /pokemons', () => {
    it('should get 200', (done) => {
      agent.get('/pokemons').expect(200)
      done();
    }).timeout(5000);
  });
  
  describe('POST /pokemons', () => {
    it("POST agrega un nuevo pokemon", function () {
      agent.post("/pokemons")
      .send(pokemon)
      .expect(200)
    })
  });
  
  describe('GET /types', () => {
    it("Tiene estado 200", function () {
      agent.get("/types")
      .send(pokemon)
      .expect(200)
    })
  });

});
