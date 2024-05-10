'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const bikeModel = require('./bike/model.js');
const Collection = require('./data-collection.js');

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');

const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? {logging: false} : {});

const bike = bikeModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

const userModel = require('../models/users/users.js');


module.exports = {
  db: sequelize,
  bike: new Collection(bike),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes), //??
};
