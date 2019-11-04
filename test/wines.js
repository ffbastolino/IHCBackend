/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiThings = require('chai-things');
const chaiAsPromised = require('chai-as-promised');
const { intiTestDB, closeTestDB } = require('./config/testDatabase');
const {
  getAllWines,
  validateAndCreateWine,
  updateWineById,
} = require('../controllers/wineController');

const should = chai.should();
chai.use(chaiThings);
chai.use(chaiAsPromised);

let connection;
let testById;
const testWine = {
  name: 'Teste',
  year: 2016,
  country: 'BR',
  suggestedPrice: 2000,
  grapes: [
    'Pinot Noir',
  ],
  winery: 'Villa Wolf',
  imgUrl: 'http://images.vivino.com/thumbs/0g_1C_WzTXGDKEfOEiyoag_pb_x600.png',
};

describe('Wine service tests', () => {
  before(async () => {
    connection = await intiTestDB();
  });

  after(async () => {
    await closeTestDB(connection);
  });

  describe('List all wines in the database', () => {
    it('Tests if the request returns an array of wines with its properties ', async () => {
      const wines = await getAllWines();
      wines.should.be.an('array');
      wines.should.all.have.property('name');
      wines.should.all.have.property('year');
      wines.should.all.have.property('grapes');
      wines.should.all.have.property('winery');
      wines[0].name.should.be.a('string');
      wines[0].year.should.be.a('number');
      wines[0].grapes.should.be.an('array');
      wines[0].winery.should.be.a('string');

      [testById] = wines;
    });
  });


  describe('Create wine in the database', () => {
    it('Tests if the request saves a wine with its properties', async () => {
      const posted = await validateAndCreateWine(testWine);
      posted.should.be.an('object');
      posted.should.have.property('name');
      posted.should.have.property('year');
      posted.should.have.property('grapes');
      posted.should.have.property('winery');
    });
  });

  describe('Edit a wine in the database', () => {
    it('Tests if the request successfully edit a wine in the database', async () => {
      const { wineId } = testById;
      const updateOptions = {
        wineId,
        update: {
          name: 'Edited name',
        },
      };

      const updated = await updateWineById(updateOptions);
      updated.should.be.an('object');
      updated.should.have.property('name');
      updated.should.have.property('year');
      updated.should.have.property('grapes');
      updated.should.have.property('winery');
      updated.name.should.be.equal('Edited name');
    });
  });

  describe('Validation tests', () => {
    describe('Create validations', () => {
      it('Tests if the empty name validation is working', async () => {
        const {
          country, grapes, imgUrl, suggestedPrice, winery, year,
        } = testWine;
        const invalidWine = {
          country,
          grapes,
          imgUrl,
          suggestedPrice,
          winery,
          year,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });

      it('Tests if the empty country validation is working', async () => {
        const {
          name, grapes, imgUrl, suggestedPrice, winery, year,
        } = testWine;
        const invalidWine = {
          name,
          grapes,
          imgUrl,
          suggestedPrice,
          winery,
          year,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });

      it('Tests if the empty grapes validation is working', async () => {
        const {
          name, country, imgUrl, suggestedPrice, winery, year,
        } = testWine;
        const invalidWine = {
          name,
          country,
          imgUrl,
          suggestedPrice,
          winery,
          year,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });

      it('Tests if the empty suggestedPrice validation is working', async () => {
        const {
          name, country, imgUrl, grapes, winery, year,
        } = testWine;
        const invalidWine = {
          name,
          country,
          imgUrl,
          grapes,
          winery,
          year,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });

      it('Tests if the empty winery validation is working', async () => {
        const {
          name, country, imgUrl, grapes, suggestedPrice, year,
        } = testWine;
        const invalidWine = {
          name,
          country,
          imgUrl,
          grapes,
          suggestedPrice,
          year,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });

      it('Tests if the empty year validation is working', async () => {
        const {
          name, country, imgUrl, grapes, suggestedPrice, winery,
        } = testWine;
        const invalidWine = {
          name,
          country,
          imgUrl,
          grapes,
          suggestedPrice,
          winery,
        };
        await validateAndCreateWine(invalidWine).should.be.rejected;
      });
    });

    describe('Update validations', () => {
      it('Tests if the empty id validation is working', async () => {
        const updateOptions = {
          update: {
            name: 'Edited name',
          },
        };
        await updateWineById(updateOptions).should.be.rejected;
      });

      it('Tests if the empty update validation is working', async () => {
        const { wineId } = testById;
        const updateOptions = {
          wineId,
        };
        await updateWineById(updateOptions).should.be.rejected;
      });

      it('Tests if the invalid id validation is working', async () => {
        const updateOptions = {
          wineId: '12',
          update: {
            name: 'Edited name',
          },
        };
        await updateWineById(updateOptions).should.be.rejected;
      });
    });
  });
});
