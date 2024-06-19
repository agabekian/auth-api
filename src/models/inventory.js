'use strict';

const inventoryModel = (sequelize, DataTypes) =>
    sequelize.define(
        'Inventory', { //ACTUAL DB <Table> name!
            name: {type: DataTypes.STRING},
            cat: {type: DataTypes.STRING},
            description: {type: DataTypes.STRING},
            price: {type: DataTypes.DECIMAL},
            stock: {type: DataTypes.INTEGER}
        });

module.exports = inventoryModel;
