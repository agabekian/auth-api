'use strict';

const bikeModel = (sequelize, DataTypes) => sequelize.define('Bike', {
    make: {type: DataTypes.STRING, required: true},
    model: {type: DataTypes.STRING, required: true},
    color: {type: DataTypes.STRING, required: true},
    price: {type: DataTypes.INTEGER, required: true},
    type: {type: DataTypes.ENUM('road', 'mountain', 'hybrid', 'folding'), required: true},
    customerId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    //status rare - vintage -etc
});

module.exports = bikeModel;
