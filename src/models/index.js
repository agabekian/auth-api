'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collection.js');
const Collection2 = require('./collection.js');
const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');

// const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? {logging: false} : {});
const sequelize = new Sequelize(
    DATABASE_URL, {
      dialect: 'postgres', // purpose?
      logging: false
    });

const customersSchema = require('./customers/model');
const bikeSchema = require('./bike/model');

const customersModel = customersSchema(sequelize, DataTypes);
const bikeModel = bikeSchema(sequelize, DataTypes)
const userModel = require('../models/users/users.js');

// module.exports = {
//   db: sequelize,
//   bike: new Collection(bike),
//   customers: new Collection(customers),
//   users: userModel(sequelize, DataTypes), //??
// };



// foreign key is the column name in the child table that references the sourceKey in the parent table
customersModel.hasMany(customersModel, {foreignKey: 'bikeId', sourceKey: 'id'});
bikeModel.belongsTo(customersModel, {foreignKey: 'customerId', targetKey: 'id'})

const customersCollection = new Collection(customersModel);
const bikeCollection = new Collection(bikeModel)

module.exports = {
  db: sequelize,          // -->./index.js
  Customers: customersCollection,
  Bikes: bikeCollection
};

// const sequelize = new Sequlize('dialect://connection.string'); simpler?