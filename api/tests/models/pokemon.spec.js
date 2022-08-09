const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });

  describe('HP', () =>{
    it('Lanza un error si HP no es un numero', (done) => {
      Pokemon.create({hp: 'hello'})
        .then(()=> done(new Error ('Debe ser un numero')))
        .catch(() => done ());
    });
    it('Funciona con un numero', () =>{
      Pokemon.create({hp: 20})
    })
  })

  describe('ATTACK', () =>{
    it('Lanza un error si HP no es un numero', (done) => {
      Pokemon.create({attack: 'hello'})
        .then(()=> done(new Error ('Debe ser un numero')))
        .catch(() => done ());
    });
    it('Funciona con un numero', () =>{
      Pokemon.create({attack: 20})
    })
  })

  describe('DEFENSE', () =>{
    it('Lanza un error si defense no es un numero', (done) => {
      Pokemon.create({defense: 'hello'})
        .then(()=> done(new Error ('Debe ser un numero')))
        .catch(() => done ());
    });
    it('Funciona con un numero', () =>{
      Pokemon.create({defense: 20})
    })
  })

  describe('SPEED', () =>{
    it('Lanza un error si SPEED no es un numero', (done) => {
      Pokemon.create({speed: 'hello'})
        .then(()=> done(new Error ('Debe ser un numero')))
        .catch(() => done ());
    });
    it('Funciona con un numero', () =>{
      Pokemon.create({speed: 20})
    })
  })


});

