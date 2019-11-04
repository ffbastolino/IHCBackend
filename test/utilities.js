/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiThings = require('chai-things');

const {
  convertAddressDBToJSON,
  convertDetailedAddressDBToJSON,
  convertWineDBToJSON,
} = require('../util/wineUtilities');

const {
  convertOfferDBtoCardJSON,
  convertedDetailedOfferDBtoCardJson,
} = require('../controllers/offeredWineController');

const {
  convertedWishedDBtoCardJSON,
  convertedDetailedWishDBtoCardJson,
} = require('../controllers/wishedWineController');

const should = chai.should();
chai.use(chaiThings);

const wine = {
  _id: 'someObjectId',
  name: 'some wine',
  year: 2000,
  suggestedPrice: 31231,
  grapes: ['a', 'b', 'c'],
  winery: 'some winery',
  imgUrl: 'inserimageurlhere',
};

const address = {
  state: 'RS',
  city: 'Porto Alegre',
  address: 'Rua Siqueira Campos',
  number: 1184,
};

const user = {
  name: 'Testes',
  address,
  grade: 4.4,
};

const offer = {
  _id: 'offerid',
  wine,
  user,
  origin: 1,
};

const wish = {
  _id: 'wishid',
  wine,
  user,
};

describe('Utilities tests', () => {
  it('Tests if the function is converting to the correct wine JSON', () => {
    const convertedWine = convertWineDBToJSON(wine);
    convertedWine.should.be.an('object');
    convertedWine.should.have.property('wineId');

    convertedWine.should.have.property('name');
    convertedWine.name.should.be.a('string');

    convertedWine.should.have.property('year');
    convertedWine.year.should.be.a('number');

    convertedWine.should.have.property('price');
    convertedWine.price.should.be.a('number');

    convertedWine.should.have.property('grapes');
    convertedWine.grapes.should.be.an('array');

    convertedWine.should.have.property('winery');
    convertedWine.winery.should.be.a('string');

    convertedWine.should.have.property('imgUrl');
    convertedWine.imgUrl.should.be.a('string');
  });

  it('Tests if the function is converting to the correct short address JSON', () => {
    const shortAddress = convertAddressDBToJSON(address);
    shortAddress.should.be.an('object');

    shortAddress.should.have.property('state');
    shortAddress.state.should.be.a('string');

    shortAddress.should.have.property('city');
    shortAddress.city.should.be.a('string');
  });

  it('Tests if the function is converting to the correct detailed address JSON', () => {
    const detailedAddress = convertDetailedAddressDBToJSON(address);
    detailedAddress.should.be.an('object');

    detailedAddress.should.have.property('state');
    detailedAddress.state.should.be.a('string');

    detailedAddress.should.have.property('city');
    detailedAddress.city.should.be.a('string');

    detailedAddress.should.have.property('address');
    detailedAddress.address.should.be.a('string');

    detailedAddress.should.have.property('number');
    detailedAddress.number.should.be.a('number');
  });

  it('Tests if the function is converting to the correct offer card JSON', async () => {
    const offerCard = convertOfferDBtoCardJSON(offer);
    offerCard.should.be.an('object');
    offerCard.should.have.property('offerId');

    offerCard.should.have.property('origin');
    offerCard.origin.should.be.a('number');

    offerCard.should.have.property('wine');
    offerCard.wine.should.be.a('object');
    offerCard.should.have.nested.property('wine.wineId');
    offerCard.should.have.nested.property('wine.name');
    offerCard.wine.name.should.be.a('string');
    offerCard.should.have.nested.property('wine.year');
    offerCard.wine.year.should.be.a('number');
    offerCard.should.have.nested.property('wine.grapes');
    offerCard.wine.grapes.should.be.an('array');
    offerCard.should.have.nested.property('wine.winery');
    offerCard.wine.winery.should.be.a('string');

    offerCard.should.have.property('address');
    offerCard.address.should.be.a('object');
    offerCard.should.have.nested.property('address.state');
    offerCard.address.state.should.be.a('string');
    offerCard.should.have.nested.property('address.city');
    offerCard.address.city.should.be.a('string');
  });

  it('Tests if the function is converting to the correct detailed offer JSON', async () => {
    const detailedOffer = convertedDetailedOfferDBtoCardJson(offer);
    detailedOffer.should.be.an('object');
    detailedOffer.should.have.property('offerId');

    detailedOffer.should.have.property('origin');
    detailedOffer.origin.should.be.a('number');

    detailedOffer.should.have.property('wine');
    detailedOffer.wine.should.be.a('object');
    detailedOffer.should.have.nested.property('wine.wineId');
    detailedOffer.should.have.nested.property('wine.name');
    detailedOffer.wine.name.should.be.a('string');
    detailedOffer.should.have.nested.property('wine.year');
    detailedOffer.wine.year.should.be.a('number');
    detailedOffer.should.have.nested.property('wine.grapes');
    detailedOffer.wine.grapes.should.be.an('array');
    detailedOffer.should.have.nested.property('wine.winery');
    detailedOffer.wine.winery.should.be.a('string');

    detailedOffer.should.have.property('user');
    detailedOffer.user.should.be.a('object');
    detailedOffer.should.have.nested.property('user.name');
    detailedOffer.user.name.should.be.a('string');
    detailedOffer.should.have.nested.property('user.grade');
    detailedOffer.user.grade.should.be.a('number');
    detailedOffer.should.have.nested.property('user.address.state');
    detailedOffer.user.address.state.should.be.a('string');
    detailedOffer.should.have.nested.property('user.address.city');
    detailedOffer.user.address.city.should.be.a('string');
    detailedOffer.should.have.nested.property('user.address.address');
    detailedOffer.user.address.address.should.be.a('string');
    detailedOffer.should.have.nested.property('user.address.number');
    detailedOffer.user.address.number.should.be.a('number');
  });

  it('Tests if the function is converting to the correct wish card JSON', async () => {
    const wishCard = convertedWishedDBtoCardJSON(wish);
    wishCard.should.be.an('object');
    wishCard.should.have.property('wishId');

    wishCard.should.have.property('wine');
    wishCard.wine.should.be.a('object');
    wishCard.should.have.nested.property('wine.wineId');
    wishCard.should.have.nested.property('wine.name');
    wishCard.wine.name.should.be.a('string');
    wishCard.should.have.nested.property('wine.year');
    wishCard.wine.year.should.be.a('number');
    wishCard.should.have.nested.property('wine.grapes');
    wishCard.wine.grapes.should.be.an('array');
    wishCard.should.have.nested.property('wine.winery');
    wishCard.wine.winery.should.be.a('string');

    wishCard.should.have.property('address');
    wishCard.address.should.be.a('object');
    wishCard.should.have.nested.property('address.state');
    wishCard.address.state.should.be.a('string');
    wishCard.should.have.nested.property('address.city');
    wishCard.address.city.should.be.a('string');
  });

  it('Tests if the function is converting to the correct detailed offer JSON', async () => {
    const detailedWish = convertedDetailedOfferDBtoCardJson(offer);
    detailedWish.should.be.an('object');
    detailedWish.should.have.property('offerId');

    detailedWish.should.have.property('wine');
    detailedWish.wine.should.be.a('object');
    detailedWish.should.have.nested.property('wine.wineId');
    detailedWish.should.have.nested.property('wine.name');
    detailedWish.wine.name.should.be.a('string');
    detailedWish.should.have.nested.property('wine.year');
    detailedWish.wine.year.should.be.a('number');
    detailedWish.should.have.nested.property('wine.grapes');
    detailedWish.wine.grapes.should.be.an('array');
    detailedWish.should.have.nested.property('wine.winery');
    detailedWish.wine.winery.should.be.a('string');

    detailedWish.should.have.property('user');
    detailedWish.user.should.be.a('object');
    detailedWish.should.have.nested.property('user.name');
    detailedWish.user.name.should.be.a('string');
    detailedWish.should.have.nested.property('user.grade');
    detailedWish.user.grade.should.be.a('number');
    detailedWish.should.have.nested.property('user.address.state');
    detailedWish.user.address.state.should.be.a('string');
    detailedWish.should.have.nested.property('user.address.city');
    detailedWish.user.address.city.should.be.a('string');
    detailedWish.should.have.nested.property('user.address.address');
    detailedWish.user.address.address.should.be.a('string');
    detailedWish.should.have.nested.property('user.address.number');
    detailedWish.user.address.number.should.be.a('number');
  });
});
