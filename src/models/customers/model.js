'use strict';

const customersModel = (sequelize, DataTypes) => sequelize.define(
    'Customers', { //ACTUAL DB <Table> name!
  nameFirst: { type: DataTypes.STRING, required: true },
  nameLast: { type: DataTypes.STRING, required: false },
  budget: { type: DataTypes.INTEGER, required: true }
});

module.exports = customersModel;
