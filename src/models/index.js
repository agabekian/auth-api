'use strict';

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');
const Collection = require('./collection.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres',
        logging: false
    }
);

const userModel = require('../models/users/users.js');
const customerSchema = require('./customers/model');
const bikeSchema = require('./bike/model');
const inventorySchema = require('./inventory');

const customerModel = customerSchema(sequelize, DataTypes);
const bikeModel = bikeSchema(sequelize, DataTypes);
const inventoryModel = inventorySchema(sequelize, DataTypes);

customerModel.hasMany(bikeModel, { foreignKey: 'customerId', sourceKey: 'id' });
bikeModel.belongsTo(customerModel, { foreignKey: 'customerId', targetKey: 'id' });

const customerCollection = new Collection(customerModel);
const bikeCollection = new Collection(bikeModel);
const inventoryCollection = new Collection(inventoryModel);

module.exports = {
    db: sequelize,
    Customers: customerCollection,
    Bike: bikeCollection,
    Inventory: inventoryCollection,
    users: userModel(sequelize, DataTypes)
};
