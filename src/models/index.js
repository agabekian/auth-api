'use strict';

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres', // purpose?
        logging: false
    });

const Collection = require('./data-collection.js');

const customerSchema =
    require('./customers/model');
const bikeSchema =
    require('./bike/model');

const customerModel = customerSchema(sequelize, DataTypes);
const bikeModel = bikeSchema(sequelize, DataTypes)
const userModel = require('../models/users/users.js');

// const Collection2 = require('./collection.js');
// const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? {logging: false} : {});

// module.exports = {
//   db: sequelize,
//   bike: new Collection(bike),
//   customers: new Collection(customers),
//   users: userModel(sequelize, DataTypes), //??
// };

// foreign key is the column name in the child table that
// references the sourceKey in the parent table
customerModel.hasMany(bikeModel,
    {foreignKey: 'customerId', sourceKey: 'id'});
bikeModel.belongsTo(customerModel,
    {foreignKey: 'customerId', targetKey: 'id'})

const customerCollection = new Collection(customerModel);
const bikeCollection = new Collection(bikeModel)

module.exports = {
  db: sequelize,          // -->./index.js

    Customers: customerCollection,

    Bike: bikeCollection,

    users: userModel(sequelize, DataTypes), //??
};
