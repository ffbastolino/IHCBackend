const {
  findUserAndUpdateAddress,
  findUserByName,
} = require('../services/userService');


const addNewAddress = (updateAddress) => findUserAndUpdateAddress(
  updateAddress.userId, updateAddress.newAddress,
);

const listUserByName = (searchName) => findUserByName(searchName);

module.exports.addNewAddress = addNewAddress;
module.exports.listUserByName = listUserByName;
