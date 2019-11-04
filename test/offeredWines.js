/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiThings = require('chai-things');
const { intiTestDB, closeTestDB } = require('./config/testDatabase');
const {
  listOffers,
  getFeaturedOfferedWines,
  getOfferById,
} = require('../controllers/offeredWineController');

const should = chai.should();
chai.use(chaiThings);

let connection;
let testById;

describe('Offered wines service tests', () => {
  before(async () => {
    connection = await intiTestDB();
  });

  after(async () => {
    await closeTestDB(connection);
  });

  describe('List offered wines in the database', () => {
    it('Tests if the request return an array with a short description of registered offers', async () => {
      const offers = await listOffers();
      offers.should.be.an('array');
      offers.should.all.have.property('offerId');
      offers.should.all.have.property('wine');
      offers.should.all.have.property('address');
      offers.should.all.have.property('origin');
      offers[0].wine.should.be.an('object');
      offers[0].address.should.be.an('object');
      offers[0].origin.should.be.a('number');

      [testById] = offers;
    });

    it('Tests if the request return an array with a short description of registered featured offers', async () => {
      const featuredOffers = await getFeaturedOfferedWines();
      featuredOffers.should.be.an('array');
      featuredOffers.should.all.have.property('offerId');
      featuredOffers.should.all.have.property('wine');
      featuredOffers.should.all.have.property('address');
      featuredOffers.should.all.have.property('origin');
      featuredOffers[0].wine.should.be.an('object');
      featuredOffers[0].address.should.be.an('object');
      featuredOffers[0].origin.should.be.a('number');
    });

    it('Tests if the request return an object with the complete description', async () => {
      const { offerId } = testById;
      const offer = await getOfferById(offerId);
      offer.should.be.an('object');
      offer.should.have.property('offerId');
      offer.should.have.property('wine');
      offer.should.have.property('user');
      offer.should.have.property('origin');
      offer.wine.should.be.an('object');
      offer.user.should.be.an('object');
      offer.origin.should.be.a('number');
    });
  });

  describe('Validation tests', () => {
    it('Tests if the empty id validation is working', async () => {
      await getOfferById().should.be.rejected;
    });

    it('Tests if the invalid id validation is working', async () => {
      const invalidId = '212';
      await getOfferById(invalidId).should.be.rejected;
    });

    it('Tests if the wine not found validation is working', async () => {
      const validId = '5d9e1caf71239d290b54ea71';
      await getOfferById(validId).should.be.rejected;
    });
  });
});
