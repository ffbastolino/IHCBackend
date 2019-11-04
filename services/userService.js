const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('User');

const LIMIT_FEATURED = 3;
const PAGELIMIT = 5;
const WISHEDWINES = '$wishedWines';
const OFFEREDWINES = '$offeredWines';

const findUserById = (userId) => User.findById(userId);

const findUserByName = (userName) => User.find({
  name: { $regex: new RegExp(userName), $options: 'i' },
}, { wishedWines: 0, offeredWines: 0 });


const findUserAndUpdateAddress = (id, address) => User.findOneAndUpdate(
  { _id: id },
  { $push: { addresses: address } },
  {
    projection: {
      addresses: true,
    },
  },
);

const findUsersAndWishedWines = (numberPage) => User.aggregate([
  {
    $unwind: WISHEDWINES,
  },
  {
    $skip: numberPage * PAGELIMIT,
  },
  {
    $limit: PAGELIMIT,
  },
]);

const findFeaturedWishedWines = () => User.aggregate([
  {
    $unwind: WISHEDWINES,
  },
  { $sort: { 'wishedWines.insertionDate': -1 } },
  { $limit: LIMIT_FEATURED },
]);

const findWishById = (id) => User.aggregate([
  {
    $unwind: WISHEDWINES,
  },
  { $match: { 'wishedWines._id': mongoose.Types.ObjectId(id) } },
]);


const findUsersAndOfferedWines = (numberPage) => User.aggregate([
  {
    $unwind: OFFEREDWINES,
  },
  {
    $skip: numberPage * PAGELIMIT,
  },
  {
    $limit: PAGELIMIT,
  },
]);

const findFeaturedOfferedWines = () => User.aggregate([
  {
    $unwind: OFFEREDWINES,
  },
  { $sort: { 'offeredWines.insertionDate': -1 } },
  { $limit: LIMIT_FEATURED },
]);

const findOfferById = (id) => User.aggregate([
  {
    $unwind: OFFEREDWINES,
  },
  { $match: { 'offeredWines._id': mongoose.Types.ObjectId(id) } },
]);


module.exports.findUserById = findUserById;
module.exports.findUserAndUpdateAddress = findUserAndUpdateAddress;
module.exports.findUsersAndWishedWines = findUsersAndWishedWines;
module.exports.findFeaturedWishedWines = findFeaturedWishedWines;
module.exports.findUsersAndOfferedWines = findUsersAndOfferedWines;
module.exports.findFeaturedOfferedWines = findFeaturedOfferedWines;
module.exports.findOfferById = findOfferById;
module.exports.findWishById = findWishById;
module.exports.findUserById = findUserById;
module.exports.findUserByName = findUserByName;
