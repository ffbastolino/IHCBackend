const convertWineDBToJSON = (wineDB) => ({
  wineId: wineDB.wineId || wineDB._id,
  name: wineDB.name,
  year: wineDB.year,
  price: wineDB.suggestedPrice,
  grapes: wineDB.grapes,
  winery: wineDB.winery,
  country: wineDB.country,
  region: wineDB.region,
  imgUrl: wineDB.imgUrl,
  type: wineDB.type,
});

const convertDetailedAddressDBToJSON = (addresses) => addresses.map((address) => {
  if (address.main) {
    return ({
      state: address.state,
      city: address.city,
      address: address.address,
      number: address.number,
    });
  }
  return '';
});


module.exports.convertWineDBToJSON = convertWineDBToJSON;
module.exports.convertDetailedAddressDBToJSON = convertDetailedAddressDBToJSON;
