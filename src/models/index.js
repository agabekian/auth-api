'use strict';

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');
const Collection = require('./collection.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres', // purpose?
        logging: false
    });

const userModel = require('../models/users/users.js');
const customerSchema = require('./customers/model');
const bikeSchema = require('./bike/model');
const inventoryModel = require('./inventory');

const customerModel = customerSchema(sequelize, DataTypes);
const bikeModel = bikeSchema(sequelize, DataTypes)

// foreign key is the column name in the child table that references
// the sourceKey in the parent table
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
    Inventory: inventoryModel(sequelize, DataTypes),
    users: userModel(sequelize, DataTypes)
};
