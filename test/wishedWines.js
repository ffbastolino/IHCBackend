/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiThings = require('chai-things');
const chaiAsPromised = require('chai-as-promised');
const { intiTestDB, closeTestDB } = require('./config/testDatabase');
const {
  getAllWishedWines,
  getFeaturedWishedWines,
  getWishedWineById,
} = require('../controllers/wishedWineController');

const should = chai.should();
chai.use(chaiThings);
chai.use(chaiAsPromised);

let connection;
let testById;

describe('Wished wines service tests', () => {
  before(async () => {
    connection = await intiTestDB();
  });

  after(async () => {
    await closeTestDB(connection);
  });

  describe('List all wished wines in the database', () => {
    it('Tests if the request return an array with a short description of registered wishes', async () => {
      const wishes = await getAllWishedWines();
      wishes.should.be.an('array');
      wishes.should.all.have.property('wine');
      wishes.should.all.have.property('address');
      wishes[0].wine.should.be.an('object');
      wishes[0].address.should.be.an('object');

      [testById] = wishes;
    });

    it('Tests if the request return an array with a short description of registered featured wishes', async () => {
      const featuredWishes = await getFeaturedWishedWines();
      featuredWishes.should.be.an('array');
      featuredWishes.should.all.have.property('wine');
      featuredWishes.should.all.have.property('address');
      featuredWishes[0].wine.should.be.an('object');
      featuredWishes[0].address.should.be.an('object');
    });

    it('Tests if the request return an object with the complete description', async () => {
      const { wishId } = testById;
      const wish = await getWishedWineById(wishId);
      wish.should.be.an('object');
      wish.should.have.property('wishId');
      wish.should.have.property('wine');
      wish.should.have.property('user');
      wish.wine.should.be.an('object');
      wish.user.should.be.an('object');
    });
  });

  describe('Validation tests', () => {
    it('Tests if the empty id validation is working', async () => {
      await getWishedWineById().should.be.rejected;
    });

    it('Tests if the invalid id validation is working', async () => {
      const invalidId = '212';
      await getWishedWineById(invalidId).should.be.rejected;
    });

    it('Tests if the wine not found validation is working', async () => {
      const validId = '5d9e1caf71239d290b54ea71';
      await getWishedWineById(validId).should.be.rejected;
    });
  });
});
